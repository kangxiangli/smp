
<template>
  	  <imp-panel>
		    <el-form :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;"  v-if="isShow">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item :label="$t('table.9')">
		        <el-input v-model="form.fcode" :placeholder="$t('input.2')"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('table.13')">
		        <el-input v-model="form.fvalue"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('table.14')">
		         <el-radio v-model="form.fdefault" label="0">{{$t("script.14")}}</el-radio>
 				<el-radio v-model="form.fdefault" label="1">{{$t("script.13")}}</el-radio>
		      </el-form-item>
		        <el-form-item :label="$t('table.fstatus')">
		         <el-radio v-model="form.fstate" label="0">{{$t("button.enable")}}</el-radio>
 				<el-radio v-model="form.fstate" label="1">{{$t("button.disable")}}</el-radio>
		      </el-form-item>
		        <el-form-item :label="$t('table.15')">
		        <el-input v-model="form.fseq" style="width:300px"></el-input>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>
 	import panel from "./panel.vue"
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import syszh from "../resources/sys/zh";
	import sysen from "../resources/sys/en";
	const messages = {
		en: JSON.parse(JSON.stringify(sysen)),
		zh: JSON.parse(JSON.stringify(syszh))
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
      	isShow:false,
        form: {
         		 fid: "",
                fstate: "",
                fcode: "",
                fvalue: "",
                fseq: "",
                fdefault : "",
                fparentId: "",
            
              
        }
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
