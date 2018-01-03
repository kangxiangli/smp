export const CONTEXT = '';
export const SERVERURL = CONTEXT + '/static/data/server.json';
//登录
export const LOGIN =CONTEXT + '/login/submit';
//退出
//export const LOGOUT = CONTEX + '/logout';
//register
export const REGISTER = CONTEXT + '/api/register';
//修改密码
export const CHANGE_PWD = CONTEXT + '/cd/smp/fuser/loginUser/upPwd';
export const USER_NAME = CONTEXT + '/cd/smp/fuser/login/getUser';//获取用户名
//用户
export const USER_SMP_DATA = CONTEXT + '/cd/smp/fuser/sel';//获取列表项
export const USER_GET_BYID = CONTEXT + '/cd/smp/fuser/getById';//点击产看详情
//重置手机号 type类型 1重装会员密码，2重置支付密码，3重置绑定手机，4重置邮箱
export const USER_RBANK_LIST = CONTEXT + '/cd/smp/fuserBank/list'; //会员银行账户
export const USER_RBANK_TYPE = CONTEXT + '/cd/fdict/getByPid'; //会员银行账户-银行类型
export const USER_RBANK_STATUS= CONTEXT + '/cd/fdict/getByPids'; //资金操作总表-银行状态
export const USER_ASSET = CONTEXT + '/cd/smp/fasset/fassetList'; //会员资产记录
export const USER_ASSET_DETAILE = CONTEXT + '/cd/smp/fasset/getById'; //会员资产记录-产看详情 
export const USER_LOG = CONTEXT + '/smp/fsyslog/list'; //会员资产记录
export const USER_LOG_TYPE = CONTEXT + '/cd/fdict/getByPid'; //会员资产记录
export const USER_AUDITCARD = CONTEXT + '/cd/smp/fuser/goAuditCard'; //未审核
export const USER_PASSAUDITCARD = CONTEXT + '/cd/smp/fuser/passAuditCard'; //审核通过
export const USER_NOTPASSAUDITCARD = CONTEXT + '/cd/smp/fuser/notPassAuditCard'; //审核未通过
export const USER_FINTROLINFO = CONTEXT + '/cd/smp/fintrolinfo/list'; //推广收益
export const USER_ONLINE_LIST = CONTEXT + '/cd/smp/fuser/onlineSel'; //会员在线
export const USER_ONLINE_LOGOUT = CONTEXT + '/cd/smp/fuser/onlineLogOut'; //会员踢出
export const USER_VIP_RESET = CONTEXT + '/cd/smp/fuser/reset';
export const USER_FUSER_ENABLE = CONTEXT + '/cd/smp/fuser/enable';//启用
export const USER_FUSER_DEL = CONTEXT + '/cd/smp/fuser/del';//禁用

export const USER_VIP_RESET_SAVE = CONTEXT + '/cd/smp/fscore/save'; //新增  修改
export const USER_VIP_RESET_DEL = CONTEXT + '/cd/smp/fscore/del'; //删除 
export const USER_VIP_RESET_SEL = CONTEXT + '/cd/smp/fscore/sel'; //列表 
export const USER_VIP_RESET_UPSAVE = CONTEXT + '/cd/smp/fuser/upUsersFscore'; //修改等级保存
export const USER_VIP_RESET_GETBYDATA = CONTEXT +'/cd/smp/fscore/getById'; //根据ID进行查询
//统计
export const REPORT_VIP_REGISTRATION= CONTEXT + '/cd/smp/reportForm/getUserRegGroup';//用户注册统计 
export const REPORT_VIP_RECHARGE= CONTEXT + '/cd/smp/reportForm/getRmbGroup';// 人民币充值提现统计 
export const REPORT_VIP_LIQUIDITY= CONTEXT + '/cd/smp/reportForm/fvirtualCoinGroup';// 数字资产转入转出统计 type  05 转入  06 转出
export const REPORT_VIP_ONLINE= CONTEXT + '/cd/smp/fuseronlinelog/statistics';// 会员在线统计
export const REPORT_VIP_ALLREPORT= CONTEXT +'/cd/smp/reportForm/allReport';// 综合统计


