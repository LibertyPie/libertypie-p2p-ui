<template>
    <Modal 
        v-bind="modalProps"
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
                        v-model="filterKeyword"
                        @keyup="handlerFilter"
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
                 
                    <div>
                        <div class="pt-categories pb-10 pl-1 pr-1 ss-container" ref="pt_categories">
                            <div class="cat-item">
                                <a href="#" 
                                    :class="[
                                        'd-flex flex-column justify-content-center',
                                        'align-items-center shadow rounded selected',
                                        'all_payment_methods'
                                    ]"
                                    @click.prevent="currentSelectedCatId = null"
                                >   
                                    <div>{{$t("all_payment_methods")}}</div>
                                    <div class="text-xs pt10">{{$t("total")}}: {{categories.length + 1}}</div>
                                </a>
                            </div>
                            <div  class="cat-item" 
                                v-for="(catName,catId) in categories" 
                                :key="catId"
                                :data-cat-id="catId"
                            >
                                <a href="#" 
                                    :class="[
                                        'd-flex flex-column justify-content-center',
                                        'align-items-center shadow rounded'
                                    ]"
                                    :title="`${catName}`"
                                    @click.prevent="currentSelectedCatId = catId"
                                >   
                                    <div>
                                        <img 
                                            :src="`/assets/images/pt/${slugify(catName)}.svg`" 
                                            class='icon' alt="" 
                                        />
                                    </div>
                                    <div class="text-capitalize">{{$t(catName)}}</div>
                                    <div class="text-xs pt10">{{$t("total")}}: {{totalCatsArray[catId] || 0}}</div>
                                </a>
                            </div>
                        </div>
                    </div>

                       
                    <div v-if="infoMsg != ''">
                        <div class="p-5 mt20 text-info text-center">{{infoMsg}}</div>
                    </div>

                    <div v-else class="container">
                        <div class="row mt20 payment_types_list" ref="payment_types_list">
                            <div 
                                v-for="(itemObj,index) in paymentTypes" :key="index"
                                class="col-12 col-sm-6 col-md-4 col-xl-3 pt_item"
                                :data-id="itemObj.id"
                                :data-cat-id="itemObj.catId"
                            >
                                <a href="#" 
                                    class="display-block shadow card rounded p-2 m-1  d-flex flex-row align-items-center"
                                    @click.prevent="handleOnPTItemClick(itemObj)"
                                >
                                    <img 
                                        :src="`/assets/images/pt/${slugify(categories[itemObj.catId])}.svg`" 
                                        class='icon' alt="" 
                                    />
                                    <div class="text-truncate text-capitalize">{{itemObj.name}}</div>
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


export default {
    components: {Modal},
    data(){
        return {
            modalProps: {},
            isLoading: false,
            errorMsg: "",
            infoMsg: "",
            categories: [],
            paymentTypes: [],
            totalCatsArray: [],
            filterKeyword: "",
            currentSelectedCatId: null
        }
    },
    beforeMount(){

        this.modalProps = {...(this.$props), ...{
            id: 'paymentTypesModal', 
            title: this.$t('payment_methods'),
            size: 'modal-lg', 
            showFooter: false
        }}

        console.log( this.modalProps)
    },
    watch: {

        currentSelectedCatId(){
            this.handleCategoryChange()
        }

    },
    mounted(){
        this.fetchPaymentTypes()
    },
    methods: {

        /**
         * handle payment type item click
         */
        handleOnPTItemClick(itemObj){
           this.$emit("on-select",itemObj)
           this.$emit("on-hide")
        },

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

                this.countTotalCats(this.paymentTypes)
            } catch (e){
                this.isLoading = false;
                console.log(e,e.stack)
            }  
        },

        async handlerFilter(){

            this.infoMsg = "";

            if(this.currentSelectedCatId != null){ this.currentSelectedCatId = null; }

            let paymentTypesListDom = this.$refs.payment_types_list;

            //lets do filtering
            let keyword = this.filterKeyword.trim().toLowerCase()

            if((keyword.length + 1) <= 1){
                Array.from(paymentTypesListDom.querySelectorAll('.pt_item')).forEach((el)=>{
                    el.classList.remove("hide")
                })

                return;
            }

            let totalResults = this.paymentTypes.length;
            
            //lets now loop payment 
            for(let i in this.paymentTypes){
                
                let itemObj = this.paymentTypes[i]
                
                if(!itemObj.name.toLowerCase().startsWith(keyword)){
                   
                   let itemDom = paymentTypesListDom.querySelector(`.pt_item[data-id='${itemObj.id}']`)
                   if(itemDom){ itemDom.classList.add('hide') }

                   totalResults--;
                }

            } //end for loop

            //if no results 
            if(totalResults == 0){
                this.infoMsg = this.$t("no_results_found",[this.filterKeyword])
            }
        },

        //count payment types by their categories
        countTotalCats(paymentTypes){
            for(let i in paymentTypes){
                let catId = paymentTypes[i].catId;
                this.totalCatsArray[catId] = (this.totalCatsArray[catId] || 0) + 1;
            }
        },

        //handle category change 
        handleCategoryChange(){
            
            //lets get all catItems 
            Array.from(this.$refs.pt_categories.querySelectorAll(".cat-item")).forEach((el)=>{

                let catId = el.dataset.catId;
                let catLink = el.querySelector("a")
                
                if(!catLink) return; 

                 let catLinkClassList = catLink.classList;
                
                catLinkClassList.remove("selected") 

                if(this.currentSelectedCatId == null && catLinkClassList.contains("all_payment_methods")){
                    catLinkClassList.add("selected")
                    return;
                }
                
                (catId != this.currentSelectedCatId)    ?
                    catLinkClassList.remove("selected") :
                    catLinkClassList.add("selected")

            })

            this.filterPaymentTypesByCatId(this.currentSelectedCatId)
        },

        //filter payment types by cat
        filterPaymentTypesByCatId(catId){

             this.infoMsg = "";

            //lets get all payment types 
            let paymentTypesListDom = this.$refs.payment_types_list;

            let ptItemsArray = $(paymentTypesListDom).find(".pt_item");

            //show all items 
            ptItemsArray.removeClass("hide")

            if(catId == null){
                return;
            }
            
            if((this.totalCatsArray[catId]|| 0) == 0){
                ptItemsArray.addClass("hide")
                this.infoMsg = this.$t("no_payment_methods_in_cat")
                return;
            }

            ptItemsArray.each((index,el)=>{
                
                let ptItemCatId = $(el).data("catId")
                
                if(ptItemCatId != catId){
                    $(el).addClass("hide")
                }

            })
        }

    }
}
</script>
