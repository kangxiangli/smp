/**
 * Created by kk on 2017/9/25.
 */
export default [

  {"id":6,"parentId":null,"sort":6,"fname":"会员管理","furl":"/user","ficon":"el-icon-setting","children":
      [

        {"id":9,"parentId":6,"sort":3,"fname":"会员信息管理","furl":"/user/user","ficon":"fa fa-user-plus","children":[]},
        {"id":10,"parentId":6,"sort":3,"fname":"会员等级","furl":"/user/memberLevel","ficon":"fa fa-user-plus","children":[]},
        {"id":11,"parentId":6,"sort":3,"fname":"会员银行账户","furl":"/user/bankList","ficon":"fa fa-user-plus","children":[]},
        {"id":12,"parentId":6,"sort":3,"fname":"会员资产记录","furl":"/user/assetRecord","ficon":"fa fa-user-plus","children":[]},
        {"id":13,"parentId":6,"sort":3,"fname":"会员操作日志","furl":"/user/operationLog","ficon":"fa fa-user-plus","children":[]},
        {"id":14,"parentId":6,"sort":3,"fname":"待审会员","furl":"/user/auditCard","ficon":"fa fa-user-plus","children":[]},
        {"id":15,"parentId":6,"sort":3,"fname":"推广收益","furl":"/user/fintrolinfo","ficon":"fa fa-user-plus","children":[]},
        {"id":15,"parentId":6,"sort":3,"fname":"会员在线","furl":"/user/userOnline","ficon":"fa fa-user-plus","children":[]}
      ]
  },    
 	{"id":6,"parentId":null,"sort":6,"fname":"报表统计","furl":"/report","ficon":"el-icon-setting","children":
      [

        {"id":108,"parentId":6,"sort":0,"fname":" 会员注册统计表","furl":"/report/Registration","ficon":"fa fa-database","children":[]},
         {"id":7,"parentId":6,"sort":1,"fname":"资金充值统计表","furl":"/report/Recharge","ficon":"fa fa-navicon","children":[]},
           {"id":9,"parentId":6,"sort":1,"fname":"资金提现统计表","furl":"/report/GetMoney","ficon":"fa fa-navicon","children":[]},
           {"id":10,"parentId":6,"sort":1,"fname":"数字资产充值统计表","furl":"/report/pushMoney","ficon":"fa fa-navicon","children":[]},
            {"id":11,"parentId":6,"sort":1,"fname":"数字资产提现统计表","furl":"/report/Virtua","ficon":"fa fa-navicon","children":[]},
             {"id":11,"parentId":6,"sort":1,"fname":"会员在线统计","furl":"/report/onLine","ficon":"fa fa-navicon","children":[]},
             {"id":11,"parentId":6,"sort":1,"fname":"综合统计","furl":"/report/synthesize","ficon":"fa fa-navicon","children":[]}
      ]
  },
   	{"id":6,"parentId":null,"sort":6,"fname":"数字资产管理","furl":"/virtual","ficon":"el-icon-setting","children":
      [
        {"id":108,"parentId":6,"sort":0,"fname":"数字资产登记","furl":"/virtual/virtualCoinType","ficon":"fa fa-database","children":[]},
         {"id":7,"parentId":6,"sort":1,"fname":"数字资产地址池","furl":"/virtual/virtualCoinSite","ficon":"fa fa-navicon","children":[]},
           {"id":9,"parentId":6,"sort":1,"fname":"数字资产操作总表","furl":"/virtual/listAll","ficon":"fa fa-navicon","children":[]},
           {"id":10,"parentId":6,"sort":1,"fname":"手工充值列表","furl":"/virtual/pushMoneyList","ficon":"fa fa-navicon","children":[]},
            {"id":11,"parentId":6,"sort":1,"fname":"会员数字资产列表","furl":"/virtual/checkVirtua","ficon":"fa fa-navicon","children":[]}
      ]
  },
  {"id":7,"parentId":null,"sort":6,"fname":"资金操作管理","furl":"/rmb","ficon":"el-icon-setting","children":
  [

    {"id":108,"parentId":7,"sort":0,"fname":" 资金操作总表","furl":"/rmb/capitaloperationList","ficon":"fa fa-database","children":[]},
    {"id":7,"parentId":7,"sort":1,"fname":"成功充值列表","furl":"/rmb/capitalInSucList","ficon":"fa fa-navicon","children":[]},
    {"id":9,"parentId":7,"sort":1,"fname":"成功提现列表","furl":"/rmb/capitalOutSucList","ficon":"fa fa-navicon","children":[]},
    {"id":10,"parentId":7,"sort":1,"fname":"待审核资金充值","furl":"/rmb/capitalInList","ficon":"fa fa-navicon","children":[]},
    {"id":11,"parentId":7,"sort":1,"fname":"待审核资金提现列表","furl":"/rmb/capitalOutList","ficon":"fa fa-navicon","children":[]},
    {"id":11,"parentId":7,"sort":1,"fname":"会员资金列表","furl":"/rmb/walletList","ficon":"fa fa-navicon","children":[]},
    {"id":11,"parentId":7,"sort":1,"fname":"手工充值列表","furl":"/rmb/operationLogList","ficon":"fa fa-navicon","children":[]},
    {"id":11,"parentId":7,"sort":1,"fname":"提现手续费列表","furl":"/rmb/withdrawFeesList","ficon":"fa fa-navicon","children":[]}
  ]
},
  {"id":7,"parentId":null,"sort":6,"fname":"提问管理","furl":"/question","ficon":"el-icon-setting","children":
  [

    {"id":108,"parentId":7,"sort":0,"fname":"提问记录列表","furl":"/question/questions","ficon":"fa fa-database","children":[]},
    {"id":7,"parentId":7,"sort":1,"fname":"待回复列表","furl":"/question/replying","ficon":"fa fa-navicon","children":[]},
    {"id":9,"parentId":7,"sort":1,"fname":"已回复列表","furl":"/question/replyed","ficon":"fa fa-navicon","children":[]}
  ]
},
 {"id":7,"parentId":null,"sort":6,"fname":"系统管理","furl":"/system","ficon":"el-icon-setting","children":
  [
    {"id":108,"parentId":7,"sort":0,"fname":"银行账户列表","furl":"/system/bankAccount","ficon":"fa fa-database","children":[]},
    {"id":9,"parentId":7,"sort":1,"fname":"帮助分类列表","furl":"/system/help","ficon":"fa fa-navicon","children":[]},
    {"id":9,"parentId":7,"sort":1,"fname":"字典管理","furl":"/system/dictionaries","ficon":"fa fa-navicon","children":[]},
      {"id":9,"parentId":7,"sort":1,"fname":"系统管理","furl":"/system/systems","ficon":"fa fa-navicon","children":[]},
        {"id":9,"parentId":7,"sort":1,"fname":"QQ群管理","furl":"/system/qqManage","ficon":"fa fa-navicon","children":[]}
   
  ]
},
  {"id":7,"parentId":null,"sort":7,"fname":"资讯管理","furl":"/information","ficon":"el-icon-setting","children":[]
}
  ]
