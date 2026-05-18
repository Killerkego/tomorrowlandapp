import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import { FestivalCountdown } from '@/components/FestivalCountdown';
import { NewsCard } from '@/components/NewsCard';
import { fetchBelgiumNews } from '@/services/fetchBelgiumNews';
import type { NewsArticle } from '@/types/news';

export default function HomeScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const loadNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const articles = await fetchBelgiumNews(3);
      setNews(articles);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const openArticle = (url: string) => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={require('../../assets/videos/tmwl_video.mp4')}
        style={StyleSheet.absoluteFillObject}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />

      <View style={styles.overlay} />

      <View style={styles.screen}>
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.headerSide}>
            <MaterialCommunityIcons name="web" size={34} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.headerCenter} pointerEvents="none">
            <Image
              source={require('../../assets/images/tmwl_logo.png')}
              style={styles.centerLogo}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={[styles.headerSide, styles.headerSideRight]}>
            <Ionicons name="person-circle-outline" size={36} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.heroSection, { minHeight: windowHeight * 0.52 }]}>
            <Text style={styles.mainTitle}>Tomorrowland Belgium</Text>
            <Text style={styles.locationText}>DE SCHORRE • BOOM, BELGIUM</Text>

            <View style={styles.weekendContainer}>
              <Text style={styles.weekendTitle}>WEEKEND 1</Text>
              <Text style={styles.dateText}>JULY 17-19, 2026</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.weekendContainer}>
              <Text style={styles.weekendTitle}>WEEKEND 2</Text>
              <Text style={styles.dateText}>JULY 24-26, 2026</Text>
            </View>
          </View>

          <View style={styles.welcomeBox}>
            <Text style={styles.welcomeText}>
              Dear People of Tomorrow, Tomorrowland Belgium 2026 is officially sold out.{'\n\n'}
              The love reached far beyond the capacity of the Holy Grounds, and it's difficult
              knowing we can't welcome everyone who dreamed of being there. You are the magic that
              makes Tomorrowland live forever.
            </Text>
          </View>

          <View style={styles.countdownWrap}>
            <FestivalCountdown />
          </View>

          <View style={styles.newsSection}>
            <Text style={styles.newsSectionTitle}>NEWS & UPDATES</Text>

            {newsLoading && (
              <View style={styles.newsState}>
                <ActivityIndicator color="#d4af37" />
              </View>
            )}

            {!newsLoading &&
              news.map((article) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  onPress={() => openArticle(article.url)}
                />
              ))}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <Ionicons name="home-outline" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screen: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 2,
  },
  headerSide: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSideRight: {
    alignItems: 'flex-end',
  },
  headerCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogo: {
    width: 40,
    height: 40,
  },
  heroSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  locationText: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 40,
    textAlign: 'center',
  },
  weekendContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  weekendTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },
  dateText: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  separator: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 15,
  },
  welcomeBox: {
    marginHorizontal: 16,
    marginBottom: 28,
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  countdownWrap: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  newsSection: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 8,
  },
  newsSectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 4,
  },
  newsState: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
});
