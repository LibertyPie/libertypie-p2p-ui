<template>

    <nav class="navbar-vertical navbar-light bg-white sidebar" id="sidenav" ref="sidebar">
        <div class="nav-item">
            <a class="nav-link" href="#">
                <span class="icon">
                    <svg-img src="/assets/images/dashboard.svg" width="24"  />
                </span>
                <span class="text">{{$t("dashboard")}}</span>
            </a>
        </div>
        <div class="nav-item">
            <a class="nav-link" href="#">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </span>
                <span class="text">{{$t("offers")}}</span>
            </a>
        </div>

        <div class="nav-item">
            <a class="nav-link" href="#">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </span>
                <span class="text">{{$t("account")}}</span>
            </a>
        </div>

        <div class="nav-toggle bg-secondary">
            <a href="#" class="text-center" @click.prevent="isCollapsed = !isCollapsed;">
               <img :src="`/assets/images/${(isCollapsed)? 'sidebar_menu' : 'back_icon'}.svg`" width="24" />
            </a>
        </div>
    </nav>
</template>

<script>
export default {

    data(){
        return {
            isCollapsed: false
        }
    },
    beforeMount(){

        this.fixViewPortHeight();

        $(window).on("resize",this.fixViewPortHeight)
        $(window).on("orientationchange",this.fixViewPortHeight)
    },

    watch: {
        isCollapsed(){
            $("#sidenav").toggleClass("nav-collapsed")
        }
    },
    methods: {
        fixViewPortHeight(){

            let _this = this;

            $(function(){
                let winHeight = $(window).height();
                let sidebar = $(document).find("#sidenav");

                sidebar.css({"height": (winHeight * 0.8)+"px" })

                //lets check window width if its md and less, lets collapse navbar
                if($(window).width() <= 800){
                     _this.isCollapsed = true;
                } else {
                   _this.isCollapsed = false; 
                }

                
            })
        }

    }
}
</script>

