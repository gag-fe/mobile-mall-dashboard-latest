/**
 * 国际化资源文件索引命名规范：
 * - 全局公用资源：global.xxx
 * - 模块所属资源：moduleName.xxx
 * - 页面所属资源：pageName.xxx
 */
'use strict';

module.exports = {
    'global.account':'账号',
    'global.noData':'暂无数据',
    'global.bankName': '银行名称',
    'global.bankAccount': '银行账号',
    'global.editData': '修改',
    'global.delData': '删除',
    'global.viewData': '查看明细',
    'global.pleaseSelect': '请选择',
    'global.queryData': '查询',
    'global.addData': '添加',
    'global.saveData': '保存',
    'global.balance': "余额",
    'global.bankDetail': "流水",
    'global.pleaseInput': "请输入",
    'global.bankAccData': "银行账号:",
    'global.bankNameD': "银行名称:",
    'global.bankNatureD': "银行性质:",
    'global.currecyD': "币种:",
    'global.accountOwnerD': "账户管理员:",
    'global.ClosiLevelD': "关联检查层级:",
    'global.ChartOfAccountD': "银行科目:",
    'global.descripitonD': "备注:",
    'global.accountingTemplateD': "模板名称:",
    'global.accountingTemplateName': "模板名称",
    'global.accountingTemplateStatus': "状态",
    'global.accountingTemplateC': "创建人",
    'global.accountingTemplateDes': "备注",
    'global.accountingTemplateOperation': "操作",
    'global.accountingTempSuc': "有效",
    'global.accountingTempErr': "失效",
    'global.businessType': "业务类型名称:",
    'global.appliedBank': "适用银行:",
    'global.businessTypeN': "业务类型名称",
    'global.appliedBankN': "适用银行",
    'global.defaultAccountingTemplate': "默认入账模板",
    'global.defaultAccountingTemplateD': "默认入账模板:",
    'global.chartofAccountK': "会计科目组合",
    'global.percentageK': "金额比例",
    'global.accountingTemplateN': "入账模板",
    'global.tempalteInformationM': "模板信息",
    'global.tempalteInformationN': "模板名称:",
    'global.yesOrNoYes': "是",
    'global.yesOrNoNo': "否",
    'global.coaAtucture': "COA结构:",
    'global.cashFlowCodeM': "现金流量代码:",
    'global.lockkMudan': "锁定科目段:",
    'global.accuntForD': "入账信息",
    'global.accountTatolD': "有效行金额比例总和：",
    'global.accountKjkmzhD': "会计科目组合",
    'global.accountJhbl': "金额比例（基金为流水金额）",
    'global.yesOrNoStatus': "是否有效",
    'global.yesOrNoStatusY': "是",
    'global.yesOrNoStatusN': "否",
    'global.accountingYesOrNO': "有效:",
    'global.businessTypeM': "业务类型模板",
    'global.businessTypeT': "业务类型",
    'global.defaultAccountingTemplateS': "请选择默认入账模板",
    'global.transactionTypeD': "交易类型:",
    'global.SpecialOU': "个性化OU",
    'global.daoRuSuccess': "导入成功",
    'global.daoRuSuFail': "导入失败, 请点击下载错误信息文件",
    'global.pushSuccess': "推送成功",
    'global.pushFail': "推送失败",
    'global.applyNo': "单据主题编号",
    'global.otherCOA': '其他COA',
    'global.addOtherCOA': '新增其他COA',
    'global.pleaseInputAmount': '请填写金额!',

    'fund.entry.UNPROCESS': '未处理',
    'fund.entry.APPROVING': '审批中',
    'fund.entry.APPROVED': '已审批',
    'fund.entry.CLIAM': '认领',
    'fund.entry.REVERSE': '冲销',
    'fund.entry.APPROVED_AGREE': '审批通过',
    'fund.entry.APPROVED_REJECT': '审批拒绝',
    'check.index.TMI_UN_PROCESSED_CLAIMED_DATA' :"TMI存在未通过审批的待认领流水",
    'check.index.TMI_UN_POSTED_ERP_DATA': "TMI业务未在ERP入帐",
    'check.index.AP_UN_POSTED_ERP_DATA': "智付中心业务未在ERP入帐",
    'check.index.AP_UN_MATCHED_BUSI_TRANSINFO': "智付中心已在ERP入账凭证无法匹配流水",
    'check.index.TMI_UN_MATCHED_BUSI_TRANSINFO': "TMI已在ERP入账凭证无法匹配流水",
    'check.index.ERP_UN_CLAIMED_DATA': "ERP存在未认领凭证",
    'check.index.ERP_UN_POSTED_DATA': "ERP存在未过帐凭证",

    'check.index.TO_TMI_DEAL_THIS_DATA': "请前往TMI处理这些数据",
    'check.index.TO_AP_DEAL_THIS_DATA': "请前往智付中心处理这些数据",
    'check.index.TO_EDIT_OR_CLAIM_IT': "请联系TMI管理员修正流水号",
    'check.index.TO_CLAIM_THIS_CERT': "请联系智付中心管理员修正流水号",
    'check.index.TO_GL_DEAL_THIS_DATA': "请前往Oracle GL处理这些数据",
    'check.index.TO_CLAIM_THE_CERT': "请前往‘流水对账’页面认领这些凭证",

    //----------------gl------------------
    'flow.claim.detail.BANK_TRANSACTION_DATA': "流水认领",
    'bank.home.NATURE_DATA': "账户性质",
    'bank.home.CURRENCY_DATA': "币种",
    'bank.home.CLOSING_LEVEL_DATA': "关帐检查层级",
    'bank.home.BANK_CHART_DATA': "银行科目",
    'bank.home.DESCRIPTION': "备注",
    'bank.home.OPERATION': "操作",
    'bank.home.OUSEARCH_DATA': "ou查询失败",
    'bank.home.BANKSEARCH_DATA': "银行名称查询失败",
    'bank.home.BANKACCOUNTSEARCH_DATA': "银行账号查询失败",
    'bank.home.BANKNAME_DOT': "银行名称:",
    'bank.home.BANK_ACCOUNT_DATA': "银行账号:",
    'bank.home.BANK_NATURE_DATA': "账户性质:",
    'bank.detail.BANK_ACCOUNT_DATA': "银行账号:",
    'bank.detail.BANK_ACCOUNT_INFORMATION_DATA': "银行账号",
    'bank.detail.CURRENCY_DATA': "币种:",
    'bank.detail.ACCOUNT_DESC': "银行账号描述:",
    'bank.detail.ACCOUNT_OWNER_DATA': "账户管理员:",
    'bank.detail.CLOSING_LEVEL_DATA_D': "关账检查层级:",
    'bank.detail.CHART_OF_ACCOUNT_DATA': "银行科目:",
    'bank.detail.DESCRIPTION_DOT': "备注:",
    'bank.detail.BANK_ACCOUNT_SEL': "请选择银行账号:",
    'bank.detail.ACCOUNT_DESC_SL': "请输入银行账号描述:",
    'bank.detail.ACCOUNT_OWNER_SEL': "请选择账户管理员:",
    'bank.detail.CLOSING_LEVEL_SEL': "请选择关联检查层级:",
    'bank.detail.BANK_SUB_SEL': "请选择银行科目:",
    'bank.detail.CHART_OF_ACCOUNT_D': "银行科目",
    'bank.detail.BANK_CONNECTION_STATUS': "银企直连状态:",
    'bank.detail.BANK_CONNECTION_MODE': "银企直连模式:",
    'bank.detail.ACCOUNT_STATUS': "状态:",
    'bank.detail.DIRECT': "已直连",
    'bank.detail.NDIRECT': "未直连",
    'bank.detail.HANDWORK': "不可直连",
    'bank.detail.NORMAL': "正常",
    'bank.detail.REVOKED': "销户",
    'bank.detail.HQCX': "活期查询",
    'bank.detail.JYMXCX': "交易明细查询",
    'bank.detail.ZLZZ': "直连转账",
    'bank.detail.WTDK': "委托贷款",
    'bank.detail.DWZF': "对外支付",
    'bank.accountDetail.ACCOUNT_FINANCIAL': "银行账户明细",
    'entry.detail.AMOUNT_PROP': "有效行金额比例总和必须是100%",
    'entry.detail.ADDHANGXX': "请添加行信息",
    'entry.detail.ACCMONEYZUHE': "请填写会计科目组合",
    'entry.detail.ACCMONEYBILI': "请填写金额比例",
    'entry.detail.ACCMONEYERRH': "有效行金额比例总和要小于100",
    'entry.detail.YESORNOX': "是否有效",
    'entry.detail.YESORNOXY': "是",
    'entry.detail.YESORNOXN': "否",
    'entry.detail.ADDHANG': "增加行",
    'entry.detail.AMOUNT_MROPN': "有效行金额比例总和不能超过100%",
    'entry.detail.TEMPBO_NAME': "请填写模板名称",
    'entry.detail.COA_STUCTURE_DATA': "COA结构:",
    'entry.detail.COA_STUCTURE_SEL': "请选择COA结构",
    'entry.detail.CASH_FLOW_CODED': "现金流量代码:",
    'entry.detail.CASH_FLOW_CODESEL': "请选择现金流量代码",
    'entry.detail.KEMUDUANSEL': "请选择锁定科目段",
    'entry.detail.LOCKNATUREACCOUTN': "锁定科目段:",
    'entry.detail.ACCNATUREOUTNSTATUS': "是否有效:",
    'entry.detail.ACCNATUREOUTNSTATUSSEL': "请选择是否有效",
    'entry.detail.ACCOUNTINGIFOR_DATA': "入账信息",
    'entry.detail.ACCOUNTINGIFOR_TOTOL': "有效行金额比例总和：",
    'entry.detail.ACCOUNTINGIFOR_SUBMIT': "提交审批",
    'entry.detail.ACCOUNTINGIFOR_KJKMZH': "会计科目组合",
    'entry.templateDetail.VIEWACCTEMPALTE': "入账模板明细",
    'entry.templateDetail.ACCNATUREOUTNYESORNO': "有效:",
    'entry.templateApprove.ACCOUNTINGTEMPINFORMA': "入账模板审批",
    'biz.detail.pleaseSelBank': "请选择使用银行",
    'biz.detail.tradingErrOne': "交易类型不可含有中文分号",
    'biz.detail.tradingErrTwo': "同一OU不允许添加两个个性化模板",
    'biz.detail.tradingErrThree': "请填业务类型名称",
    'biz.detail.addLine': "添加行",
    'biz.detail.tradingErrFour': "请输入(不同类别用英文分号隔开)",
    'biz.detail.tradingErrFive': "这些OU将优先使用以下模板",
    'biz.detail.tip':'所有OU默认使用此模板',
    'biz.templateDetail.viewBusinessType': "业务类型模板明细",
    'biz.templateDetail.ouDefineTempbo': "所有OU默认使用此模板",


    //--------------lzd--------------------

    'global.sourceType':"来源",
    'global.transactionDate': "交易日期",
    'global.transactionType': "交易类型",
    'global.paymentAmount':"付款金额",
    'global.receiptAmount':"收款金额",
    'global.description':"摘要",
    'global.descriptionD':"摘要:",
    'global.period':"会计期",
    'global.transactionNo':"流水号",
    'global.referenceNo':"业务参考号",
    'global.partyBank':"对方银行",
    'global.partyBankAccount':"对方银行账号",
    'global.partyBankHolder':"对方银行户名",
    'global.supplier':"客商",
    'global.transactionDetail':"流水详情",
    'global.detail':"详情",
    'global.date':"日期",
    'global.advancedQueryBar':"高级查询",
    'global.view':"查看",
    'global.viewDetail':"查看详情",
    'global.reverse':"冲销",
    'global.submit':"提交审批",
    'global.confirm':"确定",
    'global.submitSuccess':"提交成功！",
    'global.editSuccess':"修改成功！",
    'global.processor':"处理人",
    'global.reverseBalance':"冲账",
    'global.recorded':"入账",
    'global.save':"保 存",
    'global.claim':"认领",
    'global.approveAgree':"审批通过",
    'global.approveReject':"审批拒绝",
    'global.pleaseSelectDate':"请选择日期",
    'global.UNPROCESS':"未处理",
    'global.APPROVING':"审批中",
    'global.APPROVED':"已审批",
    'global.minValue':"最小值",
    'global.maxValue':"最大值",
    'global.inputNumber':"输入数字",
    'global.pleaseSelectOne':"请至少选择一行",
    'global.pleaseQuery':"请按条件查询内容!",
    'global.checkBox':"复选框",
    'global.close':"关闭",
    'global.total':"合计:",



    //-----------------流水导入
    'flow.import.ALL': "全部",
    'flow.import.GATE_WAY': "网关",
    'flow.import.MANUAL':"人工",
    'flow.import.deleted':"删除成功",
    'flow.import.confirmDelete':"您确认要删除选中的流水吗?",
    'flow.import.deleteBar':"删除流水",
    'flow.import.flowImport':"流水导入",
    'flow.import.batchUpload':"批量导入",
    'flow.import.bankAccount':"银行账号/支付宝账号:",
    'flow.import.accountPeriod':"会计期:",
    'flow.import.sourceTypeSelect':"来源:",
    'flow.import.beginBalance':"期初余额：",
    'flow.import.endBalance':"期末余额：",
    'flow.import.currency':"币种：",
    'flow.import.asOfDate':"截止日期：",
    'flow.import.downloadLatestTemple':"请下载最新的模板文件：",
    'flow.import.batchUploadBar':"批量文件导入",
    'flow.import.importTime':"导入时间",
    'flow.import.notSelectAnyLine':"您还没有选择任何行",
    'flow.import.pleaseInputSelect':"请输入选择",
    'flow.import.ACCOUNT_INFO': "账号信息",
    //-----------------流水导入

    //-----------------流水认领-入账平台
    'fund.entry.paymentAmountRange':"付款金额范围:",
    'fund.entry.receiptAmountRange':"收款金额范围:",
    'fund.entry.pleaseSelectThenOper':"请在当前页面选中流水后直接进行批量操作，",
    'fund.entry.changePageThen':"翻页后前一页面选中的流水将会被取消选中",
    'fund.entry.editAccountingTempalte':"选择模板",
    'fund.entry.pleaseSelectTemp':"请选择入账模板",
    'fund.entry.reverseDate':"冲销GL日期:",
    'fund.entry.history':"历史记录",
    'fund.entry.accountDesc':'银行账号描述',
    'fund.entry.accountingName':'对方户名',
    'fund.entry.erpAccount':'ERP账号',
    'fund.entry.noEntryReason':'无需入账原因',
    'fund.entry.subtotal':'合计金额',
    'fund.entry.toBeEntry.flow':'待入账流水',
    'fund.entry.noEntry.flow':'无需入账流水',
    'fund.entry.tmiData.tip':'您提交审批的流水中存在TMI的大额转账，请确认是否需要入账',
    'fund.entry.TRANSFER':'TMI大额转账已入账',
    'fund.entry.SMART_PAY':'智付中心已入账',
    'fund.entry.GL':'GL已入账',
    'fund.entry.IGNORE':'此类型流水无需入账',
    'fund.entry.MATCHING':'等待匹配',
    'fund.entry.claimer': '认领人',
    'fund.entry.approver': '审批人',
    //-----------------流水认领-入账平台

    'claim.detail.erpDocumentNumber':"ERP单据编号：",
    'claim.detail.erpJournalLineNo':"ERP日记账行号：",
    'claim.detail.erpBatchName':"ERP GL批名：",
    'claim.detail.erpJournalName':"ERP日记帐名：",
    'claim.detail.glDate':"GL日期",
    'claim.detail.category':"类别",
    'claim.detail.COA':"入账明细",
    'claim.detail.debit':"借方金额",
    'claim.detail.crdit':"贷方金额",
    'claim.detail.accountingHistory':"查看入账记录",
    'claim.detail.bankCOA':"银行COA",
    'claim.detail.oppositeCOA':"对方COA",
    'claim.detail.pleaseSelectAccounting':"请选择会计科目",
    'claim.detail.exceedsLength':"备注超过最大长度1300字",
    'claim.detail.accountingDetail':"入账明细",
    'claim.detail.addOppositeCOA':"新增对方COA",

    //
    'flow.approve.accountingDetail':"入账明细",
    'flow.approve.bankTransactionApproval':"流水审批",
    'flow.approve.transaction':"流水信息",
    'flow.approve.history':"历史记录",
    'flow.claim.list.claimSuccess':"认领成功！",
    'flow.claim.list.revocation':"撤销成功！",
    'flow.claim.list.reconciled':"已认领",
    'flow.claim.list.unreconcile':"未认领",
    'flow.claim.list.defaultNum':"默认显示流水条数",
    'flow.claim.list.reconcile':"认领",
    'flow.claim.list.Unrecon':"撤销",
    'flow.claim.list.GATE_WAY': "网关",
    'flow.claim.list.MANUAL':"人工",
    'flow.claim.list.importTime':"导入时间",
    'flow.claim.list.debit':"借方金额",
    'flow.claim.list.crdit':"贷方金额",
    'flow.claim.list.bankSubtotal':"银行账:",
    'flow.claim.list.GLSubtotal':"企业账:",
    'flow.claim.list.tip':'当显示条数过大时，会减缓页面加载速度',
    'flow.claim.list.bank.transDate':'银行帐交易日期',
    'flow.claim.list.GLDate':'企业帐交易日期',
    'flow.claim.list.bank.paymentAmountRange':'银行帐付款金额范围',
    'flow.claim.list.GLSubtotal.creditAmountRange':'企业帐贷方金额范围',
    'flow.claim.list.bank.receiptAmountRange':'银行帐收款金额范围',
    'flow.claim.list.GLSubtotal.debitAmountRange':'企业帐借方金额范围',
    'flow.claim.list.GLSubtotal.glSource':'企业帐来源',
    //-----------psj-----------------------


    'accountperiod.openPeriod':"打开会计期",
    'accountperiod.closePeriod':"关闭会计期",
    'accountperiod.unopen':"未打开",
    'accountperiod.opened':"已打开",
    'accountperiod.closed':"已关闭",
    'accountperiod.closing':"关闭中",
    'accountperiod.msg.nocheck':"您还没有勾选任何数据",
    'accountperiod.msg.exist':"勾选状态中存在已打开状态，请重新选择！",
    'accountperiod.msg.unexist':"勾选状态中存在未打开状态，请重新选择！",
    'accountperiod.msg.onlyOne.period':"同一OU只允许打开一个会计期！",
    'accountperiod.msg.openSuccess':"打开成功",
    'accountperiod.msg.closeSuccess':"关闭成功",
    'accountperiod.msg.closeFail':"关闭失败",
    'accountperiod.query':"查 询",
    'flow.claim.detail.transactionAmount':"流水金额",
    'flow.claim.detail.transactionDate':"交易日期",
    'flow.claim.detail.operation':"操作",
    'flow.claim.detail.msg.ouQueryFail':"ou查询失败",
    'flow.claim.detail.summary':"汇总信息",
    'flow.claim.detail.numberTransaction':"流水入账笔数",
    'flow.claim.detail.numberERP':"ERP入账笔数",
    'flow.claim.detail.pushToERP':"手工推送ERP",
    'flow.claim.detail.bankTransfer':"TMI业务",
    'flow.claim.detail.numberBankTransfer':"TMI入账笔数",
    'flow.claim.detail.tobePushToERP':"未推送ERP明细",
    'flow.claim.detail.tip':'流水金额列黑色字体代表正常入账，红色字体代表冲销',

    //----------------------------------
};