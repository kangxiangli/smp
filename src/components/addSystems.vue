<style type="text/css">
	#boxaa {
		width: 82px;
		height: 36px;
		z-index: 99;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		position: absolute;
		left: 0;
		background: #20a0ff;
		color: #fff;
		-webkit-appearance: none;
		text-align: center;
		box-sizing: border-box;
		outline: none;
		margin: 0;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		padding: 10px 15px;
		font-size: 14px;
		border-radius: 4px;
	}
	
	#box {
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		position: absolute;
		left: 78px;
		width: 127px;
		height: 36px;
		background: #20a0ff;
		color: #fff;
		-webkit-appearance: none;
		text-align: center;
		box-sizing: border-box;
		outline: none;
		margin: 0;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		padding: 10px 15px;
		font-size: 14px;
		border-radius: 4px;
	}
</style>

<template>
	<imp-panel>
		<el-form :model="form" label-width="180px">
			<el-form-item label="id" v-if="isShow">
				<el-input v-model="form.fid" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item label="key">
				<el-input v-model="form.fkey" :placeholder="$t('input.1')" style="width:300px"></el-input>
			</el-form-item>
			<el-form-item :label="$t('dialog.2')">
				<imp-panel>
					<div class="vue-upload-img-multiple">
						<div v-if="images.length >0">
							<div v-for="image in images">
								<img :title="$t('dialog.3')" :src="image" @click='delImage($index)' style="width:15%;cursor: pointer;" />
							</div>
						</div>
						<div>
							<div v-if="!image">
								<input type="file" accept="image/jpeg,image/png,image/jpg" @change="onFileChange" style="position: relative;cursor: pointer;color: #fff;z-index: 99;width: 193px;">
								<div id="boxaa"><i class="el-icon-upload el-icon--right"></i></div>
								<div id="box"></div>

							</div>
							<div v-else>
								<img :src="image" />
							</div>
						</div>
					</div>
				</imp-panel>
			</el-form-item>
			<el-form-item :label="$t('dialog.4')">
				<el-input type="textarea" v-model="form.fvalue"></el-input>
			</el-form-item>
			<el-form-item :label="$t('dialog.5')">
				<el-input type="textarea" v-model="form.fdesc"></el-input>
			</el-form-item>
			<el-form-item :label="$t('dialog.6')">
				<el-radio v-model="form.fstate" label="0">{{$t("button.enable")}} </el-radio>
				<el-radio v-model="form.fstate" label="1">{{$t("button.disable")}} </el-radio>
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
			'imp-panel': panel,
		},
		data() {
			return {
				images: [],
				isShow: false,
				filedata: "",
				form: {
					fid: "",
					fstate: "",
					fdesc: "",
					fvalue: "",
					fkey: ""
				}
			}
		},
		props: [],
		watch: {},
		created() {},
		i18n,
		methods: {
			onFileChange(e) {
				var files = e.target.files || e.dataTransfer.files;
				this.filedata = e.target.files[0];
				//              this.form.media1=e.target.files[0];
				if(!files.length) return;
				this.createImage(files);
			},
			createImage(file) {
				if(typeof FileReader === 'undefined') {
					this.$message(this.$t('script.7'));
					return false;
				}
				var image = new Image();
				var vm = this;
				var leng = file.length;
				for(var i = 0; i < leng; i++) {
					var reader = new FileReader();
					reader.readAsDataURL(file[i]);
					reader.onload = function(e) {
						vm.images.push(e.target.result);

					};
				}
			},

			delImage: function(index) {
				this.images.shift(index)
			}

		}
	}
</script>