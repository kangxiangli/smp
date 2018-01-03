
<template>
  	  <imp-panel>
		    <el-form :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.1')">
                <el-select class="select" clearable filterable v-model="form.ftype" style="width:300px" :placeholder="$t('dialog.1')">
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item  :label="$t('table.2')">
		        <el-input v-model="form.ftitle"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item  :label="$t('table.3')">
            <vue-editor v-model="form.fcontent"></vue-editor>
		      </el-form-item>
          
		    </el-form>
		  </imp-panel>
</template>
<script>
  import panel from "./panel.vue"
  import * as api from "../api"
  import { VueEditor } from 'vue2-editor'
   import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import syszh from "../resources/sys/zh";
  import sysen from "../resources/sys/en";
const messages={
	  en:JSON.parse(JSON.stringify(sysen)),
  	zh:JSON.parse(JSON.stringify(syszh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
	  	messages
	})
  export default {
    components: {
      'imp-panel': panel,
      VueEditor
    },
    data(){
      return {
        options: [],
        form: {
         				fid: "",
                ftitle:"",
                fcontent:"",
                ftype:"",
        },
        selectValue:"",  
      }
    },
     props:[],
    watch:{
    },
    created(){
    },
    i18n,
    methods: {
     
    }
  }
</script>
