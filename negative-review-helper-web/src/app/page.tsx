"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Search, 
  Smile, 
  Lightbulb, 
  Edit3, 
  Shield, 
  TrendingUp, 
  Copy,
  Sparkles,
  Heart,
  Zap,
  Star,
  Gift,
  RefreshCw,
  CreditCard,
  Phone,
  X,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneContainer from '@/components/PhoneContainer';

interface Analysis {
  issueType: string;
  anger: number;
  keywords: string;
}

interface ReplyResult {
  [angle: string]: {
    [style: string]: string;
  };
}

const processingSteps = [
  { icon: Search, title: '差评解析', desc: '智能识别问题类型和情绪' },
  { icon: Smile, title: '情绪分析', desc: '评估用户愤怒程度和关键痛点' },
  { icon: Lightbulb, title: '策略匹配', desc: '匹配最佳回复策略和角度' },
  { icon: Edit3, title: '内容生成', desc: '生成9种风格的专业回复' },
  { icon: Shield, title: '质量检测', desc: '确保回复安全无风险' },
];

const angles = [
  { key: '诚恳道歉', name: '诚恳道歉', description: '表明重视用户反馈，承诺会优化' },
  { key: '问题解释', name: '问题解释', description: '表明问题事出有因，商家不是有意而为' },
  { key: '安抚用户', name: '安抚用户', description: '表明理解并消除用户负面情绪' },
];

const styles = [
  { id: 'sincere', name: '诚恳', icon: Heart },
  { id: 'cute', name: '卖萌', icon: Sparkles },
  { id: 'confident', name: '霸气', icon: Zap },
];

const compensationActions = [
  { name: '重做一份', icon: RefreshCw },
  { name: '立即退款', icon: CreditCard },
  { name: '赠送优惠券', icon: Gift },
  { name: '专人跟进', icon: Phone },
];

const encourageTexts = [
  '正在分析差评内容，识别关键问题...',
  '深度理解用户情绪，找到痛点所在...',
  '匹配最佳回复策略，准备专业话术...',
  '生成多种风格回复，满足不同需求...',
  '最后检查确保安全，马上就完成啦！'
];

