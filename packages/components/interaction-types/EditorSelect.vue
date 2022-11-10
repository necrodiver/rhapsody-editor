<template lang="pug">
template(v-if='!openEdit') {{ selectValue }}
span(v-else data-type="editor-select", contenteditable='true', :data-value="selectValue", :data-placeholder="placeholder", :data-style="JSON.stringify(outData.data.style)", :data-other-data="JSON.stringify(outData.data.otherData)")
    select.editor-select(v-model="selectValue")
        option(disabled value="") {{ placeholder || '请选择' }}
        option(v-for="item in selectOptions", :value="item.key") {{ item.value }}
</template>
<script setup>
import { ref } from 'vue';
import { isType, transformStyle } from '../../utils';
const outData = defineProps({
    openEdit: {
        type: Boolean,
        default: true,
        required: true,
        validator: val => {
            return isType(val, 'Boolean');
        }
    },
    data: {
        type: Object,
        required: true,
        validator: val => {
            return isType(val, 'Object');
        }
    }
});

const selectValue = ref(outData.data.value);
const placeholder = outData.data.placeholder || '';
const style = transformStyle(outData.data.style);
const selectOptions =
    outData.data.otherData && outData.data.otherData.selectOptions
        ? outData.data.otherData.selectOptions
        : [];
</script>
<style lang="sass">
span[data-type="editor-select"]
    font-size: 14px
    .editor-select
        border: 0
        min-width: 30px
        border-radius: 5px
        background-color: #eeeff3
        padding: 5px
        outline: 1px solid #e2e2e2
</style>
