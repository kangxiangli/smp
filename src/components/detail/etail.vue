
<template>
  <imp-panel>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.1")}}：{{form.fid}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.2")}}：{{form.fshortName}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.3")}}：{{form.fdescription}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.4")}}：{{form.faddTime}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.5")}}：{{form.fstatus==0? this.$t('buttonVirtual.disable'):this.$t('buttonVirtual.able')}}</div></el-col>
  		<el-col :span="12"><div class="">{{$t("popups.6")}}：{{form.fsymbol}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.7")}}：{{form.fname}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.8")}}：{{form.fisShare==0?"false":"true"}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.9")}}：{{form.fIsWithDraw==0?"false":"true"}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.10")}}：{{form.furl}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.11")}}：{{form.fcount}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.12")}}：{{form.ftradeTime}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.13")}}：{{form.ftradeTime}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.16")}}：{{form.fprice}}</div></el-col>
</el-row>
<el-row :gutter="20">
  		 <el-col :span="12"><div class=" ">{{$t("popups.15")}}：{{form.fproportion}}</div></el-col>
  		<el-col :span="12"><div class=" ">{{$t("popups.16")}}：{{form.fisRecharge==0?"false":"true"}}</div></el-col>
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
         			 fid: "",
                fshortName: "",
                fdescription: "",
                faddTime: "",
                fstatus: "",
                fsymbol: "",
                fname: "",
                fIsWithDraw: "",
                furl: "",
                fcount: "",
                ftradeTime: "",
                fprice: "",
                fversion: "",
                fisDefAsset: "",
                fproportion: "",
                fisRecharge: "",
                fisShare: ""
        }
      }
    },
     props:['fids'],
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
        	_this.$http.get(auth.getServerUrl()+api.VIRTUAL_GENERA_DETAIL+ "?fid=" + parme_fid )                                                                            
       			 .then(res => {
                 var d=res.data;    
                  _this.form.fid = d.data.fid;  
                    _this.form.fshortName = d.data.fshortName; 
                    _this.form.faddTime = d.data.faddTime; 
                      _this.form.fdescription = d.data.fdescription;  
                        _this.form.fstatus = d.data.fstatus;  
                          _this.form.fsymbol = d.data.fsymbol;  
                            _this.form.fname = d.data.fname;  
					                    _this.form.fIsWithDraw = d.data.fIsWithDraw; 
					                      _this.form.furl = d.data.furl;  
					                        _this.form.fcount = d.data.fcount;  
					                          _this.form.ftradeTime = d.data.ftradeTime;  
											                _this.form.fprice = d.data.fprice;  
						                          _this.form.fversion = d.data.fversion;  
						                            _this.form.fname = d.data.fname;  
											                    _this.form.fisDefAsset = d.data.fisDefAsset; 
											                      _this.form.fproportion = d.data.fproportion;  
											                        _this.form.fisRecharge = d.data.fisRecharge;  
											                          _this.form.fisShare = d.data.fisShare;  
            }).catch((error) => {
           console.log(error)
        }); 
      },
//   				 statusForma:function(row, column){
//							return  row.fstatus>0?(row.fstatus==1?'启用':'删除' ) :"禁用"
//						},
//						fisDefAsset:function(row, column){
//							return row.fisDefAsset==0?"不是":"是";
//						},
//						fisRecharge:function(row, column){
//							return row.fisRecharge==0?"不是":"是";
//						},
//						fisShare:function(row, column){
//							return row.fisShare==0?"false":"true";
//						},
//						fIsWithDraw:function(row, column){
//							return row.fIsWithDraw==0?"false":"true";
//						},

    }
  }
</script>
