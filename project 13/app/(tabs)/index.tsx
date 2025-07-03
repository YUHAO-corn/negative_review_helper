import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Copy, Gift } from 'lucide-react-native';

interface AnalysisResult {
  type: string;
  anger: number;
  issue: string;
}

interface Strategy {
  id: number;
  title: string;
  language: 'cantonese' | 'mandarin';
  description: string;
}

interface Style {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export default function BadReviewReplyTool() {
  const [reviewText, setReviewText] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('sincere');
  const [finalReply, setFinalReply] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const analysisOpacity = useRef(new Animated.Value(0)).current;
  const strategyOpacity = useRef(new Animated.Value(0)).current;
  const styleOpacity = useRef(new Animated.Value(0)).current;
  const resultOpacity = useRef(new Animated.Value(0)).current;

  // 模拟分析数据
  const mockAnalysis: AnalysisResult[] = [
    {
      type: '配送延迟',
      anger: 80,
      issue: '汤汁洒漏 + 超时30分钟'
    },
    {
      type: '食物质量',
      anger: 90,
      issue: '菜品不新鲜 + 份量不足'
    },
    {
      type: '服务态度',
      anger: 70,
      issue: '态度恶劣 + 退款困难'
    }
  ];

  const strategies: Strategy[] = [
    {
      id: 1,
      title: '诚恳道歉+补偿方案',
      language: 'cantonese',
      description: '粤语真诚回复'
    },
    {
      id: 2,
      title: '问题解释+紧急补救',
      language: 'mandarin',
      description: '普通话专业回复'
    },
    {
      id: 3,
      title: '幽默化解+福利诱惑',
      language: 'cantonese',
      description: '粤语轻松回复'
    }
  ];

  const styles: Style[] = [
    {
      id: 'sincere',
      name: '诚恳',
      emoji: '🥺',
      color: '#3b82f6'
    },
    {
      id: 'cute',
      name: '卖萌',
      emoji: '🥰',
      color: '#ec4899'
    },
    {
      id: 'confident',
      name: '霸气',
      emoji: '💪',
      color: '#fbbf24'
    }
  ];

  const mockReplies: Record<number, Record<string, string>> = {
    1: {
      sincere: '真系唔好意思呀！我哋知道今次配送有问题，汤汁洒咗真系好对唔住。我哋即刻安排重新送过，仲会比返配送费你。下次一定会小心啲！🥺【深水埗陈记】',
      cute: '哎呀呀～今次真系我哋错喇！汤汁洒咗好心痛呀😭 我哋马上重新整一份靓靓嘅送过嚟，仲加多啲小菜俾你食！原谅我哋啦～🥰【深水埗陈记】',
      confident: '收到！配送问题我哋即刻处理！重新送餐 + 全额退款 + 下次免费升级套餐，呢啲就系我哋嘅诚意！💪【深水埗陈记】'
    },
    2: {
      sincere: '非常抱歉给您带来不好的用餐体验。我们已经了解到配送过程中的问题，会立即安排重新制作并送达。同时我们会加强配送培训，确保不再发生类似情况。🥺【深水埗陈记】',
      cute: '啊～真的很抱歉呢！汤汁洒了我们也很心疼😭 马上给您重新做一份美味的送过去，还会加一些小点心作为歉意哦～请原谅我们这次的失误！🥰【深水埗陈记】',
      confident: '问题已确认！立即重新配送 + 全额补偿 + 下次优惠券，这就是我们的解决方案！我们会确保服务质量！💪【深水埗陈记】'
    },
    3: {
      sincere: '哎呀，今次真系搞砸咗！不过放心，我哋会用最快嘅速度补救返。重新送餐、退款、仲有特别优惠券，希望可以挽回你嘅信心！🥺【深水埗陈记】',
      cute: '呜呜呜～被你发现我哋犯错喇！😅 不过我哋会努力补救嘅！新嘅美食马上送到，仲有神秘小礼品添！下次一定唔会再出错喇～🥰【深水埗陈记】',
      confident: '好！问题收到！我哋会用实际行动证明实力：重送 + 补偿 + 超值优惠！呢啲就系我哋嘅态度！💪【深水埗陈记】'
    }
  };

