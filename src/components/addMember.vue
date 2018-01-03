
<template>
  	  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item  :label="$t('table.2')">
		        <el-input v-model="form.flevel"  style="width:300px"></el-input>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>

  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "./panel.vue"
  import userzh from "../resources/user/zh";
  import useren from "../resources/user/en";
//import en from '../resources/en';
//import zh from '../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(useren)),
  	zh:JSON.parse(JSON.stringify(userzh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
	  	messages
	})
  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        form: {
         				fid: "",
                flevel: "",
              
        }
      }
    },
     props:[],
    watch:{

   
    },
    created(){
    	 var _this=this;
      _this.loadData();
    },
    i18n,
    methods: {
      loadData(){
//      var parme_fid= this.fids;
//      	_this.$http.get(api.USER_GET_BYID + "?fid=" + parme_fid )                                                                            
//     			 .then(res => {
//               var d=res.data;    
//                                                                                    
//          			                                                                                          
//            			                                                                                                                       
//          });  
            

      }
    }
  }
</script>
