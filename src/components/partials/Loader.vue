<template>
    <span class="loader">
        <span class="spinner"></span>
    </span>
</template>

<script>
export default {
    name: 'loader',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },

        showText: {
            type: Boolean,
            default: false,
        },

        text:{
            type:String,
            default: "loading"
        }
        
    }
}
</script>

<style>
    @keyframes spinner {
  to {transform: rotate(360deg);}
}

.loader {
    position: absolute;
    display: inline-block;
    top: 45%;
    top: calc(50% - 13px);
    left: 45%;
    left: calc(50% - 13px);
      z-index:99999999;
}

 .spinner {   
    position: relative;
    width: 26px;
    height: 26px;
 }
 
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  width: 26px;
  height: 26px;

  border-radius: 50%;
  border-top: 2px solid #ff4ff6;
  border-right: 2px solid transparent;
  animation: spinner .6s linear infinite;

}
</style>