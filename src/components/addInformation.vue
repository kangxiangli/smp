
<template>
  	  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <!--<el-form-item :label="$t('table.1')">
		        <el-input v-model="form.fcreateAdmin"  style="width:300px"></el-input>
		      </el-form-item>-->
          <el-form-item :label="$t('table.11')" style="display: none;">
		        <el-input v-model="form.fmodifyAdmin"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.2')">
		        <!--<el-input v-model="form.farticleType"  style="width:300px"></el-input>-->
		        <el-select style="width:300px;" clearable filterable v-model="form.farticleType" :placeholder="$t('table.2')">
						<el-option v-for="item in soptions" :key="item.tvalue" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
		      </el-form-item>
          <el-form-item :label="$t('table.3')">
		        <el-input v-model="form.ftitle"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.12')">
		        <el-input v-model="form.fkeyword"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.13')">
		        <el-input v-model="form.fdescription"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.14')">
		        <el-input v-model="form.fcontent"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.15')">
		        <el-input v-model="form.fcreateTime" :disabled="true" style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.6')">
		        <el-input v-model="form.flastModifyTime"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.17')">
		        <el-input v-model="form.furl"  style="width:300px"></el-input>
		      </el-form-item>
          <!--<el-form-item :label="$t('table.16')">
		        <el-input v-model="form.fcount"  style="width:300px"></el-input>
		      </el-form-item>-->
          <el-form-item :label="$t('table.18')">
                <el-select class="select" v-model="form.fisout" style="width:300px" :placeholder="$t('table.19')">
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item :label="$t('table.20')">
		        <el-input v-model="form.foutUrl"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.5')">
            <el-select class="select" v-model="form.fisTop" style="width:300px" :placeholder="$t('table.19')">
               <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <!--<el-form-item :label="$t('table.21')">
		        <el-input v-model="form.fversion"  style="width:300px"></el-input>
		      </el-form-item>-->
		    </el-form>
		  </imp-panel>
</template>
<script>
  	import panel from "./panel.vue"
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	   import auth from "../auth"
  import * as api from "../api";
	import informationzh from "../resources/information/zh";
	import informationen from "../resources/information/en";
	const messages = {
		en: JSON.parse(JSON.stringify(informationen)),
		zh: JSON.parse(JSON.stringify(informationzh))
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
        soptions: [{//标题
					tlabel:this.$t('time.5'),
					tvalue:""
				}],
				svalue: '',
        options: [{
          value: '0',
          label: this.$t('script.3')
        }, {
          value: '1',
          label: this.$t('script.2')
        }],
        form: {
         				fid: "",
                fcreateAdmin: "",
//              fmodifyAdmin:"",
                farticleType:"",
                ftitle:"",
                fkeyword:"",
                fdescription:"",
                fcontent:"",
                fcreateTime:"",
                flastModifyTime:"",
                furl:"",
                fcount:"",
                fisout:"",
                foutUrl:"",
                fisTop:"",
//              fversion:""
        },
//      selectValue:""
      }
    },
     props:[],
    watch:{

   
    },
    created(){
     this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"12",this.soptions);//文章类型
    },
    i18n,
    methods: {
     
    }
  }
</script>
