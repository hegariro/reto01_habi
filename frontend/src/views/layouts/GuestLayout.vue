<template>
    <div class="container">
        <div class="row">
            <router-link :to="{name: 'login'}">Login</router-link>
            <router-link :to="{name: 'register'}">Registro</router-link>
        </div>
        <div class="row">
            <div class="col-sm-12 offset-sm-2 mt-1">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>