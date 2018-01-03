
<template>
  	  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item   :label="$t('table.20')">
		        <el-input v-model="form.flevel" :disabled="true" style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item   :label="$t('table.21')">
		        <el-input v-model="form.ffee"  style="width:300px"></el-input>
		      </el-form-item>

		    </el-form>
		  </imp-panel>
</template>
<script>
  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "./panel.vue"
  import * as api from "../api"
  import auth from "../auth"
	import Element from "element-ui";
  import rmbzh from "../resources/rmb/zh";
  import rmben from "../resources/rmb/en";
//import en from '../resources/en';
//import zh from '../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(rmben)),
  	zh:JSON.parse(JSON.stringify(rmbzh))
	}
	const i18n = new VueI18n({
		locale:"zh",
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
                ffee:"",
                fversion:""
        },
        selectValue:""
      }
    },
     props:[],
    created(){
    },
    i18n,
    methods: {
    }
  }
</script>
