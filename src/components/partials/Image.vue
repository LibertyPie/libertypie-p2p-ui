<template>
    <i ref="imgEl" />
</template>

<script>
export default {
    
    data() {
        return {

        }
    },
    mounted(){
        
        let imgEl = this.$refs.imgEl;

        if ("IntersectionObserver" in window) {
            
            if(!window['imgObserver']){
                window['imgObserver'] = new IntersectionObserver((entries, observer) => {
                    entries.forEach( entry => { 
                        if (entry.isIntersecting)  {
                            this.loadImg(entry.target,observer) 
                        }
                    })
                });
            }

            window['imgObserver'].observe(imgEl)

        } else {
            this.loadImg(imgEl)
        }
        
    },

    methods: {
        loadImg(el, observer){
            window.requestAnimationFrame(() => {

                let img = document.createElement('img')

                Array.from(el.attributes).forEach(attr => img.setAttribute(attr.name, attr.value) );

                img.onload =  () => {
                     el.parentNode.replaceChild(img,el)
                     if(observer){ observer.unobserve(el); }
                }

            });
        }
    }
}
</script>

<style>

</style>