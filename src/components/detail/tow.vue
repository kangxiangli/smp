
<template>
  <imp-panel>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.1")}}：{{form.fid}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("table.21")}}：{{form.fuserFid}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.23")}}：{{form.fviFid}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.24")}}：{{form.fconfirmations}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.25")}}：{{form.ffees}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.26")}}：{{form.ftradeUniqueNumber}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.4")}}：{{form.fcreateTime}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.27")}}：{{form.ftype=="05"?this.$t('script.13'):this.$t('script.14')}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.28")}}：{{form.flastUpdateTime}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.29")}}：{{form.famount}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.30")}}：{{form.fwithdraw_virtual_address}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.21")}}：{{form.frecharge_virtual_address}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.32")}}：{{form.floginName}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.33")}}：{{form.fnickName}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.34")}}：{{form.frealName}}</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.35")}}：{{form.fviName}}</div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12"><div class="grid-content bg-purple">{{$t("popups.5")}}：{{form.fstatus==0? this.$t('buttonVirtual.disable'):this.$t('buttonVirtual.able')}}</div></el-col>

</el-row>

  </imp-panel>
</template>
<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
  import panel from "../panel.vue"
  import * as api from "../../api"
  import auth from "../../auth"
 	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
//	import en from '../../resources/en';
//	import zh from '../../resources/zh';
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

				fid:"",
         		famount: "",
                fconfirmations: "",
                fcreateTime: "",
                ffees: "",
                flastUpdateTime: "",
                floginName: "",
                fnickName: "",
                frealName: "",
                frecharge_virtual_address: "",
                fstatus: "",
                ftradeUniqueNumber: "",
                ftype: "",
                fuserFid: "",
                fviFid: "",
                fviName: "",
                fwithdraw_virtual_address: ""
        }
      }
    },
     props:['fids'],
    computed: {
    },
    watch:{
    	fids(){
      this.loadData();
    	}
    },
    created(){
    	 var _this=this;
      _this.loadData();
    },
    i18n,
    methods: {
      loadData(){
       var _this=this;
        var parme_fid= this.fids;
			_this.$http.get(auth.getServerUrl()+api.VIRTUAL_PUSH_DETAIL+"?fid="+parme_fid)
				 .then(res => {
				 	if(res.data.success == true) {
				 		var d = res.data;
				 	_this.form.fid = d.data.fid;
				 	_this.form.famount = d.data.famount;
				 	_this.form.flastUpdateTime = d.data.flastUpdateTime;
				 	_this.form.fconfirmations = d.data.fconfirmations;
				 	_this.form.fcreateTime = d.data.fcreateTime;
				 	_this.form.ffees = d.data.ffees;
				 	_this.form.floginName = d.data.floginName;
				 	_this.form.fnickName = d.data.fnickName;
				 	_this.form.frealName = d.data.frealName;
				 	_this.form.frecharge_virtual_address = d.data.frecharge_virtual_address;
				 	_this.form.fstatus = d.data.fstatus;
				 	_this.form.ftradeUniqueNumber = d.data.ftradeUniqueNumber;
				 	_this.form.ftradeUniqueNumber = d.data.ftradeUniqueNumber;
				 	_this.form.ftype = d.data.ftype;
				 	_this.form.fuserFid = d.data.fuserFid;
				 	_this.form.fviFid = d.data.fviFid;
				 	_this.form.fviName = d.data.fviName;
				 	_this.form.fwithdraw_virtual_address = d.data.fwithdraw_virtual_address;
				 	}else{
				 		this.$message({
			 				type: 'error',
			 				message: res.data.msg
			 			});
				 	}
				 
				
				 });

 },
//ftype:function(row, column){
//		return row.ftype=="05"?"充值":"提现";
//		}
 }
 }</script>
