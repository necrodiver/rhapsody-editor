import EditorInput from '../components/interaction-types/EditorInput.vue';
import EditorText from '../components/interaction-types/EditorText.vue';
import EditorSelect from '../components/interaction-types/EditorSelect.vue';

const settings = {
    LineBreak: ['\r', '\n', '\r\n'],
    DefaultHistoryStackLength: 20,
    DefaultInputRecordInterval: 300,
    DefaultComponents: [
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
    ]
};

export default settings;
