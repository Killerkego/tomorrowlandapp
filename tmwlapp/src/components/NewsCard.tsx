import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { NewsArticle } from '@/types/news';

type Props = {
  article: NewsArticle;
  onPress: () => void;
};

export function NewsCard({ article, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.imageFrame}>
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description}
        </Text>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>LEARN MORE</Text>
          <Ionicons name="chevron-forward" size={14} color="#ffffff" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0d0d0d',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardPressed: {
    opacity: 0.92,
  },
  imageFrame: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    gap: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  description: {
    color: '#a8a8a8',
    fontSize: 15,
    lineHeight: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  cta: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
