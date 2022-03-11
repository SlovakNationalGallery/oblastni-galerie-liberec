<template>
    <layout>
        <detail-component :apiUrl="$apiUrl" :attributes="attributes" />
    </layout>
</template>

<script>
import DetailComponent from '../components/DetailComponent.vue'
import Layout from '../components/Layout.vue'

export default {
    components: { DetailComponent, Layout },
    data() {
        return {
            attributes: [
                'dating',
                'work_type',
                'medium',
                'technique',
                'topic',
            ],
        }
    }
}
</script>