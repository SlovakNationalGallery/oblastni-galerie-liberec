import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: App,
    }]
})

const messages = {
    cs: {}
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

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')