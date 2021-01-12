<template>
    <Modal 
        v-bind="{
            ...$props,
            ...{
                id: 'paymentTypesModal', 
                title: $t('payment_methods'),
                size: 'lg', 
                showFooter: false
            }
        }"
    >
        <div>
            <Loader v-if="isLoading" :isLoading="isLoading" />
            <div v-else>
                Helloo
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from  "./Modal"

export default {
    components: {Modal},
    data(){
        return {
            isLoading: false,
            errorMsg: ""
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
            
            this.isLoading = true 

            try{

                let paymentTypesStatus = await this.$libertypie.getAllPaymentTypes(true)

                if(paymentTypesStatus.isError()){

                }

            } catch (e){
                console.log(e,e.stack)
            }
        }
    }
}
</script>

<style>

</style>