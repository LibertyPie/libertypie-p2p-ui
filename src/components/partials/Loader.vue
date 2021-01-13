<template>
    <div id="loader">
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