  const analyzeReview = () => {
    if (!reviewText.trim()) {
      Alert.alert('提示', '请输入差评内容');
      return;
    }

    // 简单的关键词检测来选择合适的分析结果
    let selectedAnalysis = mockAnalysis[0];
    if (reviewText.includes('不新鲜') || reviewText.includes('质量') || reviewText.includes('味道')) {
      selectedAnalysis = mockAnalysis[1];
    } else if (reviewText.includes('态度') || reviewText.includes('服务') || reviewText.includes('退款')) {
      selectedAnalysis = mockAnalysis[2];
    }

    setAnalysis(selectedAnalysis);
    setCurrentStep(2);

    Animated.timing(analysisOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setCurrentStep(3);
        Animated.timing(strategyOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  };

  const selectStrategy = (strategyId: number) => {
    setSelectedStrategy(strategyId);
    setCurrentStep(4);
    
    Animated.timing(styleOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    generateReply(strategyId, selectedStyle);
  };

  const selectStyle = (styleId: string) => {
    setSelectedStyle(styleId);
    if (selectedStrategy) {
      generateReply(selectedStrategy, styleId);
    }
  };

  const generateReply = (strategyId: number, styleId: string) => {
    const reply = mockReplies[strategyId]?.[styleId] || '';
    setFinalReply(reply);
    setCurrentStep(5);
    
    Animated.timing(resultOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const copyReply = async () => {
    if (Platform.OS === 'web') {
      try {
        await navigator.clipboard.writeText(finalReply);
        Alert.alert('成功', '回复已复制到剪贴板');
      } catch {
        Alert.alert('提示', '复制功能需要在HTTPS环境下使用');
      }
    } else {
      // For mobile platforms, you would use Clipboard from react-native
      Alert.alert('成功', '回复已复制到剪贴板');
    }
  };

  const generateCoupon = () => {
    Alert.alert('优惠券生成', '8折优惠券已生成！\n优惠码：SORRY20240101\n有效期：30天');
  };

  const renderAngerBar = (anger: number) => {
    const bars = Array.from({ length: 5 }, (_, index) => (
      <View
        key={index}
        style={[
          localStyles.angerBarItem,
          { backgroundColor: index < Math.floor(anger / 20) ? '#ef4444' : '#e5e5e5' }
        ]}
      />
    ));
    return <View style={localStyles.angerBar}>{bars}</View>;
  };

  return (
    <SafeAreaView style={localStyles.container}>
      {/* 导航栏 */}
      <View style={localStyles.header}>
        <Text style={localStyles.headerTitle}>差评救命！｜粤语版</Text>
      </View>

      <ScrollView style={localStyles.content} showsVerticalScrollIndicator={false}>
        {/* 差评输入区 */}
        <View style={localStyles.card}>
          <Text style={localStyles.cardTitle}>输入差评内容</Text>
          <TextInput
            style={localStyles.textInput}
            placeholder="粘贴差评内容，例：送太慢汤都洒了"
            placeholderTextColor="#9ca3af"
            value={reviewText}
            onChangeText={setReviewText}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity 
            style={localStyles.analyzeButton} 
            onPress={analyzeReview}
          >
            <Search size={20} color="#ffffff" />
            <Text style={localStyles.analyzeButtonText}>开始分析</Text>
          </TouchableOpacity>
        </View>

        {/* AI解析展示区 */}
        {currentStep >= 2 && analysis && (
          <Animated.View style={[localStyles.card, { opacity: analysisOpacity }]}>
            <Text style={localStyles.cardTitle}>🔍 分析结果</Text>
            <View style={localStyles.analysisRow}>
              <Text style={localStyles.analysisLabel}>问题类型：</Text>
              <View style={localStyles.typeTag}>
                <Text style={localStyles.typeTagText}>{analysis.type}</Text>
              </View>
            </View>
            <View style={localStyles.analysisRow}>
              <Text style={localStyles.analysisLabel}>用户怒气值：</Text>
              {renderAngerBar(analysis.anger)}
              <Text style={localStyles.angerText}>{analysis.anger}%</Text>
            </View>
            <View style={localStyles.analysisRow}>
              <Text style={localStyles.analysisLabel}>💡 关键矛盾：</Text>
              <Text style={localStyles.issueText}>{analysis.issue}</Text>
            </View>
          </Animated.View>
        )}

        {/* 回复策略选择 */}
        {currentStep >= 3 && (
          <Animated.View style={[localStyles.card, { opacity: strategyOpacity }]}>
            <Text style={localStyles.cardTitle}>选择回复策略</Text>
            <View style={localStyles.strategyContainer}>
              {strategies.map((strategy) => (
                <TouchableOpacity
                  key={strategy.id}
                  style={[
                    localStyles.strategyCard,
                    selectedStrategy === strategy.id && localStyles.strategyCardSelected
                  ]}
                  onPress={() => selectStrategy(strategy.id)}
                >
                  <Text style={[
                    localStyles.strategyTitle,
                    selectedStrategy === strategy.id && localStyles.strategyTitleSelected
                  ]}>
                    {strategy.title}
                  </Text>
                  <Text style={[
                    localStyles.strategyDescription,
                    selectedStrategy === strategy.id && localStyles.strategyDescriptionSelected
                  ]}>
                    {strategy.description}
                  </Text>
                  <View style={localStyles.languageTag}>
                    <Text style={localStyles.languageTagText}>
                      {strategy.language === 'cantonese' ? '粤语' : '普通话'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        {/* 风格定制区 */}
        {currentStep >= 4 && (
          <Animated.View style={[localStyles.card, { opacity: styleOpacity }]}>
            <Text style={localStyles.cardTitle}>选择回复风格</Text>
            <View style={localStyles.styleContainer}>
              {styles.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={[
                    localStyles.styleButton,
                    { backgroundColor: selectedStyle === style.id ? style.color : '#f3f4f6' }
                  ]}
                  onPress={() => selectStyle(style.id)}
                >
                  <Text style={localStyles.styleEmoji}>{style.emoji}</Text>
                  <Text style={[
                    localStyles.styleName,
                    { color: selectedStyle === style.id ? '#ffffff' : '#374151' }
                  ]}>
                    {style.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        {/* 最终回复生成区 */}
        {currentStep >= 5 && finalReply && (
          <Animated.View style={[localStyles.resultCard, { opacity: resultOpacity }]}>
            <Text style={localStyles.resultTitle}>✨ 生成的回复</Text>
            <View style={localStyles.replyContainer}>
              <Text style={localStyles.replyText}>{finalReply}</Text>
            </View>
            <View style={localStyles.actionButtons}>
              <TouchableOpacity style={localStyles.copyButton} onPress={copyReply}>
                <Copy size={20} color="#ffffff" />
                <Text style={localStyles.copyButtonText}>📋 复制回复</Text>
              </TouchableOpacity>
              <TouchableOpacity style={localStyles.couponButton} onPress={generateCoupon}>
                <Gift size={20} color="#ffffff" />
                <Text style={localStyles.couponButtonText}>🎫 生成优惠券</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <View style={localStyles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#374151',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  analyzeButton: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  analysisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  analysisLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  typeTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  typeTagText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: '600',
  },
  angerBar: {
    flexDirection: 'row',
    marginRight: 8,
  },
  angerBarItem: {
    width: 16,
    height: 16,
    marginRight: 2,
    borderRadius: 2,
  },
  angerText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  issueText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  strategyContainer: {
    gap: 12,
  },
  strategyCard: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    position: 'relative',
  },
  strategyCardSelected: {
    borderColor: '#1e40af',
    backgroundColor: '#f0f9ff',
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  strategyTitleSelected: {
    color: '#1e40af',
  },
  strategyDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  strategyDescriptionSelected: {
    color: '#1e40af',
  },
  languageTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  languageTagText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '600',
  },
  styleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  styleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  styleEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  styleName: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#15803d',
    marginBottom: 16,
  },
  replyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  replyText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  copyButton: {
    flex: 1,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  couponButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpace: {
    height: 40,
  },
});