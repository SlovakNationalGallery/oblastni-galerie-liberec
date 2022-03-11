<template>
    <ZoomComponent :apiUrl="$apiUrl" />
</template>

<script>
import ZoomComponent from '../components/ZoomComponent.vue'

export default {
    components: { ZoomComponent }
}
</script>