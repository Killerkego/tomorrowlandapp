import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FestivalCountdown } from '@/components/FestivalCountdown';
import { NewsCard } from '@/components/NewsCard';
import { VideoBackground } from '@/components/VideoBackground';
import { fetchBelgiumNews } from '@/services/fetchBelgiumNews';
import type { NewsArticle } from '@/types/news';

const BOTTOM_NAV_HEIGHT = 62;
const HEADER_BAR_HEIGHT = 56;

export default function HomeScreen() {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const heroHeight = useMemo(() => {
    const available =
      windowHeight - insets.top - insets.bottom - BOTTOM_NAV_HEIGHT - HEADER_BAR_HEIGHT;
    return Math.max(available, 420);
  }, [windowHeight, insets.top, insets.bottom]);

  const titleSize = windowWidth < 360 ? 26 : windowWidth < 400 ? 28 : 32;
  const compact = windowWidth < 400;

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
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {/* Videó: hero + üdvözlő doboz mögött */}
          <View style={styles.videoStage}>
            <VideoBackground source={require('../../assets/videos/tmwl_video.mp4')} />
            <View style={styles.heroOverlay} />

            <View style={[styles.heroMain, { minHeight: heroHeight }]}>
              <View style={styles.heroHeader}>
                <TouchableOpacity style={styles.headerSide}>
                  <MaterialCommunityIcons name="web" size={34} color="#ffffff" />
                </TouchableOpacity>

                <View style={styles.headerCenter}>
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

              <View style={styles.heroContent}>
                <Text style={[styles.mainTitle, { fontSize: titleSize }]}>Tomorrowland Belgium</Text>
                <Text style={[styles.locationText, compact && styles.locationTextCompact]}>
                  DE SCHORRE • BOOM, BELGIUM
                </Text>

                <View style={styles.weekendContainer}>
                  <Text style={styles.weekendTitle}>WEEKEND 1</Text>
                  <Text style={styles.dateText}>JULY 17-19, 2026</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.weekendContainer}>
                  <Text style={styles.weekendTitle}>WEEKEND 2</Text>
                  <Text style={styles.dateText}>JULY 24-26, 2026</Text>
                </View>

                <FestivalCountdown variant="hero" />
              </View>
            </View>

            <View style={styles.welcomeOnVideo}>
              <View style={styles.welcomeBox}>
                <Text style={styles.welcomeText}>
                  Dear People of Tomorrow, Tomorrowland Belgium 2026 is officially sold out.{'\n\n'}
                  The love reached far beyond the capacity of the Holy Grounds, and it's difficult
                  knowing we can't welcome everyone who dreamed of being there. You are the magic that
                  makes Tomorrowland live forever.
                </Text>
              </View>
            </View>
          </View>

          {/* Hírek: solid háttér, videó nélkül */}
          <View style={styles.scrollBody}>
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
          </View>
        </ScrollView>

        <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
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
    backgroundColor: '#000000',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  videoStage: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  heroMain: {
    width: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  welcomeOnVideo: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  heroHeader: {
    height: HEADER_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    pointerEvents: 'none',
  },
  centerLogo: {
    width: 40,
    height: 40,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  mainTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  locationText: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 28,
    textAlign: 'center',
  },
  locationTextCompact: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  weekendContainer: {
    alignItems: 'center',
    marginVertical: 6,
  },
  weekendTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginVertical: 12,
  },
  scrollBody: {
    backgroundColor: '#000000',
    paddingTop: 16,
    paddingBottom: 24,
  },
  welcomeBox: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 10, 10, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
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
    paddingTop: 14,
    minHeight: BOTTOM_NAV_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#000000',
  },
});
