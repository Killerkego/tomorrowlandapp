import React, { useState } from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { AppBottomNav } from '@/components/AppBottomNav';

const BG = '#000000';
const WHITE = '#ffffff';
const MUTED = 'rgba(255,255,255,0.75)';
const BORDER = 'rgba(255,255,255,0.12)';

const CAROUSEL_IMAGES = [
  require('../../assets/images/what_is_tomorowland_1.jpg'),
  require('../../assets/images/what_is_tomorowland_2.jpg'),
  require('../../assets/images/what_is_tomorowland_3.jpg'),
  require('../../assets/images/what_is_tomorowland_4.jpg'),
  require('../../assets/images/what_is_tomorowland_5.jpg'),
];

const DREAMVILLE_IMAGES = [
  require('../../assets/images/DreamVille_1.jpg'),
  require('../../assets/images/DreamVille_2.jpg'),
  require('../../assets/images/DreamVille_3.jpg'),
  require('../../assets/images/DreamVille_4.jpg'),
  require('../../assets/images/DreamVille_5.jpg'),
  require('../../assets/images/DreamVille_6.jpg'),
];

const GLOBAL_JOURNEY_IMAGES = [
  require('../../assets/images/Global_Journey_1.jpg'),
  require('../../assets/images/Global_Journey_2.jpg'),
  require('../../assets/images/Global_Journey_3.jpg'),
  require('../../assets/images/Global_Journey_4.jpg'),
  require('../../assets/images/Global_Journey_5.jpg'),
];

const WINTER_IMAGES = [
  require('../../assets/images/Winter_1.jpg'),
  require('../../assets/images/Winter_2.jpg'),
  require('../../assets/images/Winter_3.jpg'),
  require('../../assets/images/Winter_4.jpg'),
  require('../../assets/images/Winter_5.jpg'),
];

const BRASIL_IMAGES = [
  require('../../assets/images/Brasil_1.jpg'),
  require('../../assets/images/Brasil_2.jpg'),
  require('../../assets/images/Brasil_3.jpg'),
  require('../../assets/images/Brasil_4.jpg'),
  require('../../assets/images/Brasil_5.jpg'),
];

