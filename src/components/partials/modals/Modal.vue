<template>
    <div class="modal fade" :id="id" 
        tabindex="-1" role="dialog"
        :aria-labelledby="id+'Label'" 
        aria-hidden="true"
        :data-keyboard="closable"
        :data-backdrop="(closable) ? '' : 'static'"
    >
        <div :class="['modal-dialog', size]" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header">
                        <h5 class="modal-title" :id="id+'Label'">
                            {{title}}
                        </h5>
                        <button v-if="closable" type="button" class="close" data-dismiss="modal" aria-label="Close">
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
        },

        closable: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            _modalEl: null,
            _libertyPie: null,
            modalSize: `modal-${this.size}`       
        }
    },
    watch: {
        visible(){   
            console.log(this._modalEl)
            this._modalEl.modal((this.visible == true) ? 'show' : 'hide') 
        }
    },

    mounted(){
        this.init();
    },

    methods: {
        init(){
            let _this = this;
            $(function(){
            
                _this._modalEl = $(_this.$el);
                
                _this._modalEl.modal({
                    show: false
                })

                _this._modalEl.on('hidden.bs.modal', function (e) {
                   _this.$emit("hide",{modal: _this._modalEl})
                })

                _this._modalEl.on('shown.bs.modal', function (e) {
                   _this.$emit("show",{modal: _this._modalEl})
                })
                	
            })
        }
    }
}
</script>

<style>

</style>