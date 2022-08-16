<template>
    <slot name="filter">
        <div class="bg-gray-200 px-6 lg:px-16 py-8">
            <div class="-mx-2">
                <div class="flex flex-wrap -my-2">
                    <div class="my-2 px-2 w-full lg:w-1/3" v-for="key in filter" :key="key">
                        <facet-component
                        :label="$t(`item.attributes.${key}`)"
                        :value="$route.query?.filter?.[key] ?? null"
                        :options="options.filter?.[key] ?? []"
                        @update="value => facetUpdate(value, key)" />
                    </div>
                </div>
            </div>
            <slider
            class="mb-2 mt-14 px-6 lg:px-0"
            :min="options.minYear"
            :max="options.maxYear"
            v-if="yearRange[0] && yearRange[1]"
            v-model="yearRange"
            @update:modelValue="yearsUpdate" />
        </div>
    </slot>

    <slot name="list-controls">
        <div v-if="loading">
            <img class="mx-auto" src="/images/loader.svg">
        </div>
        <div v-else-if="total" class="flex justify-between px-6 lg:px-16 py-6 lg:py-8">
            <slot name="total">
                <div class="text-lg">{{ $tc('items_count', total) }}</div>
            </slot>
            <slot name="sort">
                <CustomSelect
                    v-model="$route.query.sort"
                    @update:modelValue="sortUpdate"
                    :label="option => $t(`item.sort.${option}`)"
                    :options="sortOptions"
                    />
            </slot>
        </div>
        <div v-else>
            <div class="text-center text-lg w-full">{{ $t('no_results') }}</div>
        </div>
    </slot>

    <slot name="list">
        <div class="px-6 lg:px-16">
            <div class="-mx-2 -my-4" item-selector="[data-masonry-tile]" transition-duration="0" v-masonry="masonry">
                <div class="flex flex-wrap mb-10 px-6 lg:px-16">
                    <slot name="item" v-bind="item" v-for="(item, i) in items" :key="i">
                        <div v-masonry-tile class="px-2 py-4 w-1/2 lg:w-1/4 xl:w-1/5" data-masonry-tile>
                            <router-link :to="{ name: 'detail', params: { id: item.id } }">
                                <img @load="debouncedRedraw" class="w-full" :src="$imageWebumeniaUrl(item, 400)" />
                                <div class="mt-2">{{ item.content.author.map(author => formatName(author)).join(', ') }}</div>
                                <div class="font-medium">{{ item.content.title }}</div>
                                <div class="italic">{{ item.content.dating }}</div>
                            </router-link>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </slot>

    <slot name="list-more">
        <div class="my-10 text-center" v-if="!loadMoreClicked && isLastPage === false">
            <button @click="fetchItems(); loadMoreClicked = true">{{ $t('load_more') }}</button>
        </div>
    </slot>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<script>
import CustomSelect from './CustomSelect.vue'
import FacetComponent from './FacetComponent.vue'
import Slider from '@vueform/slider'
import mixin from '../mixin.js'
import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'

export default {
    components: {
        CustomSelect,
        FacetComponent,
        Slider
    },
    mixins: [ mixin ],
    props: ['apiUrl', 'perPage', 'filter'],
    data() {
        return {
            loadMoreClicked: false,
            isLastPage: null,
            loading: true,
            total: 0,
            yearRange: [],
            masonry: 'masonry',
            options: {
                filter: {
                    // work_type: [],
                    // medium: [],
                    // technique: [],
                },
                minYear: null,
                maxYear: null,
            },
            items: [],
            page: 1,
            observer: new IntersectionObserver(this.observerCallback),
            debouncedRedraw: _.debounce(() => { this.$redrawVueMasonry(this.masonry) }, 100),
            sortOptions: {
                [null]: {},
                'most_viewed': {'view_count': 'asc'},
                'oldest': {'date_earliest': 'asc'},
                'newest': {'date_latest': 'desc'},
            },
        }
    },
    created() {
        this.update()
    },
    methods: {
        search(e) {
            const query = _.merge(this.$route.query, { q: e.target.value })
            this.$router.replace({ query, force: true })
        },
        facetUpdate(value, key) {
            const query = _.merge(this.$route.query, { filter: { [key]: value } })
            this.$router.replace({ query, force: true })
        },
        sortUpdate() {
            this.$router.replace({ query: this.$route.query, force: true })
        },
        yearsUpdate(value) {
            const query = _.merge(this.$route.query, {
                filter: {
                    date_earliest: { lte: value[1] },
                    date_latest: { gte: value[0] },
                }
            })
            this.$router.replace({ query, force: true })
        },
        fetchItems() {
            const params = this.filterParams()
            params.set('page', this.page)
            params.set('size', this.perPage)
            return axios
                .get(`${this.apiUrl}/items`, { params })
                .then(({ data }) => {
                    this.total = data.total
                    this.loading = false
                    this.isLastPage = data.current_page === data.last_page
                    if (data.data.length) {
                        this.page += 1
                        this.items.push(...data.data)
                        this.$nextTick(() => {
                            this.$redrawVueMasonry(this.masonry)
                            const lastItem = document.querySelector('[data-masonry-tile]:last-child')
                            if (lastItem && this.loadMoreClicked) {
                                this.observer.observe(lastItem)
                            }
                        })
                    }
                })
        },
        stringifyQuery(query) {
            return qs.stringify(query, {
                filter: (prefix, value) => {
                    if (value === null) {
                        return
                    }
                    return value
                },
                encodeValuesOnly: true
            })
        },
        filterParams() {
            const queryString = this.stringifyQuery(this.$route.query)
            const params = new URLSearchParams(queryString)
            params.set('filter[gallery]', 'Oblastní galerie Liberec, OGL')
            return params
        },
        fetchAggregations() {
            const params = this.filterParams()
            // todo infinity
            params.set('size', 1000)
            this.filter.forEach(field => {
                params.append(`terms[${field}]`, field)
            })
            return axios
                .get(`${this.apiUrl}/items/aggregations`, { params })
                .then(({ data }) => {
                    Object.entries(data).forEach(([facet, options]) => {
                        this.options.filter[facet] = options
                    })
                })
        },
        fetchYears() {
            const params = this.filterParams()
            params.delete('filter[date_earliest][lte]')
            params.delete('filter[date_latest][gte]')
            params.append(`min[date_earliest]`, 'date_earliest')
            params.append(`max[date_latest]`, 'date_latest')
            return axios
                .get(`${this.apiUrl}/items/aggregations`, { params })
                .then(({ data }) => {
                    this.options.minYear = data.date_earliest
                    this.options.maxYear = data.date_latest
                    this.yearRange = [
                        this.yearRange?.[0] ?? this.options.minYear,
                        this.yearRange?.[1] ?? this.options.maxYear,
                    ]
                })
        },
        update() {
            this.loadMoreClicked = false
            this.loading = true
            this.isLastPage = null
            this.page = 1
            this.items = []
            this.observer.disconnect()
            this.fetchItems()
            this.fetchAggregations()
            this.fetchYears()
        },
        observerCallback(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.observer.unobserve(entry.target)
                    this.fetchItems()
                }
            })
        },
    },
    watch: {
        '$route'(value) {
            this.yearRange = [
                value.query?.filter?.date_earliest?.lte,
                value.query?.filter?.date_latest?.gte,
            ]
            this.update()
        }
    }
}
</script>