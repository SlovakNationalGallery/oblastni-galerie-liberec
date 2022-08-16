<template>
    <select class="border-2 border-black rounded-sm px-1 py-1 text-base" v-model="inputValue" @change="change">
        <option v-for="(_, key) in options" :key="key" :value="key">{{ label(key) }}</option>
    </select>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        label: Function,
        options: Object,
        modelValue: Object,
    },
    data() {
        return {
            inputValue: null,
        }
    },
    emits: ['update:modelValue'],
    mounted() {
        this.inputValue = this.findInputValue()
    },
    methods: {
        change() {
            this.$emit('update:modelValue', this.options[this.inputValue])
        },
        findInputValue() {
            for (const [inputValue, option] of Object.entries(this.options)) {
                if (_.isEqual(option, this.modelValue)) {
                    return inputValue
                }
            }

            return null
        }
    }
}
</script>