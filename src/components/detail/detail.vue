
<template>
  <imp-panel >
  	<el-row :gutter="20">
  		 <el-col :span="12"><div class="">{{$t("table.fid")}}：{{fids}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.28")}}：{{form.fnickName}}</div></el-col>
	</el-row>
	<el-row :gutter="20">
  		 <el-col :span="12"><div class="">{{$t("table.29")}}：{{form.floginPassword}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.30")}}：{{form.ftradePassword}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.31")}}：{{form.femail}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.22")}}：{{form.frealName}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.24")}}：{{form.fidentityNo}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.23")}}：{{form.ftelephone}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.25")}}：{{form.fregisterTime}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.32")}}：{{form.flastLoginTime}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.27")}}：{{form.fstatus}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.36")}}：{{form.fpostRealValidate}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.33")}}：{{form.flastLoginIp}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.37")}}：{{form.fpostRealValidate}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.38")}}：{{form.fhasRealValidate}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.39")}}：{{form.fpostRealValidate}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.40")}}：{{form.fhasRealValidate}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.41")}}：{{form.fpostRealValidateTime}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.42")}}：{{form.fhasRealValidateTime}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.34")}}：{{form.fidentityType}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.35")}}：{{form.fisTelephoneBind}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.49")}}：{{form.fitroUserId}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.43")}}：{{form.fareaCode}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.44")}}：{{form.fscoreId}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.45")}}：{{form.fversion}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.46")}}：{{form.fidentityPath}}</div></el-col>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.47")}}：{{form.fidentityPath2}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.48")}}：{{form.flastUpdateTime}}</div></el-col>
</el-row>
</el-row>
<el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.50")}}：{{form.fintroCount}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.51")}}：{{form.fqqLoginOpenId}}</div></el-col>
</el-row>
</el-row><el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.52")}}：{{form.fregType}}</div></el-col>
  <el-col :span="12"><div class="">{{$t("table.53")}}：{{form.fisValid}}</div></el-col>
</el-row>
</el-row><el-row :gutter="20">
 <el-col :span="12"><div class="">{{$t("table.54")}}：{{form.fregIp}}</div></el-col>
 <el-col :span="12"><div class="">{{$t("table.55")}}：{{form.flastLoginIp}}</div></el-col>
</el-row>
  </imp-panel>
</template>
<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
  import panel from "../panel.vue"
  import * as api from "../../api"
  import auth from "../../auth"
 	import userzh from "../../resources/user/zh";
	import useren from "../../resources/user/en";
	import en from '../../resources/en';
	import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(useren)),
		zh: JSON.parse(JSON.stringify(userzh))
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
                floginName: "",
                floginPassword: "",
                ftradePassword: "",
                fnickName: "",
                frealName: "",
               ftelephone: "",
                femail: "",
                fidentityNo: "",
                fregisterTime: "",
                flastLoginTime: "",
                fstatus: "",
                fpostRealValidate: "",
                fhasRealValidate: "",
                fpostRealValidateTime: "",
                fhasRealValidateTime: "",
                fidentityType: "",
                fisTelephoneBind: "",
                flastUpdateTime: "",
                fareaCode: "",
                fscoreId: "",
                fversion:"" ,
                fidentityPath: "",
                fidentityPath2: "",
                fitroUserId: "",
                fintroCount: "",
                fqqLoginOpenId: "",
                fregType: "",
                fisValid: "",
                fregIp: "",
                flastLoginIp: ""
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
        	_this.$http.get(auth.getServerUrl()+api.USER_GET_BYID + "?fid=" + parme_fid )                                                                            
       			 .then(res => {
                 var d=res.data;    
                  _this.form.fnickName = d.data.fnickName;  
                    _this.form.floginPassword = d.data.floginPassword; 
                      _this.form.floginPassword = d.data.floginPassword;  
                        _this.form.ftradePassword = d.data.ftradePassword;  
                          _this.form.fnickName = d.data.fnickName;  
                            _this.form.frealName = d.data.frealName;  
                              _this.form.ftelephone = d.data.ftelephone;  
                                _this.form.femail = d.data.femail;  
                                  _this.form.fidentityNo = d.data.fidentityNo;
                                   _this.form.fregisterTime = d.data.fregisterTime;  
                                    _this.form.flastLoginTime = d.data.flastLoginTime;  
                                     _this.form.fstatus = d.data.fstatus;  
                                     _this.form.fhasRealValidate = d.data.fpostRealValidate;
                                      _this.form.fpostRealValidateTime = d.data.fpostRealValidateTime;
                                       _this.form.fhasRealValidateTime = d.data.fhasRealValidateTime;
                                        _this.form.fidentityType = d.data.fidentityType;
                                         _this.form.fisTelephoneBind = d.data.fisTelephoneBind;
                                          _this.form.flastUpdateTime = d.data.flastUpdateTime;
                                           _this.form.fareaCode = d.data.fareaCode;
                                            _this.form.fscoreId = d.data.fscoreId;
                                             _this.form.fversion = d.data.fversion;
                                             _this.form.fidentityPath = d.data.fidentityPath;
                                             _this.form.fidentityPath2 = d.data.fidentityPath2;
                                             _this.form.fitroUserId = d.data.fitroUserId;
                                             _this.form.fintroCount = d.data.fintroCount;
                                             _this.form.fqqLoginOpenId = d.data.fqqLoginOpenId;
                                             _this.form.fregType = d.data.fregType;
                                             _this.form.fisValid = d.data.fisValid;
                                             _this.form.fintroCount = d.data.fintroCount;
                                             _this.form.fregIp = d.data.fregIp;
                                             _this.form.flastLoginIp = d.data.flastLoginIp;;
                                     
                                                                                                                                  
            			                                                                                          
              			                                                                                                                       
            });  
            

      }
    }
  }
</script>
