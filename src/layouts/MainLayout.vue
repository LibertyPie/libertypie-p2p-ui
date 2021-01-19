<template>
    <div>
        <Navbar />
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

import Navbar  from "../components/partials/Navbar.vue";

export default {
    components: {Navbar}
}
</script>

<style lang="scss">
    .connect-wrapper {
        height: 100vh;
         
        button {
            margin-top:-100px;
        }
    }
</style>