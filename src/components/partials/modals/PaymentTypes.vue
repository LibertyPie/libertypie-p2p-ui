<template>
    <div class="modal fade" id="paymentTypesModal" 
        tabindex="-1" role="dialog"
        aria-labelledby="paymentTypesModalLabel" 
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentTypesModalLabel">
                        {{$t("payment_types")}}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            isVisible: this.visible
        }
    },

    watch: {
        visible(){this.isVisible = this.visible;}
    },
    mounted(){

    }
}
</script>

<style>

</style>