export const ENABLE_MEMBER = CONTEXT + '/cd/smp/fuser/enable'; //启用
export const DISABLE_MEMBER = CONTEXT + '/cd/smp/fuser/del'; //禁用
//export const CHECK_MEMBER= CONTEXT + '/cd/smp/fuser/passAuditCard';//审核通过

export const SEARCH_MEMBER= CONTEXT + '/api/app/search';//显示
export const UNCHECK_MEMBER= CONTEXT + '/cd/smp/fuser/notPassAuditUser';//未审核
//新增APP
export const APP_SAVE = CONTEXT + '/cd/website/app/save';
//修改APP
export const APP_MODIFY = CONTEXT + '/cd/website/app/get';
//删除APP
export const APP_DEL = CONTEXT + '/cd/website/app/del';
//提交
export const APP_AUDIT = CONTEXT + '/api/app/auditing';
export const APP_SUBMIT = CONTEXT + '/cd/website/app/submit';
export const APP_LIST = CONTEXT + '/cd/website/app/searchByUserid'; //获取
//虚拟币操作管理
export const VIRTUALCOINTYPE = CONTEXT + '/cd/smp/fviCoin/search'; //数字资产登记
export const VIRTUAL_SAVE = CONTEXT + '/cd/smp/fviCoin/save'; // 保存
export const VIRTUAL_DEL = CONTEXT + '/cd/smp/fviCoin/del'; // 刪除
export const VIRTUAL_UPDATA_DEFASSET = CONTEXT + '/cd/smp/fviCoin/updateDefAsset'; //启用默认资产  禁用默认资产
export const VIRTUAL_SETABLE = CONTEXT + '/cd/smp/fviCoin/setAble'; //【资产】 启用/禁用
export const VIRTUAL_GENERA_ADDRESS = CONTEXT + '/cd/smp/fviCoin/generaAddress'; // 给用户生成钱包地址
export const VIRTUAL_GENERA_DETAIL = CONTEXT + '/cd/smp/fviCoin/get'; // 查看详情
export const VIRTUAL_GO_SAVE_FEES = CONTEXT + '/cd/smp/fviCoin/ssadmin/goSaveFfees'; // 获取虚拟资产会员等级信息
export const VIRTUAL_SAVE_FEES = CONTEXT + '/cd/smp/fviCoin/ssadmin/saveFfees'; // 修改保存


//数字资产地址池
export const VIRTUAL_WALLE_LIST = CONTEXT + '/cd/smp/fviCoin/ssadmin/walletAddressList'; // 列表
//数字资产操作总表
export const VIRTUAL_CAPTUAL_OPERATION_LIST = CONTEXT + '/cd/smp/fviCoin/ssadmin/virtualCaptualoperationList'; // 列表
export const VIRTUAL_CAPTUAL_OPERATION_TYPE = CONTEXT + '/cd/smp/fviCoin/getTypeList'; // 列表-虚拟资产名称

export const VIRTUAL_GENERA_DET = CONTEXT + '/cd/smp/fviCoin/ssadmin/getVirtualCaptualoperation'; // 查看详情
//手工充值列表
export const VIRTUAL_PUSH_LIST = CONTEXT + '/cd/smp/fviCoin/ssadmin/VirtualRechargeList'; // 列表
export const VIRTUAL_PUSH_DETAIL = CONTEXT + '/cd/smp/fviCoin/ssadmin/getVirtualCaptualoperation'; // 查看详情
export const VIRTUAL_PUSH_ADD = CONTEXT + '/cd/smp/fviCoin/ssadmin/saveManualRecharge'; // 新增 保存手工充值
export const VIRTUAL_PUSH_DELECT = CONTEXT + '/cd/smp/fviCoin/ssadmin/getVirtualCaptualoperation'; // 删除
export const VIRTUAL_PUSH_CHECK = CONTEXT + '/cd/smp/fviCoin/ssadmin/auditManualRecharge'; // 审核
export const VIRTUAL_PUSH_OUT_FREEZE = CONTEXT + '/cd/smp/fviCoin/ssadmin/releaseFreeze'; // 发放冻结
export const VIRTUAL_SAVE_MANUAL_SEL = CONTEXT + '/cd/smp/fuser/selByLoginName'; //   获取会员用户
export const VIRTUAL_SAVE_MANUAL_SEARCH = CONTEXT + '/cd/smp/fviCoin/search'; //查询虚拟资产

