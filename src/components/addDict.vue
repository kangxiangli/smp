
<template>
  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item :label="$t('table.9')">
		        <el-input v-model="form.fcode" style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item :label="$t('table.10')">
                <el-select class="select" v-model="form.fparentId" filterable  style="width:300px" :placeholder="$t('script.10')">
               <el-option
                v-for="item in fparentIds"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item  :label="$t('table.3')">
		        <el-input v-model="form.fvalue"  style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item  :label="$t('table.fstatus')">
                <el-select class="select" v-model="form.fstate" style="width:300px" :placeholder="$t('script.10')">
               <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
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
    "imp-panel": panel
  },
  data() {
    return {
      options: [
        {
          value: "0",
          label: this.$t('script.13')
        },
        {
          value: "1",
          label: this.$t('script.14')
        }
      ],
      form: {
        fid: "",
        fcode: "",
        fparentId: "",
        fvalue: "",
        fstate: ""
      },
      fparentIds: [],
      selectValue: ""
    };
  },
  props: [],
  created() {

  },
  i18n,
  methods: {
    
  }
};
</script>
