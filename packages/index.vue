<template lang="pug">
.r-editor#rhapsody-editor
    KeyMark(at="#", :members="menuItemList", @setBack="setBack", ref="keyMarkRef")
        .r-item(:contenteditable="resData.openEdit", v-for="child in editorData", :data-type="child.type", :style="transformStyle(child.style)")
            .r-line(v-for="lineItem in child.childs", :data-type="lineItem.type", :contenteditable="resData.openEdit", :style="transformStyle(lineItem.style)")
                template(v-for="item in lineItem.childs")
                    component(:is="selectComponent(item.type)", :contenteditable="openEdit", :openEdit="resData.openEdit", :data="item")
    SelectMenu(@setBack="setBack", :openEdit="resData.openEdit")
</template>
<script>
export default {
    name: 'REditor'
};
</script>
<script name="REditor" setup>
import keyboardjs from 'keyboardjs';
import {
    ref,
    onMounted,
    watch,
    reactive,
    toRef,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    toRefs
} from 'vue';

import {
    isType,
    cloneDeep,
    componentNameTransform,
    transformStyle,
    debounce,
    random
} from './utils';
import settings from './utils/settings.js';
import KeyMark from './components/key-mark/KeyMark.vue';
import SelectMenu from './components/SelectMenu.vue';
const lineBreak = settings.LineBreak;
let defaultComponents = settings.DefaultComponents;
const keyMarkRef = ref(null);
let isAddComponent = false;

const resData = defineProps({
    openEdit: {
        type: Boolean,
        default: true,
        required: true,
        validator: val => {
            return isType(val, 'Boolean');
        }
    },
    configs: {
        type: Object,
        required: true,
        validator: val => {
            return isType(val, 'Object');
        }
    }
});
const historyStackLength =
    resData.configs.historyStackLength || settings.DefaultHistoryStackLength;
const inputRecordInterval =
    resData.configs.inputRecordInterval || settings.DefaultInputRecordInterval;
// 内容数据
let editorData = ref(cloneDeep(resData.configs.data));
let menuItemList = ref([]);
if (resData.configs.components && resData.configs.components.length) {
    menuItemList.value = resData.configs.components
        .filter(item => !item.isNotMenuItem)
        .map(item => ({
            type: item.type,
            key: item.key,
            name: item.name,
            otherData: item.otherData
        }));
    defaultComponents = [...resData.configs.components];
} else {
    menuItemList.value = defaultComponents
        .filter(item => !item.isNotMenuItem)
        .map(item => ({
            type: item.type,
            key: item.key,
            name: item.name,
            otherData: item.otherData
        }));
}

const historyStack = [];
historyStack.push(cloneDeep(resData.configs.data));
let stackIndex = historyStack.length;

const selectComponent = val => {
    if (!val) {
        return val;
    }
    const selectItem = defaultComponents.find(item => item.type === val);
    if (selectItem) {
        return selectItem.component;
    }
    return val;
};

const setBack = markId => {
    structurationData(markId, true);
};

