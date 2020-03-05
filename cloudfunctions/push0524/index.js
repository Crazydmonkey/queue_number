// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  return sendTemplateMessage(event)
}

//小程序模版消息推送
async function sendTemplateMessage(event) {
  const {
    OPENID
  } = cloud.getWXContext()

  // 接下来将新增模板、发送模板消息、然后删除模板
  // 注意：新增模板然后再删除并不是建议的做法，此处只是为了演示，模板 ID 应在添加后保存起来后续使用
  const addResult = await cloud.openapi.templateMessage.addTemplate({
    id: 'AT0002',
    keywordIdList: [3, 4, 5]
  })

  const templateId = addResult.templateId //新增的模版id

  const sendResult = await cloud.openapi.templateMessage.send({
    touser: OPENID,
    templateId,
    formId: event.formId,
    page: 'pages/index/index',
    data: {
      keyword1: {
        value: '云开发实现推送',
      },
      keyword2: {
        value: '2019 年 5 月 24 日',
      },
      keyword3: {
        value: '编程小石头',
      },
    }
  })

  //删除模版id
  await cloud.openapi.templateMessage.deleteTemplate({
    templateId,
  })

  return sendResult
}
