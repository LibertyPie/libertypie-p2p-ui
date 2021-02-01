<template>
     <div class="mb-3 form-item-button d-flex flex-row justify-content-center align-items-center">
        <div>
            <a  href="#" class="noborder text-gray-500 nobg px-4" @click.prevent="computeToggle('sub')">
                <svg-img src="/assets/images/minus-solid.svg" alt="-" class="fill-gray-500" />
            </a>
        </div>

        <div class="flex-grow-1">
            <input 
                type="numeric" 
                v-model="inputValue" 
                class="form-control text-center nobg noborder" 
                placeholder="0" 
                style="letter-spacing:0.1em"
            />
        </div>

         <div class="px-4" v-if="unitLabel != null">
            {{unitLabel}}
        </div>

        <div>
            <a href="#" 
                class="noborder text-gray-500 nobg px-4" @click.prevent="computeToggle('add')">
                <svg-img src="/assets/images/plus-solid.svg" alt="+" class="fill-gray-500" />
            </a>
        </div>    
    </div>
</template>

<script>
export default {
    props: {
        min: {
            type: Number,
            default: null,
            required: false
        },
        max: {
            type: Number,
            required: false,
            default: null
        },
        default: {
            type: Number,
            required: false,
            default: 0
        },

        step: {
            type: Number,
            default: 1 
        },

        unitLabel: {
            type: String,
            default: null
        },

        decimals: {
            type: Number,
            default: 0
        }
    },
    data(){ 
        return {
            inputValue: this.default
        }    
    },
   
    watch: {
        inputValue(){
            this.$emit("change",Number.parseFloat(this.inputValue.toString()).toFixed(this.decimals))
        }
    },

    methods: {
        computeToggle(mode){
            let value = parseFloat(this.inputValue.toString())

            let step = parseFloat(this.step.toString())
            
            let result;

            if(mode == "sub"){

            
                if(this.min != null ) {
                     let min = parseFloat(this.min.toString());
                     if ((value - step) < min) return;
                }

                result = value - step;
            } else {
                
                if(this.max != null){
                    let max = parseFloat(this.max.toString());
                    if((value + step) > max) return;
                }

                result = (value + step);
            }
            
            this.inputValue = Number.parseFloat(result.toString()).toFixed(this.decimals)
        }
    }
}
</script>

<style>

</style>