<template>

    <nav class="navbar-vertical navbar-light bg-white sidebar shadow" id="sidenav" ref="sidebar">
        <div class="nav-item">
            <router-link :to="{name: 'dashboard'}" class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/dashboard.svg"   />
                </span>
                <span class="text">{{$t("dashboard")}}</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link :to="{name: 'dashboard_offers'}"  class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/offer.svg"   />
                </span>
                <span class="text">{{$t("offers")}}</span>
            </router-link>
        </div>

        <div class="nav-item">
            <router-link :to="{name: 'dashboard'}"  class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/orders.svg"   />
                </span>
                <span class="text">{{$t("orders")}}</span>
            </router-link>
        </div>

        <div class="nav-item">
            <router-link :to="{name: 'dashboard'}"  class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/dispute.svg"   />
                </span>
                <span class="text">{{$t("disputes")}}</span>
            </router-link>
        </div>

        <div class="nav-item">
            <router-link :to="{name: 'dashboard_account'}"  class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/user.svg"   />
                </span>
                <span class="text">{{$t("account")}}</span>
            </router-link>
        </div>

        <div class="nav-item">
            <router-link :to="{name: 'dashboard_account'}"  class="nav-link">
                <span class="icon">
                    <svg-img src="/assets/images/group.svg"   />
                </span>
                <span class="text">{{$t("guardians")}}</span>
            </router-link>
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
                //let winHeight = $(window).height();
                //let sidebar = $(document).find("#sidenav");

                //sidebar.css({"height": (winHeight * 0.8)+"px" })

                //lets check window width if its md and less, lets collapse navbar
                if($(window).width() <= 990){
                     _this.isCollapsed = true;
                } else {
                   _this.isCollapsed = false; 
                }

                
            })
        }

    }
}
</script>

