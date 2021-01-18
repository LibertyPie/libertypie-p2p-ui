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
        selected: {
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
    
    //load flags css
    async beforeCreate(){
        if(window.countryFlagsLoaded) return;
        
        let s = document.createElement("link")
        s.rel = "stylesheet";
        s.href="/assets/css/freakflags/freakflags.css";
        document.head.appendChild(s);
        window.countryFlagsLoaded = true;

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
                        id: "worldwide",
                        text: this.$t("worldwide")
                    }
                ]

                for(let key in data){
                    processedData.push({
                        id: key.toLowerCase(),
                        text: data[key]
                    });
                }

                this.countriesData = processedData

                let _this = this;

                let countrySelect = $(".country-select")

                countrySelect.select2({
                    allowClear: false,
                    data: processedData,
                    placeholder: splaceholder,
                    templateResult: _this.formatItem,
                    templateSelection: _this.formatItem,
                    width: '100%'
                });

                if(_this.selected != null || _this.selected != ""){
                    countrySelect.val(_this.selected).trigger("change")
                }

            })
        },

   
        formatItem(state){
            if (!state.id) return state.text;
            let  img = `<span class="fflag fflag-${state.id.toUpperCase()} ff-sm s2_icon shadow"></span>`; 
            let text = `<span>${state.text}</span>`
            return $(`<span>${img} ${text}</span>`);
       }

    }
}

</script>

