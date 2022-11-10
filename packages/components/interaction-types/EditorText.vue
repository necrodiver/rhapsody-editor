<template lang="pug">
template(v-if="style")
    span(data-type="editor-text", :style="style") {{ value }}
template(v-else)
    | {{ value }}
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
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

const value = outData.data.value || '';
const style = transformStyle(outData.data.style);
</script>
