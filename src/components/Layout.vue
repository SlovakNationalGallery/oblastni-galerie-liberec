<template>
    <div class="mb-12 lg:mb-24">
        <div class="flex items-center justify-between my-4 px-6 lg:px-16">
            <router-link to="/">
                <img class="h-16 lg:h-20" src="/images/logo.png" alt="Lázně – Oblastní galerie Liberec">
            </router-link>

            <div>
                <input @keydown.enter="search" name="q" placeholder="hledej" :value="$route.query.q" class="border-2 border-black px-3 py-2 text-base placeholder:text-black" type="text">
            </div>
        </div>

        <menu class="flex justify-center w-full">
            <li><router-link class="block border-b-2 border-transparent hover:border-black p-4" :to="{ name: 'catalog', query: null }">{{ $t('catalog') }}</router-link></li>
            <li><router-link class="block border-b-2 border-transparent hover:border-black p-4" :to="{ name: 'info' }">{{ $t('info') }}</router-link></li>
        </menu>

        <slot></slot>

        <!-- <p class="text-center">{{ $t('site_created_by') }} <a class="underline hover:no-underline" href="https://lab.sng.sk/">lab.SNG</a></p> -->
    </div>
</template>

<style scoped>
.router-link-active {
    border-color: black;
}
</style>

<script>
export default {
    methods: {
        search(e) {
            this.$router.push({
                name: 'catalog',
                query: {
                    q: e.target.value,
                }
            })
        }
    }
}
</script>