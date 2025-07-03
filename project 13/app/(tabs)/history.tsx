import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, MessageSquare, Copy } from 'lucide-react-native';

interface HistoryItem {
  id: string;
  date: string;
  review: string;
  reply: string;
  strategy: string;
  style: string;
}

export default function HistoryScreen() {
  const historyData: HistoryItem[] = [
    {
      id: '1',
      date: '2024-01-15 14:30',
      review: '送太慢汤都洒了，差评！',
      reply: '真系唔好意思呀！我哋知道今次配送有问题，汤汁洒咗真系好对唔住...',
      strategy: '诚恳道歉+补偿方案',
      style: '诚恳 🥺'
    },
    {
      id: '2',
      date: '2024-01-15 10:15',
      review: '菜不新鲜，份量还少，太坑了',
      reply: '非常抱歉给您带来不好的用餐体验。我们已经了解到配送过程中的问题...',
      strategy: '问题解释+紧急补救',
      style: '诚恳 🥺'
    },
    {
      id: '3',
      date: '2024-01-14 19:45',
      review: '态度很差，要求退款还推三阻四',
      reply: '呜呜呜～被你发现我哋犯错喇！😅 不过我哋会努力补救嘅...',
      strategy: '幽默化解+福利诱惑',
      style: '卖萌 🥰'
    }
  ];

  const copyReply = (reply: string) => {
    // Copy functionality would be implemented here
    console.log('Copying reply:', reply);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>历史记录</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {historyData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.dateContainer}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <View style={styles.strategyTag}>
                <Text style={styles.strategyTagText}>{item.strategy}</Text>
              </View>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.sectionTitle}>原始差评</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>

            <View style={styles.replySection}>
              <View style={styles.replyHeader}>
                <Text style={styles.sectionTitle}>生成回复</Text>
                <Text style={styles.styleTag}>{item.style}</Text>
              </View>
              <Text style={styles.replyText}>{item.reply}</Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => copyReply(item.reply)}
              >
                <Copy size={16} color="#1e40af" />
                <Text style={styles.copyButtonText}>复制</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  strategyTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  strategyTagText: {
    color: '#1e40af',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  replySection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  styleTag: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  replyText: {
    fontSize: 14,
    color: '#374151',
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
    marginBottom: 12,
    lineHeight: 20,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1e40af',
  },
  copyButtonText: {
    color: '#1e40af',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  bottomSpace: {
    height: 40,
  },
});