//会员数字资产列表
export const VIRTUAL_WALLET_LIST = CONTEXT + '/cd/smp/fviCoin/ssadmin/virtualwalletList'; // 列表

//人民币操作
export const RMB_LIST = CONTEXT + '/cd/ssadmin/capitaloperationList'; //人民币操作总列表
export const RMB_INSUC_LIST = CONTEXT + '/cd/ssadmin/capitalInSucList'; //虚拟币类型操作列表
export const RMB_OUTSUC_LIST = CONTEXT + '/cd/ssadmin/capitalOutSucList'; //虚拟币类型操作列表
export const RMB_IN_LIST = CONTEXT + '/cd/ssadmin/capitalInList'; //待审核人民币充值列表
export const RMB_OUT_LIST = CONTEXT + '/cd/ssadmin/capitalOutList'; //虚拟币类型操作列表
export const RMB_IN_LIST_AUDIT_PASS = CONTEXT + '/cd/ssadmin/capitalInAudit'; //审核通过
export const RMB_IN_LIST_AUDIT_FAIL = CONTEXT + '/cd/ssadmin/capitalInCancel'; //审核不通过
export const RMB_OUT_LIST_AUDIT = CONTEXT + '/cd/ssadmin/capitalOutAudit'; //审核
export const RMB_WALLET_LIST = CONTEXT + '/cd/ssadmin/fuserWalletList'; //会员人民币
export const RMB_OPERAT_LOG_LIST = CONTEXT + '/cd/ssadmin/operationLogList'; //资金手工充值
export const RMB_OPERAT_LOG_LIST_DEL = CONTEXT + '/cd/ssadmin/delOperationLog'; //资金手工充值
export const RMB_OPERAT_LOG_LIST_PASS = CONTEXT + '/cd/ssadmin/auditOperationLog'; //资金手工充值
export const RMB_OPERAT_LOG_LIST_SAVE = CONTEXT + '/cd/ssadmin/add'; //资金手工保存
export const RMB_WITHDRAW_FEE_LIST = CONTEXT + '/cd/ssadmin/withdrawFeesList'; //会员提现手续费
export const RMB_WITHDRAW_FEE_GET = CONTEXT + '/cd/ssadmin/withdrawFees'; //获取会员手续费
export const RMB_WITHDRAW_FEE_SAVE = CONTEXT + '/cd/ssadmin/updateWithdrawFees'; //获取会员手续费

//提问管理
export const VIRTUAL_FQUESTION_LIST = CONTEXT + '/cd/smp/fquestion/list'; // 列表
export const VIRTUAL_NOT_ANSWER_LIST = CONTEXT + '/cd/smp/fquestion/notAnswerList'; //  未回复列表
export const VIRTUAL_YES_ANSWER_LIST = CONTEXT + '/cd/smp/fquestion/answerList' // 已回复列表
export const VIRTUAL_YES_ANSWER_GET = CONTEXT + '/cd/smp/fquestion/get' // 回复
export const VIRTUAL_YES_ANSWER_SAVE = CONTEXT + '/cd/smp/fquestion/answerQuestion' // 回复里的保存

