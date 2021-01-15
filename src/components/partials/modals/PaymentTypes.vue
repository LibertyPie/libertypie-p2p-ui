<template>
    <Modal 
        v-bind="{
            ...$props,
            ...{
                id: 'paymentTypesModal', 
                title: $t('payment_methods'),
                size: 'modal-full-screen', 
                showFooter: false
            }
        }"
    >   
        <template v-slot:header>
            
            <div class="form-group b-0 m-0">
                <div class="input-group m-0">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <input class="form-control" 
                        :placeholder="$t('search_here')" 
                        type="text"
                    />
                </div>
            </div>
            <button type="button" class="close m-0" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </template>
        <template v-slot:body>
            <Loader v-if="isLoading" :isLoading="isLoading" />
            <div v-else>
                <div class="error_msg p-10" v-if="errorMsg != ''">
                    {{errorMsg}}
                </div>
                <div v-else>
                    <div data-simplebar>
                        <div class="pt-categories pl-1 pr-1">
                            <div class="cat-item">
                                <a href="#" 
                                    :class="[
                                        'd-flex flex-column justify-content-center',
                                        'align-items-center shadow rounded selected'
                                    ]"
                                >   
                                    <div>HI</div>
                                    <div>{{$t("all_payment_methods")}}</div>
                                </a>
                            </div>
                            <div  class="cat-item" 
                                v-for="(catName,catId) in categories" 
                                :key="catId"
                            >
                                <a href="#" 
                                    :class="[
                                        'd-flex flex-column justify-content-center',
                                        'align-items-center shadow rounded selected'
                                    ]"
                                    :title="`${catName} ${catId}`"
                                >   
                                    <div>
                                        <img :src="`/assets/images/pt/${catId}.svg`" class='icon' alt="" />
                                    </div>
                                    <div>{{$t(catName)}}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:footer></template>
    </Modal>
</template>

<script>
import Modal from  "./Modal.vue"
import 'simplebar'; 
import 'simplebar/dist/simplebar.css';

export default {
    components: {Modal},
    data(){
        return {
            isLoading: false,
            errorMsg: "",
            categories: [],
            paymentTypes: []
        }
    },
    mounted(){
        this.fetchPaymentTypes()
    },
    methods: {

        /**
         * fetchPaymentTypes
         */
        async fetchPaymentTypes(){
            
            try{

                this.isLoading = true;

                let paymentTypesStatus = await this.$libertypie.getAllPaymentTypes(true)

                this.isLoading = false;

                if(paymentTypesStatus.isError()){
                    this.errorMsg = paymentTypesStatus.getMessage();
                    return;
                }

                //data
                let resultData = paymentTypesStatus.getData() || {}

                this.categories = resultData.categories || [];
                this.paymentTypes = resultData.paymentTypes || [];

            } catch (e){
                this.isLoading = false;
                console.log(e,e.stack)
            }  
        },

        async handleSearchFilter(){

        }
    }
}
</script>
