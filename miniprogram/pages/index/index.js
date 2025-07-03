// pages/index/index.js
Page({
  data: {
    reviewText: '', // 用户输入的差评
    isLoading: false,
    analysis: null, // 新增：用于存放分析结果
    results: null,
    // 优化后的角度配置：更清晰的命名和解释
    angles: [
      {
        key: '诚恳道歉',
        name: '诚恳道歉',
        description: '表明重视用户反馈，承诺会优化'
      },
      {
        key: '问题解释', 
        name: '问题解释',
        description: '表明问题事出有因，商家不是有意而为'
      },
      {
        key: '安抚用户',
        name: '安抚用户', 
        description: '表明理解并消除用户负面情绪'
      }
    ],
    styles: [ // 统一使用图标系统
      { id: 'sincere', name: '诚恳', icon: 'friends-o' },
      { id: 'cute', name: '卖萌', icon: 'smile-o' },
      { id: 'confident', name: '霸气', icon: 'medal-o' }
    ],
    selectedAngle: '诚恳道歉', // 用户当前选择的角度
    selectedStyleId: 'sincere', // 用户当前选择的风格ID
    finalReply: '', // 根据当前选择计算出的最终回复
    language: 'cantonese', // 默认语言
    
    // --- 新增：补偿功能相关状态 ---
    compensationActions: [
      { name: '重做一份' },
      { name: '立即退款' },
      { name: '赠送优惠券' },
      { name: '专人跟进' }, // 新增选项
    ],
    compensationProcessing: false, // 补偿处理状态
    compensationUpdated: false, // 补偿更新提示状态

    // --- 新增：处理进度相关状态 ---
    currentStep: 1, // 当前处理步骤 (1-5)
    encourageTexts: [
      '正在分析差评内容，识别关键问题...',
      '深度理解用户情绪，找到痛点所在...',
      '匹配最佳回复策略，准备专业话术...',
      '生成多种风格回复，满足不同需求...',
      '最后检查确保安全，马上就完成啦！'
    ]
  },

  // 处理输入框内容变化
  onInput(event) {
    this.setData({
      reviewText: event.detail
    });
  },

  // 切换语言
  switchLanguage(e) {
    const lang = e.currentTarget.dataset.lang;
    this.setData({
      language: lang
    });
  },

  // 模拟处理步骤进度
  simulateProcessingSteps() {
    let step = 1;
    const totalSteps = 5;
    const stepDuration = 4000; // 改为4秒每步
    
    this.setData({ currentStep: step });
    
    const timer = setInterval(() => {
      step++;
      if (step < totalSteps) {
        // 前4步正常切换
        this.setData({ currentStep: step });
      } else if (step === totalSteps) {
        // 第5步开始，但要等待实际结果
        this.setData({ currentStep: step });
        // 不再自动切换，等待云函数返回
        clearInterval(timer);
        this.processingTimer = null;
      }
    }, stepDuration);
    
    // 保存timer引用，以便在组件销毁时清理
    this.processingTimer = timer;
  },

  // 点击"开始分析"按钮
  async startAnalysis() {
    if (!this.data.reviewText.trim()) {
      wx.showToast({ title: '请输入差评内容', icon: 'none' });
      return;
    }

    this.setData({ 
      isLoading: true, 
      analysis: null, 
      results: null, 
      finalReply: '',
      currentStep: 1 
    });

    // 启动处理步骤模拟
    this.simulateProcessingSteps();

    try {
      const res = await wx.cloud.callFunction({
        name: 'generate-safe-replies',
        data: {
          reviewText: this.data.reviewText,
          language: this.data.language
        }
      });

      // 清理定时器
      if (this.processingTimer) {
        clearInterval(this.processingTimer);
        this.processingTimer = null;
      }

      if (res.result.errCode === 0) {
        const { analysis, replies } = res.result.data;
        this.setData({
          isLoading: false,
          analysis: analysis,
          results: replies,
          selectedAngle: this.data.angles[0].key, // 默认选中第一个角度的key
          currentStep: 5 // 确保显示完成状态
        });
        this.updateFinalReply();
      } else {
        // 云函数返回业务错误
        throw new Error(res.result.errMsg);
      }

    } catch (err) {
      // 清理定时器
      if (this.processingTimer) {
        clearInterval(this.processingTimer);
        this.processingTimer = null;
      }
      
      console.error('调用云函数失败', err);
      this.setData({ 
        isLoading: false, 
        finalReply: `生成失败: ${err.message || '请检查网络或联系管理员'}`,
        currentStep: 1
      });
    }
  },

  // 切换角度
  selectAngle(e) {
    const angle = e.currentTarget.dataset.angle
    this.setData({
      selectedAngle: angle
    })
    this.updateFinalReply()
  },

  // 切换风格
  selectStyle(e) {
    const styleId = e.currentTarget.dataset.styleId
    this.setData({
      selectedStyleId: styleId
    })
    this.updateFinalReply()
  },

  // 根据当前选择的角度和风格，更新最终回复
  updateFinalReply() {
    const { results, selectedAngle, selectedStyleId } = this.data
    
    // 添加调试日志
    console.log('🔍 updateFinalReply 调试信息:')
    console.log('results:', results)
    console.log('selectedAngle:', selectedAngle)
    console.log('selectedStyleId:', selectedStyleId)
    
    if (results && selectedAngle && selectedStyleId) {
      // 检查角度是否存在
      if (results[selectedAngle]) {
        console.log('✅ 找到角度:', selectedAngle)
        console.log('可用的角度:', Object.keys(results))
        
        // 检查风格是否存在
        if (results[selectedAngle][selectedStyleId]) {
          const reply = results[selectedAngle][selectedStyleId]
          console.log('✅ 找到回复:', reply.substring(0, 50) + '...')
          this.setData({
            finalReply: reply
          })
        } else {
          console.error('❌ 未找到风格:', selectedStyleId)
          console.log('可用的风格:', Object.keys(results[selectedAngle] || {}))
        }
      } else {
        console.error('❌ 未找到角度:', selectedAngle)
        console.log('可用的角度:', Object.keys(results || {}))
      }
    } else {
      console.log('❌ 缺少必要数据:', { 
        hasResults: !!results, 
        hasAngle: !!selectedAngle, 
        hasStyle: !!selectedStyleId 
      })
    }
  },

  // 复制结果
  copyReply() {
    if (this.data.finalReply) {
      wx.setClipboardData({
        data: this.data.finalReply,
        success: () => {
          wx.showToast({
            title: '已复制到剪贴板',
            icon: 'success'
          })
        }
      })
    }
  },

  // --- 新增：内联补偿功能相关方法 ---

  /**
   * 选择补偿措施 (内联方式)
   */
  async selectCompensation(event) {
    const compensationType = event.currentTarget.dataset.compensation;
    
    if (this.data.compensationProcessing) {
      return; // 防止重复点击
    }

    this.setData({ 
      compensationProcessing: true,
      compensationUpdated: false // 重置更新提示状态
    });

    try {
      const res = await wx.cloud.callFunction({
        name: 'add-compensation',
        data: {
          originalReply: this.data.finalReply,
          compensationType: compensationType
        }
      });

      if (res.result.errCode === 0) {
        // 使用追加了补偿信息的新回复，更新当前页面的最终回复
        this.setData({
          finalReply: res.result.data.finalReply,
          compensationProcessing: false,
          compensationUpdated: true // 显示更新提示
        });
        
        wx.showToast({ 
          title: '补偿信息已添加', 
          icon: 'success',
          duration: 2000
        });

        // 3秒后自动隐藏更新提示
        setTimeout(() => {
          this.setData({ compensationUpdated: false });
        }, 3000);

      } else {
        throw new Error(res.result.errMsg);
      }

    } catch (err) {
      console.error('调用补偿服务失败', err);
      this.setData({ 
        compensationProcessing: false,
        compensationUpdated: false
      });
      
      wx.showToast({
        title: `处理失败: ${err.message || '请稍后再试'}`,
        icon: 'none',
        duration: 3000
      });
    }
  },

  /**
   * 跳过补偿 (选择"无需补偿")
   */
  skipCompensation() {
    if (this.data.compensationProcessing) {
      return;
    }
    
    wx.showToast({
      title: '当前回复无需补偿',
      icon: 'none',
      duration: 1500
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 清理定时器
    if (this.processingTimer) {
      clearInterval(this.processingTimer);
      this.processingTimer = null;
    }
  }
})
