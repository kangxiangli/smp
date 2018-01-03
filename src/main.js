// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'eventsource-polyfill'
import Vue from "vue";
import Vuex from "vuex";
import frame from "./frame.vue";

// import NProgress from "vue-nprogress";
import { sync } from "vuex-router-sync";
import store from "./store";
import axios from "axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import { TOGGLE_SIDEBAR } from "./store/mutation-types";
import VueLazyload from "vue-lazyload";
import auth from "./auth";
import Element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import ImpPanel from "./components/panel.vue";
import Loading from "./js/loading";
//国际化
import VueI18n from 'vue-i18n'
import VueRouter from "vue-router";
import routeConfig from "./router"
//import vuexI18n from 'vuex-i18n';
//引入要翻译的文件
import en from '../src/resources/en';
import zh from '../src/resources/zh';
Vue.use(VueI18n)
Vue.use(Element);
Vue.use(Loading);
const messages = {
	en: JSON.parse(JSON.stringify(en)),
	zh: JSON.parse(JSON.stringify(zh))
}
let item = window.localStorage.getItem('ELEMENT_LANGUAGE')
if(item == null) {
	window.localStorage.setItem('ELEMENT_LANGUAGE', "zh");
	window.location.reload()
}
const i18n = new VueI18n({
	locale: item, // 语言标识
	messages
})
// or with options
Vue.use(VueLazyload, {
	preLoad: 1.3, //预加载高度
	attempt: 1 //尝试次数
})

function getBaseUrl(url) {
	var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
	reg.exec(url);
	return RegExp.$1;
}

// axios.defaults.baseURL = 'https://www.baidu.com';
axios.defaults.baseURL = getBaseUrl(window.location.href);
axios.defaults.headers.common['Authorization'] = auth.getUid();
//axios.defaults.headers.common['authSid'] = auth.getSid();
Vue.prototype.$http = axios
Vue.axios = axios

//加载路由中间件
Vue.use(VueRouter)
// const options = { 
//   latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
//   router: true, // Show progressbar when navigating routes, default: true
//   http: true // Show progressbar when doing Vue.http and Vue.axios default: true
// };
// Vue.use(NProgress, options)

Vue.component(ImpPanel.name, ImpPanel); //全局注册

const options = {
	color: '#eeeeee',
	failedColor: '#874b4b',
	thickness: '2px',
	transition: {
		speed: '0.2s',
		opacity: '0.6s'
	},
	autoRevert: true,
	location: 'top',
	inverse: false
}

Vue.use(VueProgressBar, options)

//定义路由
const router = new VueRouter({
	routes: routeConfig,
	//mode: 'history'
})
sync(store, router)
const {state} = store
router.beforeEach((route, redirect, next) => {
	if(state.device.isMobile && state.sidebar.opened) {
		store.commit(TOGGLE_SIDEBAR, false)
	}
	if(!auth.loggedIn() && route.path !== '/login') {
		next({
			path: '/login',
			query: {
				redirect: route.fullPath
			}
		})
	} else {
		next()
	}
})
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// alert(window.sessionStorage.getItem("Authorization"));
	// 在发送请求之前做些什么
	config.headers.Authorization = auth.getUid();
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
axios.interceptors.response.use(
	response => {
    if (response.data && response.data.code||response.data.success==false) {
      if (response.data.code === '2001') {
//    		Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
        auth.logout()
         	router.push({path: '/login'})
      }else if(response.data.code === '2003'){
     
      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout()
      	  	router.push({path: '/login'})
      }else if(response.data.code === '2004'){

      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout();
      	 router.push({path: '/login'})
      }else if(response.data.code === '2005'){
      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout()
      	 router.push({path: '/login'})
      }else{//false
        Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      }
    }
		return response;
	},
	error => {
		if(error.response) {
			//全局ajax错误信息提示
			// Element.MessageBox({type:"error",message:error.response.data,title:"温馨提示"});
		}
		return Promise.reject(error);
	});

// const nprogress = new NProgress({parent: '.nprogress-container'})

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
//vue挂载格式化时间
Vue.prototype.meFormat = function(obj) {
	var date = new Date(obj);
	var y = 1900 + date.getYear();
	var m = "0" + (date.getMonth() + 1);
	var d = "0" + date.getDate();
	return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}
