
<template>
  	  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item :label="$t('table.fbankName')">
		       <!-- <el-input v-model="form.fbankName"  style="width:300px"></el-input>-->
		       <el-select style="width: 300px;" clearable filterable v-model="svalue" :placeholder="$t('table.fbankName')">
						<el-option v-for="item in soptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
		      </el-form-item>
          <el-form-item :label="$t('table.fownerName')">
		        <el-input v-model="form.fownerName"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.fbankNumber')">
		        <el-input v-model="form.fbankNumber"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.fbankAddress')">
		        <el-input v-model="form.fbankAddress"  style="width:300px"></el-input>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>
  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "./panel.vue"
    import auth from "../auth"
  import * as api from "../api";
  import syszh from "../resources/sys/zh";
  import sysen from "../resources/sys/en";
  Vue.use(VueI18n)
	const messages={
	  en:JSON.parse(JSON.stringify(sysen)),
  	zh:JSON.parse(JSON.stringify(syszh))
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
      	soptions: [{
					tvalue: '',
					tlabel: this.$t('pubilc.1')
				}],
				svalue: '',
        form: {
         				fid: "",
                fbankName: "",
                fownerName:"",
                fbankNumber:"",
                fbankAddress:"",
        }
      }
    },
     props:[],
    watch:{
    },
    created(){
    	this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"08",this.soptions);
    },
    i18n,
    methods: {
   
    }
  }
</script>
