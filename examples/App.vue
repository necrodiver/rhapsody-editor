<template lang="pug">
.app
    REditor(:openEdit="openEdit", :configs="configs", ref="reditorRef")
</template>
<script setup>
import { ref, onMounted, watch, reactive, nextTick } from 'vue';
// import REditor from '../packages/index.vue';
import EditorInput from '../packages/components/interaction-types/EditorInput.vue';
import EditorText from '../packages/components/interaction-types/EditorText.vue';
import EditorSelect from '../packages/components/interaction-types/EditorSelect.vue';
import baseData from '@/test-data/base.json';

const openEdit = ref(true);
const reditorRef = ref(null);
const data = baseData;
const configs = {
    baseData,
    data,
    components: [
        {
            type: 'editor-input',
            key: 'name',
            name: '输入框',
            component: EditorInput,
            otherData: {
                placeholder: '请输入'
            }
        },
        {
            type: 'editor-text',
            key: '',
            name: '文本框',
            component: EditorText,
            isNotMenuItem: true
        },
        {
            type: 'editor-select',
            key: 'gender',
            name: '选择框',
            component: EditorSelect,
            otherData: {
                selectOptions: [
                    {
                        key: 'a',
                        value: 'AAAAA'
                    },
                    {
                        key: 'b',
                        value: 'BBBBB'
                    },
                    {
                        key: 'c',
                        value: 'CCCCC'
                    }
                ]
            }
        }
    ],
    historyStackLength: 20,
    inputRecordInterval: 300
};
console.log('configs', configs);
const inputConfig = reactive({
    value: '',
    placeholder: '姓名',
    style: {
        'font-size': '14px',
        'width': '60px'
    },
    otherData: {
        id: 1122334556
    }
});

onMounted(() => {
    reditorRef.value.exportData(function (res) {
        console.log('输出看看结构', res);
    });
});
</script>

<style lang="sass">
#app
    width: 100%
    display: flex
    justify-content: center
    .app
        width: 680px
        min-height: 600px
</style>
