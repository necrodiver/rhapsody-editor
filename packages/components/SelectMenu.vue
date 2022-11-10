<template lang="pug">
.r-select-menu(:style="`left:${elObj.x}px;top:${elObj.y}px`", v-if="isSelected")
    template(v-for="item in menuItems")
        .menu-item(v-if="item.type==='button'", @click.prevent.stop="sureClick(item)")
            span.r-icon(:class="item.class")
        .menu-item.x2(v-if="item.type==='input'")
            span.r-icon(:class="item.class") :
            input.r-menu-input(type="text", v-model="fontSize", maxlength="2", @keydown.enter.stop.prevent="changeVal")
</template>
<script setup>
import { cloneDeep, random, isType } from '../utils';
import {
    ref,
    onMounted,
    watch,
    reactive,
    toRef,
    defineComponent,
    nextTick,
    onBeforeUnmount
} from 'vue';

// openEdit
const resData = defineProps({
    openEdit: {
        type: Boolean,
        default: true,
        required: true,
        validator: val => {
            return isType(val, 'Boolean');
        }
    }
});

const emit = defineEmits(['setBack']);

const menuItems = ref([
    {
        title: '加粗',
        class: 'icon-strong',
        type: 'button',
        styles: [
            {
                key: 'font-weight',
                value: 700
            }
        ]
    },
    {
        title: '斜体',
        class: 'icon-italics',
        type: 'button',
        styles: [
            {
                key: 'font-style',
                value: 'italic'
            }
        ]
    },
    {
        title: '左对齐',
        class: 'icon-left',
        type: 'button',
        styles: [
            {
                key: 'text-align',
                value: 'left'
            }
        ]
    },
    {
        title: '居中',
        class: 'icon-center',
        type: 'button',
        styles: [
            {
                key: 'text-align',
                value: 'center'
            }
        ]
    },
    {
        title: '右对齐',
        class: 'icon-right',
        type: 'button',
        styles: [
            {
                key: 'text-align',
                value: 'right'
            }
        ]
    },
    {
        title: '字体大小',
        class: 'icon-fontsize x2',
        type: 'input'
    }
]);
const fontSize = ref(16);
const isSelect = ref(false);
const isSelected = ref(false);

const elObj = reactive({
    x: 0,
    y: 0
});
let selection = null;

const mouseEvent = (isBind = true) => {
    const el = document.querySelector('.r-editor');
    const mousedownOption = function (e) {
        if (!resData.openEdit) {
            return;
        }
        isSelect.value = true;
    };
    const mouseupOption = function (e) {
        if (!resData.openEdit) {
            return;
        }
        isSelect.value = false;
        const afterSelection = window.getSelection();
        let classList = [...(afterSelection.baseNode?.classList || [])];
        if (
            classList.includes('menu-item') ||
            classList.includes('r-select-menu') ||
            classList.includes('r-menu-input')
        ) {
            return;
        }
        if (!afterSelection.isCollapsed) {
            isSelected.value = true;
            selection = afterSelection.getRangeAt(0);
        } else {
            isSelected.value = false;
            elObj.x = 0;
            elObj.y = 0;
        }
    };
    const mousemoveOption = function (e) {
        if (!resData.openEdit) {
            return;
        }
        if (isSelect.value && !window.getSelection().isCollapsed) {
            isSelected.value = true;
            elObj.x = e.layerX;
            elObj.y = e.layerY + 24;
        }
    };
    if (isBind) {
        el.addEventListener('mousedown', mousedownOption);
        el.addEventListener('mouseup', mouseupOption);
        el.addEventListener('mousemove', mousemoveOption);
    } else {
        el.removeEventListener('mousedown', mousedownOption);
        el.removeEventListener('mouseup', mouseupOption);
        el.removeEventListener('mousemove', mousemoveOption);
    }
};

