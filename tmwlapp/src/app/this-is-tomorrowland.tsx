import React, { useState } from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Carousel images ───────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  require('../../assets/images/what_is_tomorowland_1.jpg'),
  require('../../assets/images/what_is_tomorowland_2.jpg'),
  require('../../assets/images/what_is_tomorowland_3.jpg'),
  require('../../assets/images/what_is_tomorowland_4.jpg'),
  require('../../assets/images/what_is_tomorowland_5.jpg'),
];

export default function ThisIsTomorrowlandScreen() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isUserActive = pathname === '/user';

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ══════════════════════════════════════════════════════════════
            HERO — "This is Tomorrowland"
        ══════════════════════════════════════════════════════════════ */}
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

          {/* Transparent overlay header — absolutely pinned to the top */}
          <View style={[styles.overlayHeader, { top: 0 }]}>
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
              onPress={() => router.push('/user')}
            >
              <Ionicons
                name="person-circle-outline"
                size={36}
                color={isUserActive ? '#d4af37' : WHITE}
              />
            </TouchableOpacity>
          </View>

          {/* Hero text — bottom of hero */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Welcome</Text>
            <Text style={styles.heroTitle}>This is Tomorrowland</Text>
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════════════
            BODY
        ══════════════════════════════════════════════════════════════ */}
        <View style={styles.body}>

          {/* ── Block 1: Carousel slideshow ── */}
          <ImageSlideshow />

          {/* ── Block 1 text: What is Tomorrowland? ── */}
          <View style={styles.slideshowText}>
            <Text style={typo.h3}>What is Tomorrowland?</Text>
            <Text style={typo.p}>
              Tomorrowland is one of the largest and most iconic electronic music festivals in the world, taking place every year in July in Boom, Belgium. The first edition of Tomorrowland was held in 2005 as a one-day festival with 9.000 visitors. Today, Tomorrowland stretches over two weekends, welcoming 400.000 People of Tomorrow from all over the world. Tomorrowland caters to all genres in electronic dance music with hundreds of renowned artists performing across more than 15 different stages.
            </Text>
          </View>

          <View style={styles.sectionDivider} />

          {/* ── Block 2: DreamVille slideshow + text ── */}
          <MediaText
            image={require('../../assets/images/this-is-tmwl-dreamville.webp')}
            imageOnLeft={true}
            title="DreamVille"
            body="A true city within the festival, DreamVille is the camping experience at Tomorrowland. Located next to the festival grounds, DreamVille offers various camping categories ranging from comfortable tents to luxury apartments. DreamVille guests enjoy exclusive access to the festival, unique amenities, and a community of like-minded music lovers from around the globe."
          />

          <View style={styles.sectionDivider} />

          {/* ── Block 3: Global Journey ── */}
          <MediaText
            image={require('../../assets/images/this-is-tmwl-festival.webp')}
            imageOnLeft={false}
            title="Global Journey"
            body="Tomorrowland's Global Journey Travel Packages are the ultimate all-in experience. Travel from your home country in a group of fellow festival-goers and arrive at Tomorrowland in full comfort. The packages include a full festival pass, DreamVille accommodation or hotel stay, and return transportation — all perfectly organized so you can focus on enjoying the magic."
          />

          <View style={styles.sectionDivider} />

          {/* ── Block 4: Tomorrowland Winter ── */}
          <MediaText
            image={require('../../assets/images/this-is-tmwl-hero.webp')}
            imageOnLeft={true}
            title="Tomorrowland Winter"
            body="Tomorrowland Winter takes place in the French Alps in Alpe d'Huez. The world's biggest electronic music festival meets the world's best ski resort for an unforgettable experience combining skiing, snowboarding, and world-class electronic music in a breathtaking alpine setting."
          />

          <View style={styles.sectionDivider} />

          {/* ── Block 5: Tomorrowland Brasil ── */}
          <MediaText
            image={require('../../assets/images/this-is-tmwl-dreamville.webp')}
            imageOnLeft={false}
            title="Tomorrowland Brasil"
            body="Tomorrowland Brasil brings the magic of Tomorrowland to South America. Set in the beautiful nature of Itu, São Paulo, the festival welcomes People of Tomorrow from across the continent and the world, delivering the same immersive, world-class production that defines every Tomorrowland event."
          />

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function MediaText({
  image,
  imageOnLeft,
  title,
  body,
}: {
  image: any;
  imageOnLeft: boolean;
  title: string | null;
  body: string;
}) {
  return (
    <View style={styles.mediaText}>
      <View style={styles.mediaImageContainer}>
        <Image source={image} style={styles.mediaImage} contentFit="cover" />
      </View>
      <View style={styles.mediaBody}>
        {title && <Text style={typo.h3}>{title}</Text>}
        <Text style={typo.p}>{body}</Text>
      </View>
    </View>
  );
}

// ── ImageSlideshow — index-based (works reliably inside ScrollView) ───────────
function ImageSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = CAROUSEL_IMAGES.length;

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(total - 1, i + 1));

  return (
    <View style={ss.slideshowWrapper}>
      {/* Current image only — instant swap, no nested scroll conflict */}
      <View style={ss.slide}>
        <RNImage
          source={CAROUSEL_IMAGES[activeIndex]}
          style={ss.slideImg}
          resizeMode="cover"
        />
      </View>

      {/* Controls row: prev  ──progress bar──  next */}
      <View style={ss.controls}>
        <TouchableOpacity style={ss.navBtn} onPress={prev}>
          <Ionicons name="chevron-back" size={20} color={WHITE} />
        </TouchableOpacity>

        <View style={ss.progressRow}>
          {CAROUSEL_IMAGES.map((_, i) => (
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


// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // ── Hero ──────────────────────────────────────────────────────────────────
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
  centerLogo: { width: 40, height: 40 },
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
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  heroTitle: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
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

  // ── Media text ────────────────────────────────────────────────────────────
  mediaText: {
    gap: 20,
  },
  mediaImageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  mediaImage: {
    ...StyleSheet.absoluteFillObject,
  },
  mediaBody: {
    gap: 12,
  },
  slideshowText: {
    marginTop: 20,
    gap: 12,
  },

});

// ─── Typography ───────────────────────────────────────────────────────────────
const typo = StyleSheet.create({
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

// ─── Slideshow styles — matches website carousel exactly ──────────────────────
const ACCENT = '#c8417a';
const SLIDE_WIDTH = SCREEN_WIDTH - 40;

const ss = StyleSheet.create({
  slideshowWrapper: {
    width: '100%',
  },
  slide: {
    width: SLIDE_WIDTH,
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  slideImg: {
    width: '100%',
    height: '100%',
  },
  // Controls row below the image
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  // Circular nav button — dark semi-transparent, border
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
  // Segmented progress row
  progressRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // Individual segment — dim by default
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  // Active segment — pink accent
  progressSegmentActive: {
    backgroundColor: ACCENT,
  },
});
