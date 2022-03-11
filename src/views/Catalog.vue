<template>
    <layout>
        <CatalogComponent :apiUrl="$apiUrl" :perPage="10" :filter="filter" />
    </layout>
</template>

<script>
import CatalogComponent from '../components/CatalogComponent.vue'
import Layout from '../components/Layout.vue'

export default {
    components: { CatalogComponent, Layout },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL,
            filter: ['work_type', 'technique', 'medium'],
        }
    }
}
</script>