const changeVal = e => {
    if (e.keyCode === 13) {
        const item = {
            styles: [
                {
                    key: 'font-size',
                    value: `${fontSize.value}px`
                }
            ]
        };
        setSelectedStyle(item);
        isSelected.value = false;
    }
};
const sureClick = val => {
    isSelected.value = false;
    const afterVal = cloneDeep(val);
    setSelectedStyle(afterVal);
};

const setSelectedStyle = styleItem => {
    if (!selection) {
        return;
    }
    const startNode = selection.startContainer;
    const endNode = selection.endContainer;
    if (startNode === endNode) {
        setIdenticalNodeStyle(styleItem);
        return;
    }
    setDifferentNodeStyle(styleItem);
};

// 设置不同元素中插入样式
const setDifferentNodeStyle = styleItem => {
    // r-line
    const startNode =
        selection.startContainer.parentNode.dataset.type === 'editor-text'
            ? selection.startContainer.parentNode
            : selection.startContainer;
    const endNode =
        selection.endContainer.parentNode.dataset.type === 'editor-text'
            ? selection.endContainer.parentNode
            : selection.endContainer;
    const wholeNode = selection.commonAncestorContainer;
    const start = selection.startOffset;
    const end = selection.endOffset;
    const nodeEntries = [...wholeNode.childNodes]
        .filter(el => el.textContent || (el.nodeType === 1 && el.dataset.type))
        .entries();
    const afterElList = [];
    let isBegin = false;
    while (true) {
        const item = nodeEntries.next();
        if (item.done) {
            mergeNewElList(afterElList, wholeNode);
            return;
        }
        const index = item.value[0];
        const el = item.value[1];
        if (el.nodeType === 1 && el.dataset.type !== 'editor-text') {
            afterElList.push(el);
            continue;
        }
        let startNum = 0;
        let endNum = el.textContent.length;
        // 开始
        if (el === startNode) {
            startNum = start;
            endNum = el.textContent.length;
            isBegin = true;
        }
        // 结束
        if (el === endNode) {
            startNum = 0;
            endNum = end;
            isBegin = false;
            const nodes = mergeElAndTextNodes(styleItem, el, startNum, endNum);
            afterElList.push(...nodes);
        }
        // 开始之后到结束之前的状态需要进行样式处理，然后给予afterElList
        if (isBegin) {
            const nodes = mergeElAndTextNodes(styleItem, el, startNum, endNum);
            afterElList.push(...nodes);
        } else {
            if (el !== endNode) {
                el.textContent && afterElList.push(el);
            }
        }
    }
};
// 合并相同样式的标签
const mergeNewElList = (elList, wholeNode) => {
    elList = elList.filter(
        el => el.textContent || (el.nodeType === 1 && el.dataset.type)
    );
    if (!elList || !elList.length) {
        return;
    }
    const afterElList = [];
    elList.forEach(el => {
        const popEl = afterElList.pop();
        // 首次获取pop可能没有，需要新增一下
        if (!popEl) {
            afterElList.push(el);
            return;
        }
        if (el.nodeType === 1 && el.dataset.type !== 'editor-text') {
            afterElList.push(popEl, el);
            return;
        }
        if (popEl.nodeType === 3) {
            if (el.nodeType === 3) {
                popEl.textContent += el.textContent;
                afterElList.push(popEl);
                return;
            }
            afterElList.push(popEl, el);
            return;
        }
        if (el.nodeType === 3) {
            afterElList.push(popEl, el);
            return;
        }
        const popElStyleKeys = [...popEl.style];
        const elStyleKeys = [...el.style];
        if (
            popElStyleKeys.length === elStyleKeys.length &&
            !popElStyleKeys.some(key => popEl.style[key] !== el.style[key])
        ) {
            popEl.textContent += el.textContent;
            afterElList.push(popEl);
            return;
        }
        afterElList.push(popEl, el);
    });

    afterElList.length && wholeNode.replaceChildren(...afterElList);
    setBackClick();
};
const setBackClick = () => {
    const markId = random(32);
    emit('setBack', markId);
};
// 分离和合并标签
const mergeElAndTextNodes = (styleData, el, startNum, endNum) => {
    let leftChild = null;
    let centerChild = null;
    let rightChild = null;
    const textLength = el.textContent.length;
    // TODO 清除样式也在这里，需要补充
    // 获取原来的标签上的样式
    const styleItem = cloneDeep(styleData);
    let oldStyles = [];
    if (el.nodeType === 1) {
        oldStyles = [...el.style]
            .map(key => {
                return {
                    key,
                    value: el.style[key]
                };
            })
            .filter(item => item.value !== '');
    }
    // 合并到现在选中的样式上（不同的样式合并，相同样式按照现有新的不变）
    oldStyles.forEach(item => {
        if (!styleItem.styles.some(child => child.key === item.key)) {
            styleItem.styles.push({
                ...item
            });
        }
    });
    centerChild = createNode(styleItem, el.textContent.slice(startNum, endNum));
    // 普通文本样式处理
    if (el.nodeType === 3) {
        leftChild = document.createTextNode(el.textContent.slice(0, startNum));
        rightChild = document.createTextNode(el.textContent.slice(endNum));
        return [leftChild, centerChild, rightChild];
    } else if (el.nodeType === 1) {
        // 已有样式的标签处理
        leftChild = createNode(
            { styles: oldStyles },
            el.textContent.slice(0, startNum)
        );
        rightChild = createNode(
            { styles: oldStyles },
            el.textContent.slice(endNum)
        );
        return [leftChild, centerChild, rightChild];
    } else {
        console.error('类型错误', el, el.nodeType);
    }
    return [];
};

