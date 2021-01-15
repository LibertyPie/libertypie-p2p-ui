<template>
    <div class="modal fade" :id="id" 
        tabindex="-1" role="dialog"
        :aria-labelledby="id+'Label'" 
        aria-hidden="true"
    >
        <div :class="['modal-dialog', 'modal-'+size]" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header">
                        <h5 class="modal-title" :id="id+'Label'">
                            {{title}}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <slot name="footer">
                    <div></div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        id: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: 'md'
        },
        title: {
          type: String,
          required: true  
        },
        showFooter:{
            type: Boolean,
            default: true
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            _modal: null,
            _libertyPie: null,
            modalSize: `modal-${this.size}`       
        }
    },
    watch: {
        visible(){   
            this._modal.modal((this.visible == true) ? 'show' : 'hide') 
        }
    },

    beforeMount(){
        //console.log(this.$props)
        this.init();
    },

    methods: {
        init(){
            let _this = this;
            $(function(){
                _this._modal = $('#paymentTypesModal');
                _this._modal.modal({
                    show: false
                })

                _this._modal.on('hidden.bs.modal', function (e) {
                   _this.$emit("on-hide",{modal: _this._modal})
                })

                _this._modal.on('shown.bs.modal', function (e) {
                   _this.$emit("on-show",{modal: _this._modal})
                })
                	
            })
        }
    }
}
</script>

<style>

</style>