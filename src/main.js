import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { VueMasonryPlugin } from 'vue-masonry'
import App from './App.vue'
import Catalog from './views/Catalog.vue'
import Detail from './views/Detail.vue'
import Info from './views/Info.vue'
import Zoom from './views/Zoom.vue'
import axios from 'axios'
import qs from 'qs'
import './index.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/katalog',
        component: App,
        children: [{
            path: '',
            component: Catalog,
            name: 'catalog',
        }, {
            path: ':id',
            component: Detail,
            name: 'detail',
        }]
    }, {
        path: '/zoom/:id',
        component: Zoom,
        name: 'zoom',
    }, {
        path: '/info',
        component: Info,
        name: 'info',
    }, {
        path: '/',
        redirect: {
            name: 'catalog'
        }
    }],
    parseQuery: qs.parse,
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
})

const messages = {
    cs: {
        catalog: 'Katalog',
        info: 'Info',
        item: {
            attributes: {
                dating: 'Datace',
                medium: 'Materiál',
                technique: 'Technika',
                topic: 'Námět',
                work_type: 'Výtvarný druh',
            },
            sort: {
                [null]: 'poslední změny',
                most_viewed: 'počtu vidění',
                newest: 'datování – od nejnovějšího',
                oldest: 'datování – od nejstaršího',
            }
        },
        items_count: '1 dílo | {count} díla | {count} díl',
        load_more: 'ukaž více',
        no_results: 'Nebyly nalezeny žádné záznamy',
        site_created_by: 'Vyrobil a spravuje',
        sort_by: 'podle',
    }
}

const i18n = createI18n({
    locale: 'cs',
    fallbackLocale: 'cs',
    pluralizationRules: {
        cs: function (choice) {
            if (choice === 1) {
                return 0
            } else if (choice > 1 && choice < 5) {
                return 1
            } else {
                return 2
            }
        }
    },
    messages,
})

const app = createApp(App)
    .use(router)
    .use(i18n)
    .use(VueMasonryPlugin)

app.config.globalProperties.$imageWebumeniaUrl = function (item, size) {
    return `${import.meta.env.VITE_WEBUMENIA_HOST}/dielo/nahlad/${item.id}/${size}`
}

app.config.globalProperties.$imagePreviewUrl = function (image, size) {
    return `${import.meta.env.VITE_IMAGES_HOST}/preview/?path=${image}&size=${size}`
}

app.config.globalProperties.$imageZoomUrl = function (image) {
    return `${import.meta.env.VITE_IMAGES_HOST}/zoom/?path=${image}.dzi`
}

app.config.globalProperties.$apiUrl = import.meta.env.VITE_API_URL

axios.defaults.headers.common['Accept-Language'] = 'cs'

app.mount('#app')