<template>
	<imp-panel>
		<el-form :model="form" ref="ruleForm" label-width="200px" class="demo-ruleForm">
			<el-form-item label="id" style="display: none;">
				<el-input v-model="fid" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="">
				<ul>
					<li v-for="item in flevels">
						{{$t("popups.19")}} {{ item.flevel }} {{$t("popups.20")}}
						<el-input prop="ffee" v-model="item.ffee"></el-input>
						{{$t("popups.19")}} {{ item.flevel }} {{$t("popups.21")}}
						<el-input prop="fbuyfee" v-model="item.fbuyfee"></el-input>
						{{$t("popups.19")}} {{ item.flevel}} {{$t("popups.22")}}
						<el-input prop="fwithdraw" v-model="item.fwithdraw"></el-input>
					</li>
				</ul>

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
		data() {
			return {
				 flevels: [],
					fid:""
				
			}
		},
		props: [],
		watch: {

		},
		created() {

		},
		i18n,
		methods: {

		}
	}
</script>