// 转换结构化数据
const structurationData = async (markId, isAdd = false) => {
    const editorEls = document.querySelectorAll('.r-item');
    // 判定无编辑框
    if (!editorEls || !editorEls.length) {
        editorData.value = [];
        return;
    }
    const beforeEditorData = [];
    const position = {
        index1: null,
        index2: null,
        index3: null
    };
    editorEls.forEach((item1, i) => {
        const style = {};
        [...item1.style].forEach(key => {
            style[key] = item1.style[key];
        });
        const itemData1 = {
            type: item1.dataset.type || '',
            name: item1.dataset.name || '',
            style: style,
            childs: []
        };
        beforeEditorData.push(itemData1);

        let itemData2 = {
            type: 'row',
            key: '',
            class: '',
            childs: []
        };
        let childNodes1 = item1.childNodes;
        childNodes1 = [...childNodes1]
            .filter(child => child.nodeType !== 8)
            .filter(child => child.nodeType !== 3 || child.data);
        if (!childNodes1 || !childNodes1.length) {
            itemData1.childs.push(itemData2);
            position.index1 = i;
            position.index2 = 0;
            position.index3 = 0;
            return;
        }
        const afterJ = childNodes1
            .filter(
                child =>
                    !(
                        lineBreak.includes(child.data) ||
                        lineBreak.includes(child.innerHTML)
                    )
            )
            .findIndex(
                child => child.dataset && child.dataset.markId === markId
            );
        if (afterJ >= 0) {
            position.index1 = i;
            position.index2 = afterJ;
        }
        childNodes1.forEach((item2, j) => {
            if (item2.nodeType === 3) {
                if (
                    j > 0 &&
                    (lineBreak.includes(item2.data) ||
                        lineBreak.includes(item2.innerHTML))
                ) {
                    if (itemData2.childs.length === 0) {
                        itemData2.childs.push({
                            type: 'editor-text',
                            value: '  '
                        });
                    }
                    itemData1.childs.push(itemData2);
                    itemData2 = {
                        type: 'row',
                        key: '',
                        childs: []
                    };
                } else {
                    itemData2.childs.push({
                        type: 'editor-text',
                        value: item2.innerHTML || item2.data
                    });
                }
            } else if (item2.nodeType === 1) {
                if (item2.dataset.type === 'row') {
                    const style2 = {};
                    [...item2.style].forEach(key => {
                        style2[key] = item2.style[key];
                    });
                    itemData2 = {
                        type: 'row',
                        key: '',
                        style: style2,
                        childs: []
                    };
                    itemData1.childs.push(itemData2);
                    const childNodes3 = [...item2.childNodes]
                        .filter(child => child.nodeType !== 8)
                        .filter(child => child.nodeType !== 3 || child.data);
                    childNodes3.forEach((item3, k) => {
                        if (item3.dataset && item3.dataset.markId === markId) {
                            position.index1 = i;
                            position.index2 = j;
                            position.index3 = k;
                        }
                        if (item3.nodeType === 3) {
                            itemData2.childs.push({
                                type: 'editor-text',
                                value: item3.innerHTML || item3.data
                            });
                        } else if (item3.nodeType === 1) {
                            if (item3.tagName === 'BR') {
                                itemData2.childs.push({
                                    type: 'editor-text',
                                    value: '  '
                                });
                            } else {
                                let value = item3.dataset.value;
                                let style = item3.dataset.style
                                    ? JSON.parse(item3.dataset.style)
                                    : {};
                                if (item3.dataset.type === 'editor-text') {
                                    value = item3.textContent;
                                    style = {};
                                    [...item3.style].forEach(key => {
                                        style[key] = item3.style[key];
                                    });
                                }
                                itemData2.childs.push({
                                    type: item3.dataset.type,
                                    value,
                                    style,
                                    placeholder:
                                        item3.dataset.placeholder || '',
                                    otherData: item3.dataset.otherData
                                        ? JSON.parse(item3.dataset.otherData)
                                        : {}
                                });
                                const itemChild =
                                    item3.querySelector('.editor-component');
                                if (
                                    !itemChild ||
                                    itemChild.dataset.markId !== markId
                                ) {
                                    return;
                                }
                                position.index1 = i;
                                position.index2 = j;
                                position.index3 = k + 1;
                                itemData2.childs.push({
                                    type: itemChild.dataset.type,
                                    value: itemChild.dataset.value,
                                    style: itemChild.dataset.style
                                        ? JSON.parse(itemChild.dataset.style)
                                        : {},
                                    placeholder:
                                        itemChild.dataset.placeholder || '',
                                    otherData: itemChild.dataset.otherData
                                        ? JSON.parse(
                                              itemChild.dataset.otherData
                                          )
                                        : {}
                                });
                            }
                        }
                    });
                } else if (item2.dataset.type) {
                    const style2 = {};
                    [...item2.style].forEach(key => {
                        style2[key] = item2.style[key];
                    });
                    let value = item2.dataset.value;
                    if (item2.dataset.type === 'editor-text') {
                        value = item2.textContent;
                    }
                    itemData2.childs.push({
                        type: item2.dataset.type,
                        style: style2,
                        value,
                        placeholder: item2.dataset.placeholder || '',
                        otherData: item2.dataset.otherData
                            ? JSON.parse(item2.dataset.otherData)
                            : {}
                    });
                }
            }
        });
        if (
            itemData2.type &&
            itemData2 !== itemData1.childs[itemData1.childs.length - 1]
        ) {
            itemData1.childs.push(itemData2);
        }
    });
    // 此处重新渲染页面及添加的组件
    if (isAdd) {
        // 此处为历史栈，会将新渲染的数据放入历史栈中，方便回退
        historyStack.splice(stackIndex, historyStack.length - stackIndex - 1);
        historyStack.push(cloneDeep(beforeEditorData));
        if (historyStack.length > historyStackLength) {
            historyStack.splice(0, historyStack.length - historyStackLength);
        }
        stackIndex = historyStack.length - 1;
    }
    editorData.value = [];
    await nextTick();
    editorData.value = cloneDeep(beforeEditorData);
    // 此处为渲染光标定位
    if (
        position.index1 !== null &&
        position.index2 !== null &&
        position.index3 !== null
    ) {
        await nextTick();
        setTimeout(() => {
            let elItem = document.querySelectorAll('.r-item')[position.index1];
            if (!elItem) {
                return;
            }
            elItem =
                elItem.querySelectorAll('[data-type="row"]')[position.index2];
            if (!elItem) {
                return;
            }
            elItem = elItem.childNodes[position.index3 + 4];
            if (!elItem) {
                return;
            }
            isAddComponent = true;
            setCursorPosition(elItem, 0);
        });
    }
};
// 设置光标位置
const setCursorPosition = (el, index = 0) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    range.setStart(el, index);
    range.setEnd(el, index);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};