//系统管理
export const SYS_BANK_LIST = CONTEXT + '/cd/systembankinfo/list' // 银行账户
export const SYS_BANK_SAVE = CONTEXT + '/cd/systembankinfo/save' // 保存
export const SYS_BANK_GET = CONTEXT + '/cd/systembankinfo/getById' // 获取
export const SYS_BANK_DEL = CONTEXT + '/cd/systembankinfo/del' // 删除
export const SYS_BANK_ENABLE = CONTEXT + '/cd/systembankinfo/bankable' //启用
export const SYS_BANK_DISABLE = CONTEXT + '/cd/systembankinfo/bankdisable' // 禁用
export const SYS_HELP_LIST = CONTEXT + '/cd/smp/fabout/faboutList' // 帮助列表
export const SYS_HELP_SAVE = CONTEXT + '/cd/smp/fabout/save' // 保存
export const SYS_HELP_GET = CONTEXT + '/cd/smp/fabout/getById' //获取
export const SYS_HELP_DEL = CONTEXT + '/cd/smp/fabout/del' // 删除
export const SYS_HELP_TYPE_GET = CONTEXT + '/cd/smp/fabout/faboutMenu' // 获取菜单
export const SYS_DICT_TREE_LIST = CONTEXT + '/cd/fdict/fdictList' // 获取菜单
export const SYS_DICT_TABLE_LIST = CONTEXT + '/cd/fdict/fchildList' // 获取菜单
export const SYS_DICT_PARENTNODE_GET = CONTEXT + '/cd/fdict/all' // 获取菜单
export const SYS_DICT_SAVE = CONTEXT + '/cd/fdict/save' // 新增保存字典
export const SYS_DICT_UPDATA = CONTEXT + '/cd/fdict/updateById' // 新增保存字典
export const SYS_DICT_DEL = CONTEXT + '/cd/fdict/del' // 删除字典
export const SYS_DICT_GET = CONTEXT + '/cd/fdict/getById' // 获取字典

//QQ群管理
export const SYS_FABOUT_SINGLE = CONTEXT + '/cd/smp/fabout/getQQById' //qq列表
export const SYS_FABOUT_LIST = CONTEXT + '/cd/smp/fabout/getQQ' //qq列表
export const SYS_FABOUT_STATES_SAVE = CONTEXT + '/cd/smp/fabout/saveQQStates' //启用禁用 
export const SYS_FABOUT_SAVE = CONTEXT + '/cd/smp/fabout/saveQQ' //添加qq群 
export const SYS_FABOUT_DEL = CONTEXT + '/cd/smp/fabout/delQQ' //删除 
export const SYS_FABOUT_GET = CONTEXT + '/cd/smp/fabout/getById' //修改
//系统管理
export const SYS_SYSTEMS_LIST= CONTEXT +'/cd/smp/fabout/getSysargs'//qq列表
export const SYS_SYSTEMS_STATES_SAVE= CONTEXT +'/cd/smp/fabout/saveSysStates'//启用禁用 
export const SYS_SYSTEMS_SAVE= CONTEXT + '/cd/smp/fabout/saveSysargs'//保存
export const SYS_SYSTEMS_DEL= CONTEXT + '/cd/smp/fabout/delSysStates'//删除 
export const SYS_SYSTEMS_GET= CONTEXT + '/cd/smp/fabout/getSysById'//修改   根据id获取系统参数信息  
//咨讯管理
export const INFORMATION_GET= CONTEXT + '/cd/smp/farticle/getArticle';//列表
export const INFORMATION_SAVE= CONTEXT + '/cd/smp/farticle/save';//保存
export const INFORMATION_DEL= CONTEXT + '/cd/smp/farticle/del';//删除
export const INFORMATION_GETONE= CONTEXT + '/cd/smp/farticle/getOne';//获取
export const INFORMATION_TOP= CONTEXT + '/cd/smp/farticle/dingFarticle';//获取
//菜单导航
export const MENU_DATA_LIST = CONTEXT + '/smp/res/getLeftMenu';

export const DICT_SMPALL_BTN = CONTEXT + '/smp/res/getBtn';//控制按钮权限