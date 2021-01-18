<template>
    <div :class="`ssc-${type}`"></div>
</template>

<script>
export default {
    props: {
        type: {type: String, default: "square"}
    }
}
</script>

<style>

</style>