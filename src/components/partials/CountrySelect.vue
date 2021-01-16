<template>
  <div>
      <select  :class="['form-control country-select',cssClasses]"></select>
  </div>
</template>

<script>
// form-control-lg
export default {
    props: {
        cssClasses: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ""
        },
        defaultOptionText: {
            type: String,
            default: ''
        },
        defaultOptionValue:{
            type: String,
            default: ''
        }
    },

    data(){
        return {
            countriesData: {},
            select2: null
        }
    },

    beforeMount() {
        this._init();
    },

    methods: {
        async _init(){
            
            import("../../data/countries.js").then((result)=>{

                let data  = result.default;

                let splaceholder = (this.placeholder.trim() == "") ? 
                                    this.$t("select_country") : this.placeholder;

                let processedData = [
                    {
                        id: "",
                        text: splaceholder,
                        disabled: true
                    },
                    {
                        id: this.defaultOptionValue,
                        text: this.defaultOptionText
                    }
                ]

                for(let key in data){
                    processedData.push({
                        id: key.toLowerCase(),
                        text: data[key]
                    })
                }

                this.countriesData = processedData

                let _this = this;

                $(function(){
                    _this.select2 = $(".country-select").select2({
                        allowClear: false,
                        width: 'resolve',
                        theme: 'bootstrap4',
                        data: processedData,
                        placeholder: splaceholder
                    });
                })

            })
        }
    }
}

</script>

<style>
    .country-select{ 
        white-space: nowrap  !important; 
        overflow: hidden; 
        text-overflow: ellipsis !important;
    }
</style>