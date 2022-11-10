<template lang="pug">
template(v-if='!openEdit') {{ inputValue }}
span(v-else data-type="editor-input", contenteditable='true', :data-value="inputValue", :data-placeholder="placeholder", :data-style="JSON.stringify(outData.data.style)", :data-other-data="JSON.stringify(outData.data.otherData)")
    input(type="text", class="editor-input",:placeholder="placeholder", v-model="inputValue", :style='style')
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

const inputValue = ref(outData.data.value);
const placeholder = outData.data.placeholder || '';
const style = transformStyle(outData.data.style);
</script>
<style lang="sass">
span[data-type="editor-input"]
    font-size: 14px
    .editor-input
        border: 0
        min-width: 30px
        border-radius: 5px
        background-color: #eeeff3
        padding: 5px
        outline: 1px solid #e2e2e2
</style>
