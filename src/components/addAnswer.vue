<template>
	<imp-panel>
		<el-form  :model="form" label-width="80px">
			<el-form-item label="id">
				<el-input v-model="form.fid" :readonly="true"></el-input>
			</el-form-item>
			<el-form-item :label="$t('table.1')">
				<el-input v-model="form.fuserName" :readonly="true"></el-input>
			</el-form-item>
			<el-form-item :label="$t('table.3')">
				<el-input v-model="form.fname" :readonly="true"></el-input>
			</el-form-item>
			<el-form-item :label="$t('table.8')">
				<el-input type="textarea" v-model="form.fanswer"></el-input>
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
  import questionzh from "../resources/question/zh";
  import questionen from "../resources/question/en";
//import en from '../resources/en';
//import zh from '../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(questionen)),
  	zh:JSON.parse(JSON.stringify(questionzh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
	  	messages
	})
	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			return {
				isShow:false,
				form: {
					fid:"",
					fuserName: "",
					fname: "",
					fanswer: ""
				}
			}
		},
		props: [
	"fid"
		],
		watch:{
    	fid(){
      this.loadData();
    	}
    },
		created() {

		},
		i18n,
		methods: {

		}
	}
</script>