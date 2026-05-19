import React, { useState } from 'react';
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
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
const GOLD = '#d4af37';
const ACCENT = '#c8417a';

type TabType = 'overview' | 'support' | 'partners';

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isUserActive = pathname === '/user';
  
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`).catch((err) =>
      console.error('An error occurred', err)
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err)
    );
  };

  const sponsors = [
    {
      name: 'Budweiser',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Budweiser_logo.svg/320px-Budweiser_logo.svg.png',
      role: 'Official Global Beer Partner',
      website: 'https://www.budweiser.com',
    },
    {
      name: 'Coca-Cola',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/320px-Coca-Cola_logo.svg.png',
      role: 'Official Soft Drinks Partner',
      website: 'https://www.coca-cola.com',
    },
    {
      name: 'JBL',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/JBL_logo.svg/320px-JBL_logo.svg.png',
      role: 'Official Sound & Audio Partner',
      website: 'https://www.jbl.com',
    },
    {
      name: 'BMW',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/320px-BMW.svg.png',
      role: 'Official Mobility Partner',
      website: 'https://www.bmw.com',
    },
    {
      name: 'Red Bull',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Red_Bull_logo.svg/320px-Red_Bull_logo.svg.png',
      role: 'Official Energy Drink Partner',
      website: 'https://www.redbull.com',
    },
    {
      name: 'Brussels Airlines',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brussels_Airlines_Logo.svg/320px-Brussels_Airlines_Logo.svg.png',
      role: 'Official Aviation Partner',
      website: 'https://www.brusselsairlines.com',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO BANNER */}
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          <Image
            source={require('../../assets/images/Tomorrowland_info.jpg')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)', '#000000']}
            locations={[0, 0.3, 0.5, 0.7, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* HEADER OVERLAY */}
          <View style={[styles.overlayHeader, { top: insets.top }]}>
            <View style={styles.headerSide} pointerEvents="none">
              <Ionicons name="information-circle-outline" size={32} color="#d4af37" />
            </View>
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

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>✦ People of Tomorrow ✦</Text>
            <Text style={styles.heroTitle}>Everything You{'\n'}Need to Know</Text>
            <Text style={styles.heroSubtitle}>
              Your complete guide to Tomorrowland — festival details, support channels, and the partners who make the magic happen.
            </Text>
          </View>
        </View>

        {/* TAB NAVIGATION BAR */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'overview' && styles.tabButtonActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Ionicons name="globe-outline" size={18} color={activeTab === 'overview' ? GOLD : MUTED} />
            <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.tabButtonTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'support' && styles.tabButtonActive]}
            onPress={() => setActiveTab('support')}
          >
            <Ionicons name="help-buoy-outline" size={18} color={activeTab === 'support' ? GOLD : MUTED} />
            <Text style={[styles.tabButtonText, activeTab === 'support' && styles.tabButtonTextActive]}>
              Support
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'partners' && styles.tabButtonActive]}
            onPress={() => setActiveTab('partners')}
          >
            <Ionicons name="ribbon-outline" size={18} color={activeTab === 'partners' ? GOLD : MUTED} />
            <Text style={[styles.tabButtonText, activeTab === 'partners' && styles.tabButtonTextActive]}>
              Partners
            </Text>
          </TouchableOpacity>
        </View>

        {/* BODY CONTAINER */}
        <View style={styles.body}>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <View style={styles.tabContentContainer}>
              <Text style={typo.h3}>Festival Data</Text>
              <Text style={typo.p}>
                Tomorrowland is the world's most iconic electronic music festival, bringing together hundreds of thousands of people from all over the globe to celebrate music, unity, and love.
              </Text>

              {/* Basic Festival Info Grid */}
              <View style={styles.dataCard}>
                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="location-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Location</Text>
                    <Text style={styles.dataValue}>De Schorre, Boom, Belgium</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="calendar-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Dates</Text>
                    <Text style={styles.dataValue}>July 17–19 & July 24–26, 2026</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="people-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Capacity</Text>
                    <Text style={styles.dataValue}>400,000+ People of Tomorrow</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="sparkles-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>First Edition</Text>
                    <Text style={styles.dataValue}>August 14, 2005</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="musical-notes-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Music Genres</Text>
                    <Text style={styles.dataValue}>EDM, Techno, House, Trance, Hardstyle</Text>
                  </View>
                </View>
              </View>

              <View style={styles.sectionDivider} />

              {/* General Guidelines */}
              <Text style={typo.h3}>General Guidelines</Text>
              
              <View style={styles.cardContainer}>
                {/* Age limit */}
                <View style={styles.infoCard}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="alert-circle-outline" size={22} color={ACCENT} />
                    <Text style={styles.infoCardTitle}>Age Restriction (18+)</Text>
                  </View>
                  <Text style={styles.infoCardText}>
                    The minimum age to enter the festival is 18. You must be 18 years old or older before or on the day you enter Tomorrowland. No exceptions.
                  </Text>
                </View>

                {/* Cashless */}
                <View style={styles.infoCard}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="card-outline" size={22} color={ACCENT} />
                    <Text style={styles.infoCardTitle}>100% Cashless System</Text>
                  </View>
                  <Text style={styles.infoCardText}>
                    Tomorrowland is a cashless festival. Your Bracelet is the only way to pay for food and drinks. Top up your Bracelet with "Pearls" in your Tomorrowland Account or at the festival grounds.
                  </Text>
                </View>

                {/* Eco Love Tomorrow */}
                <View style={styles.infoCard}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="leaf-outline" size={22} color={ACCENT} />
                    <Text style={styles.infoCardTitle}>Love Tomorrow (Eco-Commitment)</Text>
                  </View>
                  <Text style={styles.infoCardText}>
                    We respect Mother Nature. Help us keep the recreational grounds of De Schorre clean by separating your waste at the recycle clubhouses and disposing of trash correctly.
                  </Text>
                </View>

                {/* Safety Zero Tolerance */}
                <View style={styles.infoCard}>
                  <View style={styles.infoCardHeader}>
                    <Ionicons name="shield-checkmark-outline" size={22} color={ACCENT} />
                    <Text style={styles.infoCardTitle}>Safety & Zero Tolerance</Text>
                  </View>
                  <Text style={styles.infoCardText}>
                    Tomorrowland maintains a strict zero-tolerance policy regarding illegal drugs and substances. All visitors are subject to a security check at the entrance gates.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* TAB 2: SUPPORT & CONTACT */}
          {activeTab === 'support' && (
            <View style={styles.tabContentContainer}>
              <Text style={typo.h3}>Contact & Organizer</Text>
              <Text style={typo.p}>
                Tomorrowland is organized and operated by WeAreOne.World BV. Get in touch with our team directly for support, press inquiries, or business opportunities.
              </Text>

              {/* Organizer details card */}
              <View style={styles.dataCard}>
                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="business-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Organizer Company</Text>
                    <Text style={styles.dataValue}>WeAreOne.World BV</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="location-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Registered Address</Text>
                    <Text style={styles.dataValue}>Antwerp, Belgium</Text>
                  </View>
                </View>

                <View style={styles.dataRow}>
                  <View style={styles.dataIconCol}>
                    <Ionicons name="mail-unread-outline" size={20} color={GOLD} />
                  </View>
                  <View style={styles.dataTextCol}>
                    <Text style={styles.dataLabel}>Official Inquiries</Text>
                    <Text style={styles.dataValue}>info@tomorrowland.com</Text>
                  </View>
                </View>
              </View>

              <View style={styles.sectionDivider} />

              <Text style={typo.h3}>Support Channels</Text>
              
              <View style={styles.cardContainer}>
                
                {/* General Support */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="help-circle-outline" size={24} color={GOLD} />
                    <Text style={styles.cardTitle}>General Support</Text>
                  </View>
                  <Text style={styles.cardText}>
                    For general questions, feedback, or inquiries about the festival experience.
                  </Text>
                  <TouchableOpacity 
                    style={styles.cardButton} 
                    activeOpacity={0.9}
                  >
                    <Text style={styles.cardButtonText}>Email Support</Text>
                    <Ionicons name="mail-outline" size={16} color={WHITE} />
                  </TouchableOpacity>
                </View>

                {/* Ticket Support */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="ticket-outline" size={24} color={GOLD} />
                    <Text style={styles.cardTitle}>Ticket Support</Text>
                  </View>
                  <Text style={styles.cardText}>
                    Questions about tickets, personalization, or payments? Contact our official ticketing partner.
                  </Text>
                  <TouchableOpacity 
                    style={styles.cardButton} 
                    activeOpacity={0.9}
                  >
                    <Text style={styles.cardButtonText}>Email Paylogic</Text>
                    <Ionicons name="mail-outline" size={16} color={WHITE} />
                  </TouchableOpacity>
                </View>

                {/* Global Journey */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="airplane-outline" size={24} color={GOLD} />
                    <Text style={styles.cardTitle}>Global Journey</Text>
                  </View>
                  <Text style={styles.cardText}>
                    Need help with your travel package, flight details, or hotel accommodation?
                  </Text>
                  <TouchableOpacity 
                    style={styles.cardButton} 
                    activeOpacity={0.9}
                  >
                    <Text style={styles.cardButtonText}>Email Travel Support</Text>
                    <Ionicons name="mail-outline" size={16} color={WHITE} />
                  </TouchableOpacity>
                </View>

                {/* Business B2B */}
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="briefcase-outline" size={24} color={GOLD} />
                    <Text style={styles.cardTitle}>B2B & Business</Text>
                  </View>
                  <Text style={styles.cardText}>
                    For company sponsorships, VIP tables, corporate events, or business relations.
                  </Text>
                  <TouchableOpacity 
                    style={styles.cardButton} 
                    activeOpacity={0.9}
                  >
                    <Text style={styles.cardButtonText}>Email B2B Relations</Text>
                    <Ionicons name="mail-outline" size={16} color={WHITE} />
                  </TouchableOpacity>
                </View>

              </View>

              <View style={styles.sectionDivider} />

              {/* Social Channels */}
              <Text style={typo.h3}>Official Channels</Text>
              <View style={styles.socialGrid}>
                <TouchableOpacity 
                  style={styles.socialItem} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-instagram" size={24} color={WHITE} />
                  <Text style={styles.socialLabel}>Instagram</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialItem} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-youtube" size={24} color={WHITE} />
                  <Text style={styles.socialLabel}>YouTube</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialItem} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-facebook" size={24} color={WHITE} />
                  <Text style={styles.socialLabel}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialItem} 
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-tiktok" size={24} color={WHITE} />
                  <Text style={styles.socialLabel}>TikTok</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TAB 3: SPONSORS / PARTNERS */}
          {activeTab === 'partners' && (
            <View style={styles.tabContentContainer}>
              <Text style={typo.h3}>Official Partners</Text>
              <Text style={typo.p}>
                Tomorrowland is extremely proud of its official partners. Together we build, design, and create a unique festival world for the People of Tomorrow.
              </Text>

              {/* Sponsors Grid */}
              <View style={styles.sponsorsGrid}>
                {sponsors.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.sponsorCard}
                    onPress={() => handleLinkPress(item.website)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.sponsorLogoContainer}>
                      <RNImage
                        source={{ uri: item.logo }}
                        style={styles.sponsorLogo}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.sponsorInfo}>
                      <Text style={styles.sponsorName}>{item.name}</Text>
                      <Text style={styles.sponsorRole}>{item.role}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // Hero section
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
    paddingBottom: 40,
    gap: 12,
    zIndex: 1,
    width: '100%',
  },
  heroBreadcrumb: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  heroTitle: {
    color: WHITE,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
    marginTop: 4,
  },

  // Tab styling
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    marginTop: 10,
    marginHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
  },
  tabButtonText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
  tabButtonTextActive: {
    color: GOLD,
    fontWeight: '700',
  },

  // Body container
  body: {
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  tabContentContainer: {
    gap: 16,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 12,
  },

  // Data rows
  dataCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: BORDER,
    gap: 4,
    marginTop: 8,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
  },
  dataIconCol: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dataTextCol: {
    flex: 1,
    justifyContent: 'center',
  },
  dataLabel: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  dataValue: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '500',
  },

  // Info cards
  cardContainer: {
    gap: 16,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoCardTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  infoCardText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },

  // Contact support cards
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  cardTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: 'rgba(200, 65, 122, 0.2)',
    borderColor: ACCENT,
    borderWidth: 1.5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 8,
  },
  cardButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
  },

  // Social Grid
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  socialItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  socialLabel: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
  },

  // Sponsors Grid
  sponsorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
  },
  sponsorCard: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    gap: 12,
  },
  sponsorLogoContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    overflow: 'hidden',
  },
  sponsorLogo: {
    width: 110,
    height: 50,
  },

  sponsorInfo: {
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },
  sponsorName: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  sponsorRole: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
});

const typo = StyleSheet.create({
  h3: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  p: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
  },
});
