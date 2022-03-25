<template>
    <div class="max-w-screen-xl mx-auto" v-if="item">
        <div class="text-center">
            <h2 class="font-medium max-w-screen-md mt-6 mx-auto text-2xl lg:text-4xl text-center">{{ item.content.title }}</h2>

            <template v-for="(author, i) in item.content.author" :key="author">
                <template v-if="i > 0">, </template>
                <router-link class="underline hover:no-underline text-lg lg:text-xl" :to="{ name: 'catalog', query: { filter: { author } } }">{{ formatName(author) }}</router-link>
            </template>
        </div>

        <div class="flex flex-wrap -mx-4 mt-6 lg:mt-12">
            <div class="px-4 lg:w-2/3">
                <ItemImagesComponent v-bind="{ item }" @select="selected => { currentImage = selected }" />
            </div>

            <div class="px-4 lg:text-lg lg:w-1/3">

                <ItemAttributesComponent v-bind="{ item, attributes }" />

                <p class="my-4 whitespace-pre-wrap">
                    {{ item.description }}
                </p>
            </div>
        </div>
    </div>
    <div v-else>
        <img class="mx-auto" src="/images/loader.svg">
    </div>
</template>

<script>
import axios from 'axios'
import mixin from '../mixin.js'
import ItemAttributesComponent from './ItemAttributesComponent.vue'
import ItemImagesComponent from './ItemImagesComponent.vue'

export default {
    props: ['apiUrl', 'attributes'],
    components: { ItemAttributesComponent, ItemImagesComponent },
    mixins: [ mixin ],
    data() {
        return {
            currentImage: 0,
            item: null,
            labels: {
                authors: 'Autor',
                institution: 'Vlastník',
                archive_fund: 'Fond',
                archive_box: 'Karton',
                archive_folder: 'Složka',
                work_type: 'Dokument',
                dating: 'Datace',
                archive_folder_references: 'Související'
            },
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        fetch() {
            return axios.get(`${this.apiUrl}/items/${this.$route.params.id}`, {
                params: { page: this.page }
            }).then(({ data }) => {
                this.item = data
            }).catch(() => {
                this.$router.push({
                    name: 'catalog'
                })
            })
        },
    }
}
</script>