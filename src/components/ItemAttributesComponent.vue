<template>
    <table class="w-full">
        <tr v-for="key in attributes.filter(key => item.content[key])" :key="key" class="align-top">
            <td class="p-2 uppercase">{{ $t(`item.attributes.${key}`) }}:</td>
            <td class="p-2">
                <template v-for="(value, index) in [item.content[key]].flat()" :key="value">
                    <br v-if="index > 0">
                    <router-link v-if="filterables.includes(key)" class="underline hover:no-underline" :to="{ name: 'catalog', query: { filter: { [key]: value } } }">{{ value }}</router-link>
                    <template v-else>{{ value }}</template>
                </template>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    props: ['item', 'attributes'],
    data() {
        return {
            filterables: [
                'work_type',
                'medium',
                'technique',
                'topic',
            ]
        }
    }
}
</script>