export default function ThisIsTomorrowlandScreen() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isUserActive = pathname === '/login';

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/this-is-tmwl-hero.webp')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent','rgba(0,0,0,0.3)','rgba(0,0,0,0.5)','rgba(0,0,0,0.7)','#000000']}
            locations={[0, 0.3, 0.5, 0.7, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={[styles.overlayHeader, { top: insets.top }]}>
            <TouchableOpacity style={styles.headerSide} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color={WHITE} />
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
              onPress={() => router.push('/login')}
            >
              <Ionicons
                name="person-circle-outline"
                size={36}
                color={isUserActive ? '#d4af37' : WHITE}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Welcome</Text>
            <Text style={styles.heroTitle}>This is Tomorrowland</Text>
          </View>
        </View>

        <View style={styles.body}>
          <ImageSlideshow images={CAROUSEL_IMAGES} />

          <View style={styles.slideshowText}>
            <Text style={typo.h3}>What is Tomorrowland?</Text>
            <Text style={typo.p}>
              Tomorrowland is one of the largest and most iconic electronic music festivals in the world, taking place every year in July in Boom, Belgium. The first edition of Tomorrowland was held in 2005 as a one-day festival with 9.000 visitors. Today, Tomorrowland stretches over two weekends, welcoming 400.000 People of Tomorrow from all over the world. Tomorrowland caters to all genres in electronic dance music with hundreds of renowned artists performing across more than 15 different stages.
            </Text>
          </View>

          <View style={styles.sectionDivider} />

          <ImageSlideshow images={DREAMVILLE_IMAGES} />

          <View style={styles.slideshowText}>
            <Text style={typo.h3}>What is DreamVille?</Text>
            <Text style={typo.p}>
              DreamVille, Tomorrowland’s official campsite located right next to the festival grounds, is a vibrant city that welcomes tens of thousands of festival visitors after an exuberant day at Tomorrowland.
            </Text>
            <Text style={typo.p}>
              DreamVille offers a unique camping experience with a wide range of accommodations, so everyone can find a place to fall in love with.
            </Text>
          </View>

          <View style={styles.sectionDivider} />

          <ImageSlideshow images={GLOBAL_JOURNEY_IMAGES} />

          <View style={styles.slideshowText}>
            <Text style={typo.h3}>What is Global Journey?</Text>
            <Text style={typo.p}>
              Thanks to Global Journey, Tomorrowland's official travel program, people from every corner of the globe can travel all united in an all-in travel experience to Tomorrowland by plane, train, or bus from cities all over the world. Global Journey Travel Packages offer visitors a carefree all-in experience that combines the festival with both transport and hotel or camping stay, covering your trip from the moment you leave home and guiding you straight to the magical gates of Tomorrowland.
            </Text>
            <Text style={typo.p}>
              Every package includes a Tomorrowland Full Madness ticket and shuttle transport to and from the festival – making it the easiest way to travel to Tomorrowland.
            </Text>
          </View>

          <View style={styles.sectionDivider} />

          <ImageSlideshow images={WINTER_IMAGES} />

          <View style={styles.slideshowText}>
            <Text style={typo.preTitle}>TOMORROWLAND AROUND THE WORLD</Text>
            <Text style={typo.h3}>Tomorrowland Winter</Text>
            <Text style={typo.p}>
              In March 2019, the first edition of Tomorrowland Winter was organized in the breathtaking ski resort of Alpe d'Huez in France. Taking place annually in March ever since, festivalgoers unite for a week-long winter festival adventure high up in the beautiful French mountains, filled with snow, skiing, snowboarding, and the finest electronic music.
            </Text>
            <Text style={typo.p}>
              Each year, more than 150 of the world's best electronic artists perform across a collection of magnificent indoor and outdoor stages in the ski resort and on the mountains, boasting spectacular views of Alpe d'Huez and the surrounding mountains.
            </Text>
          </View>

          <View style={styles.sectionDivider} />

          <ImageSlideshow images={BRASIL_IMAGES} />

          <View style={styles.slideshowText}>
            <Text style={typo.preTitle}>TOMORROWLAND AROUND THE WORLD</Text>
            <Text style={typo.h3}>Tomorrowland Brasil</Text>
            <Text style={typo.p}>
              The first two festival editions of Tomorrowland Brasil took place in 2015 and 2016 in the beautiful festival area of Parque Maeda in in Itu, São Paulo.
            </Text>
            <Text style={typo.p}>
              After years of dreaming of a return, Tomorrowland finally headed back to Brazil in 2023, becoming a yearly highlight once again. Offering the ultimate escape from the city during three days of bliss in October, People of Tomorrow from around the world are treated to breathtaking performances by more than 150 of the world's finest electronic artists across 6 mesmerizing stages in the lush and green scenery of Parque Maeda.
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}

function ImageSlideshow({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(total - 1, i + 1));

  return (
    <View style={ss.slideshowWrapper}>
      <View style={ss.slide}>
        <RNImage
          source={images[activeIndex]}
          style={ss.slideImg}
          resizeMode="cover"
        />
      </View>

      <View style={ss.controls}>
        <TouchableOpacity style={ss.navBtn} onPress={prev}>
          <Ionicons name="chevron-back" size={20} color={WHITE} />
        </TouchableOpacity>

        <View style={ss.progressRow}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                ss.progressSegment,
                i === activeIndex && ss.progressSegmentActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={ss.navBtn} onPress={next}>
          <Ionicons name="chevron-forward" size={20} color={WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  heroContainer: {
    minHeight: 340,
    backgroundColor: BG,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerSide: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSideRight: { alignItems: 'flex-end' },
  headerCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  centerLogo: { width: 40, height: 40, tintColor: '#ffffff' },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 52,
    gap: 12,
    zIndex: 1,
    width: '100%',
  },
  heroBreadcrumb: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  heroTitle: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
  },

  body: {
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 32,
  },

  slideshowText: {
    marginTop: 20,
    gap: 12,
  },
});

const typo = StyleSheet.create({
  preTitle: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    opacity: 0.5,
    marginBottom: -4,
  },
  h3: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0,
  },
  p: {
    color: MUTED,
    fontSize: 16,
    lineHeight: 24,
  },
});

const ACCENT = '#c8417a';

const ss = StyleSheet.create({
  slideshowWrapper: {
    width: '100%',
  },
  slide: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  slideImg: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(30,10,20,0.75)',
    borderWidth: 1.5,
    borderColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressSegmentActive: {
    backgroundColor: ACCENT,
  },
});
