import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { FestivalCountdown } from '@/components/FestivalCountdown';
import { NewsCard } from '@/components/NewsCard';
import { VideoBackground } from '@/components/VideoBackground';
import { AppHeader } from '@/components/AppHeader';
import { AppBottomNav } from '@/components/AppBottomNav';
import { fetchBelgiumNews } from '@/services/fetchBelgiumNews';
import type { NewsArticle } from '@/types/news';
import { styles, BOTTOM_NAV_HEIGHT, HEADER_BAR_HEIGHT } from './index.styles';

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
    <SafeAreaView style={styles.container} edges={[]}>
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

            <View style={[styles.heroMain, { minHeight: heroHeight, paddingTop: insets.top }]}>
              {/* HEADER OVERLAY */}
              <View style={{
                position: 'absolute',
                top: insets.top,
                left: 0,
                right: 0,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                zIndex: 10,
              }}>
                <TouchableOpacity style={styles.headerSide} onPress={() => router.push('/contact')}>
                  <Ionicons name="information-circle-outline" size={36} color="#ffffff" />
                </TouchableOpacity>
                <View style={styles.headerCenter} pointerEvents="none">
                  <RNImage
                    source={require('../../assets/images/tmwl_logo.png')}
                    style={styles.centerLogo}
                    resizeMode="contain"
                  />
                </View>
                <TouchableOpacity
                  style={[styles.headerSide, styles.headerSideRight]}
                  onPress={() => router.push('/user')}
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={36}
                    color="#ffffff"
                  />
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
                news.map((article, index) => (
                  <NewsCard
                    key={article.url}
                    article={article}
                    onPress={() => {
                      if (index === 0) {
                        router.push('/ticket-guide');
                      } else if (index === 1) {
                        router.push('/lineup');
                      } else if (index === 2) {
                        router.push('/this-is-tomorrowland');
                      } else {
                        openArticle(article.url);
                      }
                    }}
                  />
                ))}
            </View>
          </View>
        </ScrollView>

        <AppBottomNav />
      </View>
    </SafeAreaView>
  );
}


