//import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";

//import resource from "../pages/user/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import user from "../pages/user/user.vue";
//import userAdd from "../pages/user/userAdd.vue";
import test from "../pages/test.vue";
//import register from "../pages/register.vue";
//用户银行账户
import userBank from "../pages/user/userBank.vue";
//用戶管理/会员等级
import memberLevel from "../pages/user/memberLevel.vue";
//会员资产记录列表
import assetRecord from "../pages/user/assetRecord.vue";
import operationLog from "../pages/user/operationLog.vue";//会员操作日志
import auditCard from "../pages/user/auditCard.vue";//待审核
import fintrolinfo from "../pages/user/fintrolinfo.vue";//推广收益
import userOnline from "../pages/user/userOnline.vue";//会员在线
import information from "../pages/information/information.vue"

//报表统计  会员注册统计表
import Registration from "../pages/report/Registration.vue";
import Recharge from "../pages/report/Recharge.vue";
import GetMoney from "../pages/report/GetMoney.vue";
import pushMoney from "../pages/report/pushMoney.vue";
import Virtua from "../pages/report/Virtua.vue";
import onLine from "../pages/report/onLine.vue";
import synthesize from "../pages/report/synthesize.vue";
   
//数字资产操作管理
import virtualCoinType from "../pages/virtual/virtualCoinType.vue";
import virtualCoinSite from "../pages/virtual/virtualCoinSite.vue";
import listAll from "../pages/virtual/listAll.vue";
import pushMoneyList from "../pages/virtual/pushMoneyList.vue";
import checkVirtua from "../pages/virtual/checkVirtua.vue";


//资金操作管理
import capitaloperationList from "../pages/rmb/capitaloperationList.vue";
import capitalInSucList from "../pages/rmb/capitalInSucList.vue";
import capitalOutSucList from "../pages/rmb/capitalOutSucList.vue";
import capitalInList from "../pages/rmb/capitalInList.vue";
import capitalOutList from "../pages/rmb/capitalOutList.vue";
import walletList from "../pages/rmb/walletList.vue";
import operationLogList from "../pages/rmb/operationLogList.vue";
import withdrawFeesList from "../pages/rmb/withdrawFeesList.vue";
//提问管理
import questions from "../pages/question/questions.vue";
import replying from "../pages/question/replying.vue";
import replyed from "../pages/question/replyed.vue";
//系统管理列表

import bankAccount from "../pages/system/bankAccount.vue";
import help from "../pages/system/help.vue";
import dict from "../pages/system/dict.vue";
import qqManage from "../pages/system/qqManage.vue";
import systems from "../pages/system/systems.vue";

// Routes
const routes = [
		//登录
  {
  		path: '/',
  		 name: '',
  	component: login,
  	
  },
  	{
  		path: '/login',
  		 name: 'login',
  	component: login,
  	
    },

  {
    path: '/test', 
    component: app,
    children:[
    {
    path: '*',
    component: test
    }
  ]
  },
  {
    path: '', 
    component: app,
    children: [
    {
    	path: '/index',
    	component: onLine,
    	 name:"首页"
    },
    {
    	path: '/user/user', 
    	component: user,
    	 name:"会员信息管理"
    },
    {
    	path: '/user/memberLevel',//会员等级
    	component: memberLevel,
    	 name:"会员等级"
    },
//  {
//  	path: '/user/userAdd', 
//  	component: userAdd,
//  	 name:"新增用户"
//  },

    {
    	path: '/user/bankList', 
    	component: userBank,
    	name:"会员银行账户"
    },
    {
    	path: '/user/assetRecord', 
    	component: assetRecord,
    	 name:"会员资产记录"
    },
    {
    	path: '/user/operationLog', 
    	component: operationLog,
    	name:"会员操作日志"
    },
    {
    	path: '/user/auditCard', 
    	component: auditCard,
    	name:"待审会员"
    },
    {
    	path: '/user/fintrolinfo', 
    	component: fintrolinfo,
    	 name:"推广收益"
    },
    {
    	path: '/user/userOnline', 
    	component: userOnline,
    	name:"会员在线"
    },
    {
    	path: '/report/Registration', 
    	component: Registration,
    	 name:"会员注册统计"
    },
    {

    	path: '/information', 
    	component: information,
    	 name:"资讯管理"
	},
	{
    	path: '/report/Recharge', 
    	component: Recharge,
    	 name:"资金充值统计"
    },
    {
    	path: '/report/GetMoney', 
    	component: GetMoney,
    	 name:"资金提现统计"
    },
    {
    	path: '/report/pushMoney', 
    	component: pushMoney,
    	 name:"数字资产充值统计"
    }, 
    {
    	path: '/report/Virtua', 
    	component: Virtua,
    	 name:"数字资产提現统计"

    },
    {
    	path: '/report/onLine', 
    	component: onLine,
    	 name:"会员在线统计"

    },
     {
    	path: '/report/synthesize', 
    	component: synthesize,
    	 name:"综合统计"

    },
    {//数字资产操作管理
  		path: '/virtual/virtualCoinType', 
  	component: virtualCoinType,
  	 name: '数字资产类型操作',
  	
    }
    ,
  	{
  		path: '/virtual/virtualCoinSite', 
  	component: virtualCoinSite,
  	 name: '数字资产可用地址列表',
  	
    },
     
  	{
  		path: '/virtual/listAll', 
  	component: listAll,
  	 name: '数字资产操作总表',
  	
    },
     
  	{
  		path: '/virtual/pushMoneyList', 
  	component: pushMoneyList,
  	 name: '手工充值列表',
  	
    },
     
  	{
  		path: '/virtual/checkVirtua', 
  	component: checkVirtua,
  	 name: '待审核资金提现列表',
  	
    },

	{
		path: '/rmb/capitaloperationList', 
		component: capitaloperationList,
	 	name: '资金操作总表',
	},
	{
		path: '/rmb/capitalInSucList', 
		component: capitalInSucList,
	 	name: '成功充值列表',
	},
	{
		path: '/rmb/capitalOutSucList', 
		component: capitalOutSucList,
	 	name: '成功提现列表',
	},
	{
		path: '/rmb/capitalInList', 
		component: capitalInList,
	 	name: '待审核资金充值',
	},
	{
		path: '/rmb/capitalOutList', 
		component: capitalOutList,
	 	name: '待审核资金提现',
	  },
	  {
		path: '/rmb/walletList', 
		component: walletList,
	 	name: '会员资金列表',
	  },
	  {
		path: '/rmb/operationLogList', 
		component: operationLogList,
	 	name: '资金手工充值',
	  },
	  {
		path: '/rmb/withdrawFeesList', 
		component: withdrawFeesList,
	 	name: '资金提现手续费',
  	}, 
	{
	path: '/question/questions', 
	component:questions,
	 name: '提问记录列',
	
    },
    {
		path: '/question/replying', 
	component: replying,
	 name: '待回复列表列表',
	
    },{
		path: '/question/replyed', 
	component: replyed,
	 name: '已回复列表列表',
	
	},//系统管理列表
    {
    	path: '/system/bankAccount', 
    	component: bankAccount,
    	name:"银行账户列表"
    },
    {
    	path: '/system/help',
    	component: help,
    	name:"帮助分类列表"
    },
    {
    	path: '/system/dictionaries',
    	component: dict,
    	name:"字典管理"
    },
    {
    	path: '/system/systems',
    	component: systems,
    	name:"系统管理"
    },
    {
    	path: '/system/qqManage',
    	component: qqManage,
    	name:"QQ群管理"
    },

  ]
  },
  {path: '*', component: NotFoundView}
]


export default routes

