<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
   background: #EEF1F6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    padding-left: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<template>
  <imp-panel >
  	<h3 class="box-title" >{{$t("title.1")}}</h3>
  	<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.1")}}：{{this.allUCount}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.2")}}：{{this.allNowUCount}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.3")}}：{{this.allrealUCount}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.4")}}：{{this.allTodayrealUCount}}</div></el-col>
</el-row>
<h3 class="box-title" >{{$t("title.2")}}</h3>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.13")}}：{{this.chargeTD}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.14")}}：{{this.chargeCardTotal}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.15")}}：{{this.chargeAlipTotal }}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.16")}}：{{this.chargeOnlTotal}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.17")}}：{{this.chargeWxTotal }}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.18")}}：{{this.chargeTdTotal }}</div></el-col>
</el-row>
<h3 class="box-title" >{{$t("title.3")}}</h3>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.19")}}：{{this.totalCny}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.20")}}：{{this.totalCnyFro}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.21")}}：{{this.totalFvi }}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.22")}}：{{this.totalFviFro}}</div></el-col>
</el-row>
<h3 class="box-title" >{{$t("title.4")}}</h3>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.5")}}：{{this.totalTdWithdraw}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.6")}}：{{this.titalTdFee}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.7")}}：{{this.totalWithdraw}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.8")}}：{{this.titalFee}}</div></el-col>
   <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.9")}}：{{this.totalFviTd}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.10")}}：{{this.totalFviTdFeeWithdraw}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.11")}}：{{this.totalFviWithdraw}}</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">{{$t("report.12")}}：{{this.totalFvFeeiWithdraw}}</div></el-col>
</el-row>
  </imp-panel>
</template>
<script>
import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import auth from "../../auth"
   import reportzh from "../../resources/report/zh";
  import reporten from "../../resources/report/en";
//import en from '../../resources/en';
//import zh from '../../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(reporten)),
  	zh:JSON.parse(JSON.stringify(reportzh))
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
      		
      		 allUCount: "",
		    allNowUCount: "",
		    allrealUCount: "",
		    allTodayrealUCount: "",
		    chargeTD: "",
		    chargeCardTotal:"",
		    chargeAlipTotal: "",
		    chargeOnlTotal: "",
		    chargeWxTotal:"",
		    chargeTdTotal:"",
		    totalCny:"",
		    totalCnyFro:"",
		    totalFvi: "",
		    totalFviFro:"",
		    totalTdWithdraw: "",
		    titalTdFee: "",
		    totalWithdraw: "",
		    titalFee:"",
		    totalFviTd: "",
		    totalFviTdFeeWithdraw: "",
		    totalFviWithdraw: "",
		    totalFvFeeiWithdraw:"",
		  
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
        	_this.$http.get(auth.getServerUrl()+api.REPORT_VIP_ALLREPORT)                                                                            
       			 .then(res => {
                 var d=res.data;    
                  _this.allUCount = d.data.allUCount;  
                    _this.allNowUCount = d.data.allNowUCount;  
                      _this.allrealUCount = d.data.allrealUCount;  
                        _this.allTodayrealUCount = d.data.allTodayrealUCount;  
                          _this.chargeTD = d.data.chargeTD;  
                            _this.chargeCardTotal = d.data.chargeCardTotal;  
                              _this.chargeAlipTotal = d.data.chargeAlipTotal;  
                                _this.chargeOnlTotal = d.data.chargeOnlTotal;  
                                  _this.chargeWxTotal = d.data.chargeWxTotal;
                                   _this.chargeTdTotal = d.data.chargeTdTotal;  
                                    _this.totalCnyFro = d.data.totalCnyFro;  
                                     _this.totalCny = d.data.totalCny;  
                                     _this.totalFvi = d.data.totalFvi;
                                      _this.totalFviFro = d.data.totalFviFro;
                                       _this.totalTdWithdraw = d.data.totalTdWithdraw;
                                          _this.totalCnyFro = d.data.totalCnyFro;  
                                     _this.totalFviTd = d.data.totalFviTd;  
                                     _this.totalFviTdFeeWithdraw = d.data.totalFviTdFeeWithdraw ;
                                      _this.totalFviWithdraw = d.data.totalFviWithdraw;
                                       _this.totalFvFeeiWithdraw = d.data.totalFvFeeiWithdraw;
                                      _this.titalFee = d.data.titalFee;
                                       _this.titalTdFee = d.data.titalTdFee;
                                           _this.totalWithdraw = d.data.totalWithdraw;
                                                                                                                                  
            			                                                                                          
              			                                                                                                                         
            }).catch((error) => {
           console.log(error)
        }); 
            

      }
    }
  }
</script>