//vue挂载产看详情
Vue.prototype.getStatus=function(str) {//人民币充值提现状态
    let res="";
    switch (str){
      case "0101":
        res=this.$t('pubilc.5')
        break;
      case "0102":
        res=this.$t('pubilc.6');
        break;
      case "0103":
        res=this.$t('pubilc.7');
        break;
      case "0104":
        res=this.$t('pubilc.8');
        break;
      case "0105":
        res=this.$t('pubilc.9');
        break;
      case "0201":
        res=this.$t('pubilc.10');
        break;
      case "0202":
        res=this.$t('pubilc.11');
        break;
      case "0203":
        res=this.$t('pubilc.12');
        break;
      case "0204":
        res=this.$t('pubilc.13');
        break;
      case "0205":
        res=this.$t('pubilc.14');
        break;
//    case "0601":
//      res=this.$t('pubilc.15');
//      break;
//    case "0602":
//      res=this.$t('pubilc.16');
//      break;
//    case "0603":
//      res=this.$t('pubilc.17');
//      break;
//    case "0604":
//      res=this.$t('pubilc.18');
//      break;
//    case "0605":
//      res=this.$t('pubilc.19');
//      break;
    }
      return res;
  },
  //获取状态
Vue.prototype.getType=function(str){
    return str==0?this.$t('pubilc.20'):this.$t('pubilc.21');
  },
  //vue挂载产看详情
Vue.prototype.getfremittanceType=function(str){
    let res="";
    switch (str){
      case "0301":
        res=this.$t('pubilc.22');
        break;
      case "0302":
        res=this.$t('pubilc.23');
        break;
      case "0303":
        res=this.$t('pubilc.24');
        break;
      case "0304":
        res=this.$t('pubilc.25');
        break;
      }
      return res;
  }

Vue.prototype.getfType=function(str){//系统管理-帮助分类-类型
    let res="";
    switch (str){
      case "1001":
        res=this.$t('pubilc.1');
        break;
      case "1002":
        res=this.$t('pubilc.2');
        break;
      case "1003":
        res=this.$t('pubilc.3');
        break;
      case "1004":
        res=this.$t('pubilc.4');
        break;
         case "1005":
        res=this.$t('pubilc.5');
        break;
      }
      return res;
  }

Vue.prototype.handStatus=function(getUrl,url,param,opt) { //手工充值状态表类型
		opt = (opt == undefined) ? "toptions" : opt;
	this.$http.get(getUrl + url + "?pid=" + param)
		.then(res => {
			if(res.data.success = true) {
				var ary = res.data.data;
				for(let i = 0; i < ary.length; i++) {
					let obj = {
						fvalue: "",
						fcode:""
					};
					obj.tvalue = ary[i].fcode;                                   
					obj.tlabel = ary[i].fvalue;
					opt.push(obj);
				}
			}else{
				Element.MessageBox({type:"error",message:res.data.msg,title:"温馨提示"});
			}
		}).catch((error) => {
			console.log(error)
		});
},


Vue.prototype.handLink=function(getUrl,url) { //获取虚拟币名称
	this.$http.get(getUrl + url)
		.then(res => {
			if(res.data.success = true) {
				var ary = res.data.data;
				for(let i = 0; i < ary.length; i++) {
					let obj = {
						value: "",
						label: "",
					};
					obj.value = ary[i].fname;
					obj.label= ary[i].fname;
					this.options.push(obj);
				}
			}
		}).catch((error) => {
			console.log(error)
		});
},
Vue.prototype.getBtnS = function(arr) { //获取按钮
	if(!arr.length) {
		return
	} else {
		for(let i = 0; i < arr.length; i++) {
			let arrs = arr[i];
			if(arrs) {
				this[arrs] = true;
			}
		}
	}
},
Vue.prototype.handRoleBtn = function(getUrl, url, param,arr) { //按钮权限
	arr = (arr == undefined) ? "fcodeD" : arr;
	this.$http.get(getUrl + url + "?roleUrl=" + param)
		.then(res => {
			if(res.data.success = true) {
				var ary = res.data.data;
			for(let i = 0; i < ary.length; i++) {
					arr.push(ary[i].fcode);
				}
				this.getBtnS(arr);
			
			}
		}).catch((error) => {
			console.log(error);
		});
},
/*定义在全局 
过滤filter
*/
Vue.prototype.statusForma= function(row, column) {
				return row.fstatus == 0 ? this.$t('button.disable') : this.$t('button.able');
			},
Vue.filter('statusFilter', function(fstatus) {
	 let statusMap="";
    switch (fstatus){
      case "1":
        statusMap="success";
        break;
      case "0":
        statusMap="warning";
        break;
       
      }
      return statusMap
})
Vue.filter('typeFilter', function(fstatus) {
	 let statusMap="";
    switch (fstatus){
      case "0402":
        statusMap="success";
        break;
      case "0401":
        statusMap="warning";
        break;
       
      }
      return statusMap
})


//Vue.filter('statusF', function(fstatus) {
//   const statusMap = {
//	       	  1:'success',
//    		 0:'warning',
//    		  2:'danger',
//    		    null:'gray'
//	      }
//	      return statusMap[fstatus]
//});

new Vue({
	//加載組件下的文件
	store,
	// nprogress,
	i18n,
	router,
	el: "#root",
	render: h => h(frame),

})