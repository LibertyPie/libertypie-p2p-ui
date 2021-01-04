<template>
    <nav class="navbar navbar-horizontal navbar-expand-lg navbar-light flex-row align-items-md-center bg-white">
        <a class="navbar-brand" href="#"> 
            <img src="/assets/images/_libertypie.png" height="120" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-default">
            <div class="navbar-collapse-header">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="/">
                            <img src="/assets/images/_libertypie.png" height="120" />
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            
            <ul class="navbar-nav mr-auto">
            
                <li class="nav-item dropdown py-2 py-lg-0">
                    <a class="dropdown-toggle btn shadow-none btn-outline-primary btn-block" 
                        href="#" id="buyNavbarDropdown" 
                        role="button" data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                    <span class="btn-inner--text text-capitalize">{{ $t("buy") }}</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a  href="#" 
                        class="dropdown-toggle btn btn-secondary shadow-none btn-block" 
                        id="sellNavbarDropdown" 
                        role="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        <span class="btn-inner--text text-capitalize">{{ $t("sell") }}</span>
                    </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>

                <li class="nav-item"><a class="nav-link" href="#"> {{ $t("swap") }} </a></li>
                <li class="nav-item"><a class="nav-link" href="#"> {{ $t("vault") }} </a></li>
                <li class="nav-item"><a class="nav-link" href="#"> {{ $t("governance") }} </a></li>
            </ul>

            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#"> {{ $t("dashboard") }} </a>
                </li>
                <li class="nav-item">
                    <a  href="#" 
                        class="btn shadow-none btn-block  bg-primary-light-30p text-truncate text-capitalize text-sm" 
                        id="connect_wallet_btn" 
                        role="button" 
                        @click="doConnectWallet"
                    >
                        {{ $t("connect_wallet") }}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
export default {

  methods: {
      doConnectWallet(){
        window.dispatchEvent(new CustomEvent("connect_wallet"))
      }
  }
}
</script>

<style>
.megamenu .dropdown-menu {
    background: none;
    border: none;
    display: inline-block;
    margin-left:5px;
    margin-right: 5px;
    border-radius: 8px;
    padding: 10px;
    width:600px; 
}
</style>