
<template>
  	  <imp-panel>
		    <el-form   :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item :label="$t('table.1')">
		        <el-input v-model="form.fshortName"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.3')">
		        <el-input v-model="form.fdescription"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.4')">
		        <el-input v-model="form.faddTime"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.5')">
		        <el-input v-model="form.fstatus"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.6')">
		        <el-input v-model="form.fsymbol"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.7')">
		        <el-input v-model="form.fname"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.8')">
		         <el-radio v-model="form.fisShare" label="1">{{$t("script.4")}}</el-radio>
 							 <el-radio v-model="form.fisShare" label="0">{{$t("script.5")}}</el-radio>
		      </el-form-item>
		        <el-form-item :label="$t('popups.9')">
		        	 <el-radio v-model="form.fIsWithDraw" label="1">{{$t("script.4")}}</el-radio>
 							 <el-radio v-model="form.fIsWithDraw" label="0">{{$t("script.5")}}</el-radio>
		      </el-form-item>
		        <el-form-item :label="$t('popups.10')">
		        <el-input v-model="form.furl"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.11')">
		        <el-input v-model="form.fcount"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.12')">
		        <el-input v-model="form.ftradeTime"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.13')">
		        <el-input v-model="form.fprice"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.18')">
		        <el-input v-model="form.fversion"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.14')">
		        <el-switch
						  style="display: block"
						  v-model="form.fisDefAsset"
						  active-color="#13ce66"
						  inactive-color="#ff4949">
						</el-switch>
		      </el-form-item>
		      
		        <el-form-item :label="$t('popups.15')">
		        <el-input v-model="form.fproportion"  style="width:300px"></el-input>
		      </el-form-item>
		        <el-form-item :label="$t('popups.16')">
		        	<el-switch
						  style="display: block"
						  v-model="form.fisRecharge"
						  active-color="#13ce66"
						  inactive-color="#ff4949">
						</el-switch>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>
		import Vue from "vue";
	import VueI18n from 'vue-i18n'
  import panel from "./panel.vue"
  import * as api from "../api"
 	import virtualzh from "../resources/virtual/zh";
	import virtualen from "../resources/virtual/en";
//	import en from '../../resources/en';
//	import zh from '../../resources/zh'
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(virtualen)),
		zh: JSON.parse(JSON.stringify(virtualzh))
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
                fshortName: "",
                fdescription: "",
                faddTime: "",
                fstatus: "",
                fsymbol: "",
                fname: "",
                fIsWithDraw: "",//是否允许充值和提现
                furl: "",
                fcount: "",
                ftradeTime: "",
                fprice: "",
                fversion: "",
                fisDefAsset: "",//是否是默认资产
                fproportion: "",
                fisRecharge: "",//是否允许使用人民币充值
                fisShare: ""
              
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
    	fisShare:function(row, column){
							return row.fisShare==0?this.$t('script.5'):this.$t('script.4');
						},
      loadData(){

            

      }
    }
  }
</script>