let isInput = false;
// 监听撤销和恢复按钮及解除监听
const listenerReportData = (isBind = true) => {
    const revokeOperation = e => {
        if (keyMarkRef.value.atwho) {
            return;
        }
        revokeData();
    };

    const recoveryOperation = e => {
        if (keyMarkRef.value.atwho) {
            return;
        }
        recoveryData();
    };

    const compositionstartOperation = e => {
        if (keyMarkRef.value.atwho) {
            return;
        }
        isInput = true;
    };
    const inputOperation = () => {
        return debounce(e => {
            if (keyMarkRef.value.atwho) {
                return;
            }
            if (!isInput && !isAddComponent) {
                pushHashStack();
            }
            if (isAddComponent) {
                isAddComponent = false;
            }
        }, inputRecordInterval);
    };
    const compositionendOperation = () => {
        return debounce(e => {
            if (keyMarkRef.value.atwho) {
                return;
            }
            isInput = false;
            pushHashStack();
        }, inputRecordInterval);
    };
    if (isBind) {
        keyboardjs.bind(['command + z', 'ctrl + z'], revokeOperation);
        keyboardjs.bind(['ctrl + y', 'command + shift > z'], recoveryOperation);
        document
            .querySelector('#rhapsody-editor')
            .addEventListener('compositionstart', compositionstartOperation);
        document
            .querySelector('#rhapsody-editor')
            .addEventListener('input', inputOperation());
        document
            .querySelector('#rhapsody-editor')
            .addEventListener('compositionend', compositionendOperation);
    } else {
        keyboardjs.unbind(['command + z', 'ctrl + z'], revokeOperation);
        keyboardjs.unbind(
            ['ctrl + y', 'command + shift > z'],
            recoveryOperation
        );
        document
            .querySelector('#rhapsody-editor')
            .removeEventListener('compositionstart', compositionstartOperation);
        document
            .querySelector('#rhapsody-editor')
            .removeEventListener('input', inputOperation());
        document
            .querySelector('#rhapsody-editor')
            .removeEventListener('compositionend', compositionendOperation);
    }
};

const pushHashStack = async () => {
    await structurationData(random(32));
    historyStack.splice(stackIndex + 1);
    historyStack.push(cloneDeep(editorData.value));
    if (historyStack.length > historyStackLength) {
        historyStack.splice(0, historyStack.length - historyStackLength);
    }
    stackIndex = historyStack.length;
};

// 撤销数据
const revokeData = async () => {
    if (historyStack.length <= stackIndex) {
        stackIndex = historyStack.length - 1;
    }
    if (!historyStack[stackIndex - 1]) {
        return;
    }
    editorData.value = [];
    stackIndex -= 1;
    await nextTick();
    editorData.value = cloneDeep(historyStack[stackIndex]);
};
// 恢复数据
const recoveryData = async () => {
    if (!historyStack[stackIndex + 1]) {
        return;
    }
    editorData.value = [];
    stackIndex += 1;
    await nextTick();
    editorData.value = cloneDeep(historyStack[stackIndex]);
};

// 导入数据
const importData = async (data = []) => {
    editorData.value = [];
    historyStack.length = 0;
    historyStack.push(cloneDeep(data));
    stackIndex = historyStack.length;
    await nextTick();
    editorData.value = cloneDeep(data);
};

// 导出数据
const exportData = async cb => {
    await structurationData(random(32));
    const data = cloneDeep(editorData.value);
    cb && cb(data);
};

defineExpose({ revokeData, recoveryData, importData, exportData });

onMounted(() => {
    listenerReportData();
});

onBeforeUnmount(() => {
    listenerReportData(false);
});
</script>
<style lang="sass">
.r-editor
    width: 100%
    height: 100%
    background-color: #fff
    border: 1px solid #ccc
    padding: 10px
    position: relative
    .r-item
        width: 100%
        outline: none
        -webkit-user-modify: read-write-plaintext-only
        white-space: pre-wrap
        word-break: break-all
        font-size: 16px
        line-height: 20px
        color: #666
</style>