// 设置相同元素插入样式
const setIdenticalNodeStyle = styleItem => {
    const wholeNode = selection.commonAncestorContainer;

    const node = selection.endContainer;
    const startNum = selection.startOffset;
    const endNum = selection.endOffset;

    // 如果当前选择的内容是文本，且其父元素是文本标签，则使用替换处理
    if (
        wholeNode.nodeType === 3 &&
        wholeNode.parentNode.dataset.type === 'editor-text'
    ) {
        const nodes = mergeElAndTextNodes(
            styleItem,
            wholeNode.parentNode,
            startNum,
            endNum
        );
        wholeNode.parentNode.replaceWith(...nodes);
        setBackClick();
        return;
    }

    const leftChild = document.createTextNode(node.data.slice(0, startNum));
    const rightChild = document.createTextNode(node.data.slice(endNum));
    const text = node.data.slice(startNum, endNum);
    const centerChild = createNode(styleItem, text);

    selection.commonAncestorContainer.data = '';
    selection.insertNode(rightChild);
    selection.insertNode(centerChild);
    selection.insertNode(leftChild);
    selection = null;
    setBackClick();
};

const createNode = (styleItem, text) => {
    if (!text) {
        return document.createTextNode('');
    }
    const child = document.createElement('span');
    child.textContent = `${text}`;
    child.dataset.type = 'editor-text';
    styleItem.styles.forEach(item => {
        child.style[item.key] = item.value;
    });
    return child;
};

onMounted(() => {
    mouseEvent();
});

onBeforeUnmount(() => {
    mouseEvent(false);
});
</script>
<style lang="sass" scoped>
.r-select-menu
    position: absolute
    width: 252px
    height: 36px
    border-radius: 6px
    background-color: #fff
    box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%), 0 9px 45px 0 rgb(114 119 160 / 12%)
    display: flex
    cursor: pointer
    .menu-item
        width: 36px
        height: 36px
        text-align: center
        font-size: 16px
        color: #666
        line-height: 36px
        &:hover
            color: #000
            background-color: #eee
        &.x2
            width: 72px
        .r-menu-input
            margin-left: 6px
            width: 22px
            height: 20px
            border: none
            text-align: center
        span
            width: 36px
</style>