export default function Home() {
  const [reviewText, setReviewText] = useState('');
  const [language, setLanguage] = useState('cantonese');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [results, setResults] = useState<ReplyResult | null>(null);
  const [selectedAngle, setSelectedAngle] = useState('诚恳道歉');
  const [selectedStyle, setSelectedStyle] = useState('sincere');
  const [finalReply, setFinalReply] = useState('');
  
  // 补偿功能相关状态
  const [compensationProcessing, setCompensationProcessing] = useState(false);
  const [compensationUpdated, setCompensationUpdated] = useState(false);
  const [originalReply, setOriginalReply] = useState(''); // 保存原始回复

  // 真实API调用处理
  const callRealAPI = async () => {
    try {
      const response = await fetch('/api/generate-replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewText,
          language
        }),
      });

      const data = await response.json();

      if (data.errCode === 0) {
        const { analysis: apiAnalysis, replies } = data.data;
        setAnalysis(apiAnalysis);
        setResults(replies);
        setIsLoading(false);
        updateFinalReply();
      } else {
        throw new Error(data.errMsg);
      }
    } catch (error) {
      console.error('API调用失败:', error);
      setIsLoading(false);
      toast.error(`生成失败: ${error instanceof Error ? error.message : '请检查网络或联系管理员'}`);
    }
  };

  // 补偿处理函数
  const selectCompensation = async (compensationType: string) => {
    if (compensationProcessing) return;
    
    setCompensationProcessing(true);
    setCompensationUpdated(false);
    
    try {
      const response = await fetch('/api/add-compensation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalReply: originalReply || finalReply,
          compensationType
        }),
      });

      const data = await response.json();

      if (data.errCode === 0) {
        setFinalReply(data.data.finalReply);
        setCompensationProcessing(false);
        setCompensationUpdated(true);
        
        toast.success('补偿信息已添加');
        
        // 3秒后隐藏更新提示
        setTimeout(() => {
          setCompensationUpdated(false);
        }, 3000);
      } else {
        throw new Error(data.errMsg);
      }
    } catch (error) {
      console.error('补偿处理失败:', error);
      setCompensationProcessing(false);
      setCompensationUpdated(false);
      toast.error(`处理失败: ${error instanceof Error ? error.message : '请稍后再试'}`);
    }
  };

  // 跳过补偿
  const skipCompensation = () => {
    if (compensationProcessing) return;
    toast.success('当前回复无需补偿');
  };

  // 模拟处理步骤
  const simulateProcessing = async () => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < processingSteps.length) {
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        // 调用真实API
        callRealAPI();
      }
    }, 800);
  };

  const updateFinalReply = () => {
    if (results && results[selectedAngle] && results[selectedAngle][selectedStyle]) {
      const reply = results[selectedAngle][selectedStyle];
      setFinalReply(reply);
      // 保存原始回复，用于补偿处理
      if (!originalReply) {
        setOriginalReply(reply);
      }
    }
  };

  useEffect(() => {
    updateFinalReply();
  }, [selectedAngle, selectedStyle, results]);

  const handleAnalyze = () => {
    if (!reviewText.trim()) {
      toast.error('请输入差评内容');
      return;
    }

    setIsLoading(true);
    setAnalysis(null);
    setResults(null);
    setCurrentStep(0);
    setOriginalReply('');
    setCompensationUpdated(false);
    simulateProcessing();
  };

  const copyReply = () => {
    navigator.clipboard.writeText(finalReply);
    toast.success('回复已复制到剪贴板');
  };

  return (
    <PhoneContainer>
      <div className="space-y-4">
        {/* 头部标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🤖 智能差评转化助手
          </h1>
          <p className="text-slate-600 text-sm">基于AI的商家差评回复生成工具</p>
        </motion.div>

        {/* 输入区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Edit3 className="w-4 h-4" />
                输入差评内容
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="送太慢，汤全都洒出来了！！！"
                className="min-h-[80px] resize-none text-sm"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">语言选择：</span>
                <Tabs value={language} onValueChange={setLanguage}>
                  <TabsList className="grid w-fit grid-cols-2 h-8">
                    <TabsTrigger value="mandarin" className="text-xs">普通话</TabsTrigger>
                    <TabsTrigger value="cantonese" className="text-xs">粤语</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="sm"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-2" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 mr-2" />
                    开始分析
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* 处理进度 */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent" />
                    AI智能分析中
                  </CardTitle>
                  <p className="text-xs text-slate-600">帮紧你 帮紧你 30秒就出来 🚀</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {processingSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                          isActive 
                            ? 'bg-purple-50 border-2 border-purple-200' 
                            : isCompleted 
                            ? 'bg-green-50 border-2 border-green-200' 
                            : 'bg-slate-50'
                        }`}
                      >
                        <div className="relative">
                          <Icon className={`w-4 h-4 ${
                            isActive ? 'text-purple-600' : isCompleted ? 'text-green-600' : 'text-slate-400'
                          }`} />
                          {isActive && (
                            <div className="absolute -inset-1 border border-purple-300 rounded-full animate-pulse" />
                          )}
                          {isCompleted && (
                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full flex items-center justify-center">
                              <div className="w-0.5 h-0.5 bg-white rounded-full" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs text-slate-600">{step.desc}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  <div className="space-y-2">
                    <Progress value={(currentStep / processingSteps.length) * 100} className="h-1.5" />
                    <div className="text-xs text-slate-600 text-center">
                      {Math.round((currentStep / processingSteps.length) * 100)}% 完成
                    </div>
                  </div>
                  
                  <div className="text-center text-xs text-slate-500">
                    💡 {encourageTexts[currentStep] || encourageTexts[0]}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 分析结果 */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-4 h-4" />
                    分析结果
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">问题类型：</span>
                    <Badge variant="destructive" className="text-xs">{analysis.issueType}</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">用户怒气值：</span>
                      <span className="text-xs font-medium">{analysis.anger}%</span>
                    </div>
                    <Progress value={analysis.anger} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-xs text-slate-600">关键矛盾：</span>
                    <p className="text-xs bg-slate-50 p-2 rounded">{analysis.keywords}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 回复策略选择 */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-4 h-4" />
                    选择回复策略
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {angles.map((angle) => (
                      <motion.div
                        key={angle.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAngle === angle.key
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setSelectedAngle(angle.key)}
                      >
                        <div className="font-medium text-sm">{angle.name}</div>
                        <div className="text-xs text-slate-600">{angle.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-4 h-4" />
                    选择回复风格
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {styles.map((style) => {
                      const Icon = style.icon;
                      return (
                        <motion.div
                          key={style.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                            selectedStyle === style.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          onClick={() => setSelectedStyle(style.id)}
                        >
                          <Icon className="w-4 h-4 mx-auto mb-1" />
                          <div className="font-medium text-xs">{style.name}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 最终回复 */}
              {finalReply && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Edit3 className="w-4 h-4" />
                      生成的回复
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* 补偿更新提示 */}
                    <AnimatePresence>
                      {compensationUpdated && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 bg-green-50 border-2 border-green-200 text-green-800 p-2 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">✨ 补偿信息已成功添加到回复中</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-xs leading-relaxed">{finalReply}</p>
                    </div>

                    {/* 补偿选择区域 */}
                    <div className="bg-purple-50 border-2 border-purple-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">需要提供补偿措施吗？</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {compensationActions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <motion.button
                              key={action.name}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => selectCompensation(action.name)}
                              disabled={compensationProcessing}
                              className={`flex items-center gap-2 p-2 bg-white border-2 border-purple-200 rounded-lg text-xs font-medium transition-all ${
                                compensationProcessing 
                                  ? 'opacity-50 cursor-not-allowed' 
                                  : 'hover:bg-purple-50 hover:border-purple-300'
                              }`}
                            >
                              <Icon className="w-3 h-3" />
                              <span>{action.name}</span>
                            </motion.button>
                          );
                        })}
                        
                        {/* 无需补偿选项 */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={skipCompensation}
                          disabled={compensationProcessing}
                          className={`flex items-center gap-2 p-2 bg-white border-2 border-slate-200 rounded-lg text-xs font-medium transition-all ${
                            compensationProcessing 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <X className="w-3 h-3" />
                          <span>无需补偿</span>
                        </motion.button>
                      </div>

                      {/* 补偿处理状态 */}
                      {compensationProcessing && (
                        <div className="flex items-center gap-2 mt-2 text-xs text-purple-600">
                          <div className="animate-spin rounded-full h-3 w-3 border-2 border-purple-600 border-t-transparent" />
                          <span>正在添加补偿信息...</span>
                        </div>
                      )}
                    </div>

                    <Button onClick={copyReply} className="w-full" variant="outline" size="sm">
                      <Copy className="w-3 h-3 mr-2" />
                      复制回复
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
    </div>
    </PhoneContainer>
  );
}
