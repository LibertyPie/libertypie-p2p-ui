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
            
            let placeholder =  this.$t("placeholder")

            import("../../data/countries.js").then((result)=>{

                let data  = result.default;

                let processedData = [
                    {
                        id: "",
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
                let splaceholder = (this.placeholder.trim() == "") ? 
                                    this.$t("select_country") : this.placeholder;

                $(function(){
                    _this.select2 = $(".country-select").select2({
                        placeholder: splaceholder,
                        allowClear: false,
                        width: 'resolve',
                        theme: 'bootstrap4',
                        data: processedData,
                        width: 'element',
                        templateResult: _templateResult
                    });
                })

            })
        }
    }
}

function _templateResult (state) {
  if (!state.id) {
    return state.text;
  }
  var baseUrl = "/assets/images/countries/png/";
  var $state = $(
    '<span><img src="' + baseUrl + '/' + state.element.value.toUpperCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
  );
  return $state;
};

</script>

<style>
    .country-select{ 
        white-space: nowrap  !important; 
        overflow: hidden; 
        text-overflow: ellipsis !important;
    }
</style>