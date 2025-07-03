// pages/exampleDetail/index.js
Page({
  data: {
    type: "",
    envId: "",
    showTip: false,
    title: "",
    content: "",

    haveGetOpenId: false,
    openId: "",

    haveGetCodeSrc: false,
    codeSrc: "",

    haveGetRecord: false,
    record: [],

    haveGetImgSrc: false,
    imgSrc: "",

    // ai
    modelConfig: {
      modelProvider: "deepseek", // 大模型服务厂商
      quickResponseModel: "deepseek-v3", // 快速响应模型 （混元 turbo, gpt4 turbo版，deepseek v3等）
      logo: "https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/2339414f-2c0d-4537-9618-1812bd14f4af.svg", // model 头像
      welcomeMsg: "我是deepseek-v3，很高兴见到你！", // model 欢迎语
    },
    callcbrCode: "",
    initEnvCode: "",
    callOpenIdCode: "",
    callMiniProgramCode: "",
    callFunctionCode: "",
    callCreateCollectionCode: "",
    callUploadFileCode: "",

    showInsertModal: false,
    insertRegion: "",
    insertCity: "",
    insertSales: "",

    haveGetCallContainerRes: false,
    callContainerResStr: "",

    ai_page_config: `{
  "usingComponents": {
    "agent-ui":"/components/agent-ui/index"
  },
}`,
    ai_wxml_config: `&lt;agent-ui agentConfig="{{agentConfig}}" showBotAvatar="{{showBotAvatar}}" chatMode="{{chatMode}}" modelConfig="{{modelConfig}}""&gt;&lt;/agent-ui&gt;`,
    ai_data_config: `data: {
  chatMode: "bot", // bot 表示使用agent，model 表示使用大模型
  showBotAvatar: true, // 是否在对话框左侧显示头像
  agentConfig: {
    botId: "your agent id", // agent id,
    allowWebSearch: true, // 允许客户端选择展示联网搜索按钮
    allowUploadFile: true, // 允许客户端展示上传文件按钮
    allowPullRefresh: true, // 允许客户端展示下拉刷新
    allowUploadImage: true, // 允许客户端展示上传图片按钮
    allowMultiConversation: true, // 允许客户端展示查看会话列表/新建会话按钮
    showToolCallDetail: true, // 是否展示 mcp server toolCall 细节
    allowVoice: true, // 允许客户端展示语音按钮
    showBotName: true, // 允许展示bot名称
  },
  modelConfig: {
    modelProvider: "hunyuan-open", // 大模型服务厂商
    quickResponseModel: "hunyuan-lite", // 大模型名称
    logo: "", // model 头像
    welcomeMsg: "欢迎语", // model 欢迎语
  },
}`,
  },

  onLoad(options) {
    console.log("options", options);
    if (
      options.type === "cloudbaserunfunction" ||
      options.type === "cloudbaserun"
    ) {
      this.getCallcbrCode();
    }
    if (options.type === "getOpenId") {
      this.getOpenIdCode();
    }
    if (options.type === "getMiniProgramCode") {
      this.getMiniProgramCode();
    }

    if (options.type === "createCollection") {
      this.getCreateCollectionCode();
    }

    if (options.type === "uploadFile") {
      this.getUploadFileCode();
    }
    this.setData({ type: options?.type, envId: options?.envId });
  },

  copyUrl() {
    wx.setClipboardData({
      data: "https://gitee.com/TencentCloudBase/cloudbase-agent-ui/tree/main/apps/miniprogram-agent-ui/miniprogram/components/agent-ui",
      success: function (res) {
        wx.showToast({
          title: "复制成功",
          icon: "success",
        });
      },
    });
  },

  insertRecord() {
    this.setData({
      showInsertModal: true,
      insertRegion: "",
      insertCity: "",
      insertSales: "",
    });
  },

  deleteRecord(e) {
    console.log("deleteRecord e", e);
    // 调用云函数删除记录
    wx.showLoading({
      title: "删除中...",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "deleteRecord",
          data: {
            _id: e.currentTarget.dataset.id,
          },
        },
      })
      .then((resp) => {
        wx.showToast({
          title: "删除成功",
        });
        this.getRecord(); // 刷新列表
        wx.hideLoading();
      })
      .catch((e) => {
        wx.showToast({
          title: "删除失败",
          icon: "none",
        });
        wx.hideLoading();
      });
    // const index = e.currentTarget.dataset.index;
    // const record = this.data.record;
    // record.splice(index, 1);
    // this.setData({
    //   record,
    // });
  },

  // 输入框事件
  onInsertRegionInput(e) {
    this.setData({ insertRegion: e.detail.value });
  },
  onInsertCityInput(e) {
    this.setData({ insertCity: e.detail.value });
  },
  onInsertSalesInput(e) {
    this.setData({ insertSales: e.detail.value });
  },
  // 取消弹窗
  onInsertCancel() {
    this.setData({ showInsertModal: false });
  },

  // 确认插入
  async onInsertConfirm() {
    const { insertRegion, insertCity, insertSales } = this.data;
    if (!insertRegion || !insertCity || !insertSales) {
      wx.showToast({ title: "请填写完整信息", icon: "none" });
      return;
    }
    wx.showLoading({ title: "插入中..." });
    try {
      await wx.cloud.callFunction({
        name: "quickstartFunctions",
        data: {
          type: "insertRecord",
          data: {
            region: insertRegion,
            city: insertCity,
            sales: Number(insertSales),
          },
        },
      });
      wx.showToast({ title: "插入成功" });
      this.setData({ showInsertModal: false });
      this.getRecord(); // 刷新列表
    } catch (e) {
      wx.showToast({ title: "插入失败", icon: "none" });
    } finally {
      wx.hideLoading();
    }
  },

  getOpenId() {
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getOpenId",
        },
      })
      .then((resp) => {
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        wx.hideLoading();
        const { errCode, errMsg } = e;
        if (errMsg.includes("Environment not found")) {
          this.setData({
            showTip: true,
            title: "云开发环境未找到",
            content:
              "如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。",
          });
          return;
        }
        if (errMsg.includes("FunctionName parameter could not be found")) {
          this.setData({
            showTip: true,
            title: "请上传云函数",
            content:
              "在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。",
          });
          return;
        }
      });
  },

  clearOpenId() {
    this.setData({
      haveGetOpenId: false,
      openId: "",
    });
  },

  clearCallContainerRes() {
    this.setData({
      haveGetCallContainerRes: false,
      callContainerResStr: "",
    });
  },

  getCodeSrc() {
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "getMiniProgramCode",
        },
      })
      .then((resp) => {
        this.setData({
          haveGetCodeSrc: true,
          codeSrc: resp.result,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        wx.hideLoading();
        const { errCode, errMsg } = e;
        if (errMsg.includes("Environment not found")) {
          this.setData({
            showTip: true,
            title: "云开发环境未找到",
            content:
              "如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。",
          });
          return;
        }
        if (errMsg.includes("FunctionName parameter could not be found")) {
          this.setData({
            showTip: true,
            title: "请上传云函数",
            content:
              "在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。",
          });
          return;
        }
      });
  },

  clearCodeSrc() {
    this.setData({
      haveGetCodeSrc: false,
      codeSrc: "",
    });
  },

  bindInput(e) {
    const index = e.currentTarget.dataset.index;
    const record = this.data.record;
    record[index].sales = Number(e.detail.value);
    this.setData({
      record,
    });
  },

  getRecord() {
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "selectRecord",
        },
      })
      .then((resp) => {
        this.setData({
          haveGetRecord: true,
          record: resp.result.data,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        this.setData({
          showTip: true,
        });
        wx.hideLoading();
      });
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: [],
    });
  },
  updateRecord() {
    wx.showLoading({
      title: "",
    });
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          type: "updateRecord",
          data: this.data.record,
        },
      })
      .then((resp) => {
        wx.showToast({
          title: "更新成功",
        });
        wx.hideLoading();
      })
      .catch((e) => {
        console.log(e);
        this.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
  },

  uploadImg() {
    wx.showLoading({
      title: "",
    });
    // 让用户选择一张图片
    wx.chooseMedia({
      count: 1,
      success: (chooseResult) => {
        // 将图片上传至云存储空间
        wx.cloud
          .uploadFile({
            // 指定上传到的云路径
            cloudPath: `my-photo-${new Date().getTime()}.png`,
            // 指定要上传的文件的小程序临时文件路径
            filePath: chooseResult.tempFiles[0].tempFilePath,
          })
          .then((res) => {
            console.log("upload res", res);
            this.setData({
              haveGetImgSrc: true,
              imgSrc: res.fileID,
            });
          })
          .catch((e) => {
            console.log("e", e);
          });
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: "",
    });
  },

  goOfficialWebsite() {
    const url = "https://docs.cloudbase.net/toolbox/quick-start";
    wx.navigateTo({
      url: `../web/index?url=${url}`,
    });
  },
  runCallContainer: async function () {
    const app = getApp();
    console.log("globalData", app.globalData);
    const c1 = new wx.cloud.Cloud({
      resourceEnv: app.globalData.env,
    });
    await c1.init();
    const r = await c1.callContainer({
      path: "/api/users", // 填入业务自定义路径
      header: {
        "X-WX-SERVICE": "express-test", // 填入服务名称
      },
      // 其余参数同 wx.request
      method: "GET",
    });
    console.log(r);
    this.setData({
      haveGetCallContainerRes: true,
      callContainerResStr: `${JSON.stringify(r.data.items, null, 2)}`,
    });
  },
  getCallcbrCode: function () {
    const app = getApp();
    this.setData({
      callcbrCode: `const c1 = new wx.cloud.Cloud({
  resourceEnv: ${app.globalData.env}
})
await c1.init()
const r = await c1.callContainer({
  path: '/api/users', // 此处填入业务自定义路径， /api/users 为示例路径
  header: {
    'X-WX-SERVICE': 'express-test', // 填入业务服务名称，express-test 为示例服务
  },
  // 其余参数同 wx.request
  method: 'GET',
})`,
    });
  },
  getInitEnvCode: function () {
    const app = getApp();
    this.setData({
      initEnvCode: `wx.cloud.init({
  env: ${app.globalData.env},
  traceUser: true,
});`,
    });
  },
  getCreateCollectionCode: function () {
    this.setData({
      callCreateCollectionCode: `const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    await db.createCollection('sales');
    return {
      success: true
    };
  } catch (e) {
    return {
      success: true,
      data: 'create collection success'
    };
  }
};`,
    });
  },
  getOpenIdCode: function () {
    this.setData({
      callOpenIdCode: `const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};`,
      callFunctionCode: `wx.cloud.callFunction({
  name: 'quickstartFunctions',
  data: {
    type: 'getOpenId'
  }
}).then((resp) => console.log(resp))`,
    });
  },
  getMiniProgramCode: function () {
    this.setData({
      callMiniProgramCode: `const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
// 获取小程序二维码云函数入口函数
exports.main = async (event, context) => {
  // 获取小程序二维码的buffer
  const resp = await cloud.openapi.wxacode.get({
    path: 'pages/index/index'
  });
  const { buffer } = resp;
  // 将图片上传云存储空间
  const upload = await cloud.uploadFile({
    cloudPath: 'code.png',
    fileContent: buffer
  });
  return upload.fileID;
};
`,
      callFunctionCode: `wx.cloud.callFunction({
  name: 'quickstartFunctions',
  data: {
    type: 'getMiniProgramCode'
  }
}).then((resp) => console.log(resp))`,
    });
  },
  getUploadFileCode: function () {
    this.setData({
      callUploadFileCode: `wx.chooseMedia({
count: 1,
success: (chooseResult) => {
  // 将图片上传至云存储空间
  wx.cloud
    .uploadFile({
      // 指定上传到的云路径
      cloudPath: "my-photo.png",
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseResult.tempFiles[0].tempFilePath,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log('e', e)
    });
}
});`,
    });
  },
});
