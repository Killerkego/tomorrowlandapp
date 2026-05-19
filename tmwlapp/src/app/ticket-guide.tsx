import React from 'react';
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

// ─── Exact Tomorrowland Belgium website colours ──────────────────────────────
const BG = '#000000';           // --background (hsl 0,0%,0%)
const WHITE = '#ffffff';         // --font-color-primary on dark bg
const MUTED = 'rgba(255,255,255,0.75)'; // body text on dark bg
const BORDER = 'rgba(255,255,255,0.12)';

export default function TicketGuideScreen() {
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
        {/* ══════════════════════════════════════════════════════════════════
            HERO  —  same layout as website:
            full-width image (opacity 0.8) + gradient overlay fading to black,
            text centred over the top half
        ══════════════════════════════════════════════════════════════════ */}
        <View style={[styles.heroContainer, { paddingTop: insets.top }]}>
          {/* background image at 80 % opacity */}
          <Image
            source={require('../../assets/images/sales-info-hero.webp')}
            style={styles.heroBgImage}
            contentFit="cover"
          />
          {/* gradient: transparent → black — matches website CSS exactly:
            linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 30%,
            rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 70%, #000 100%) */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.7)',
              '#000000',
            ]}
            locations={[0, 0.3, 0.5, 0.7, 1.0]}
            style={StyleSheet.absoluteFillObject}
          />

          {/* ── Transparent overlay header — matches AppHeader layout ── */}
          <View style={styles.overlayHeader}>
            {/* Left: back chevron */}
            <TouchableOpacity style={styles.headerSide} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color={WHITE} />
            </TouchableOpacity>

            {/* Center: Tomorrowland logo (absolute so it doesn't push sides) */}
            <View style={styles.headerCenter} pointerEvents="none">
              <RNImage
                source={require('../../assets/images/tmwl_logo.png')}
                style={styles.centerLogo}
                resizeMode="contain"
              />
            </View>

            {/* Right: profile icon */}
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

          {/* centred text content */}
          <View style={styles.heroContent}>
            <Text style={styles.heroBreadcrumb}>Sales Info</Text>
            <Text style={styles.heroTitle}>
              How to order your{'\n'}Passes & Packages
            </Text>
            <Text style={styles.heroSubtitle}>A STEP BY STEP GUIDE</Text>
            <Text style={styles.heroDescription}>
              Discover how to order your Tomorrowland Passes & Travel Packages.
            </Text>
          </View>
        </View>

        {/* ══════════════════════════════════════════════════════════════════
            BODY  —  black background, website typography
        ══════════════════════════════════════════════════════════════════ */}
        <View style={styles.body}>

          {/* ── Page heading ── */}
          <H2>Order Process</H2>

          {/* ── Section tabs ── */}
          <View style={styles.anchorRow}>
            <AnchorPill label="Global Journey Travel Packages" />
            <AnchorPill label="Tomorrowland Passes & DreamVille Packages" />
          </View>

          {/* ─────────────────────────────────────────────────────────── */}
          {/* SECTION: Tomorrowland Passes & DreamVille                   */}
          {/* ─────────────────────────────────────────────────────────── */}
          <View style={styles.divider} />

          <StepBlock step="STEP 1: PRE-REGISTRATION">
            <P>
              Sign in or create your Tomorrowland Account and register for the Tomorrowland Belgium 2026 sales during the pre-registration period.
            </P>
          </StepBlock>

          <StepBlock step="STEP 2: TICKET SALE">
            <P>
              Go to your Tomorrowland Account and click on the sale button.{'\n'}
              Please check the different ticket types, before the ticket sale to make sure you select the correct Pass/Package and/or weekend.
            </P>
          </StepBlock>

          <StepBlock step="STEP 3: PERSONAL DETAILS">
            <P>
              Verify your personal details in your Tomorrowland Account. All your personal details will be automatically filled in during check-out for an easy and smooth purchase process.
            </P>
          </StepBlock>

          <StepBlock step="STEP 4: PAYMENT">
            <P>
              You must pay your Pass(es)/Package(s) immediately. Otherwise, your order will be canceled and your Pass(es)/Package(s) will go back on sale.{'\n\n'}
              Check in advance if the spending limit of your credit card is high enough and if you are allowed to make international payments (to Belgium). If not, please contact your bank. Failed payments will not be reprocessed, tickets will be offered for sale to the person next in line.{'\n\n'}
              Find all accepted payment methods here.
            </P>
          </StepBlock>

          <StepBlock step="STEP 5: CONFIRMATION EMAIL">
            <P>
              After payment, you will receive a confirmation email for your order.{'\n'}
              In this confirmation email, you can find your order number. Save this email until the end of the festival.
            </P>
          </StepBlock>

          <StepBlock step="STEP 6: PERSONALIZATION">
            <P>
              Each Pass/Package needs to be personalized. Go to the "Event Page" in your Tomorrowland Account at the start of the personalization period, you will be able to claim a Pass/Package for yourself or send (a) Pass(es)/Package(s) to a friend. The personalization deadline is mentioned in the confirmation email you received from Paylogic. <Strong>Important:</Strong> do not forget to personalize. Passes/Packages that are not personalized, can be cancelled.
            </P>
          </StepBlock>

          <StepBlock step="STEP 7: TOMORROWLAND BRACELETS">
            <P>
              As from the beginning of July, the Main Buyer will receive all the Tomorrowland Bracelet(s) of the order at the shipping address provided during the sale. Depending on where your shipping address is located your Treasure Case Fee will vary. Each attendee needs to activate their own Tomorrowland Bracelet. After activating your Bracelet, you will have the possibility to top-up your Bracelet with Pearls. More information about activating your Bracelet will be available in June.
            </P>
          </StepBlock>

          <StepBlock step="STEP 8: ENJOY TOMORROWLAND!">
            <P empty />
            <P><Strong>Important:</Strong></P>
            <BulletList items={[
              'You can buy tickets for a maximum of 4 people per Tomorrowland Account (with the exception of Friendship Garden Packages) cumulated throughout all sales moments.',
              'If you would like to have access to DreamVille, you must order one of the DreamVille Packages or a Global Journey Travel Package with DreamVille accommodation. DreamVille & Global Journey Packages always include a Full Madness Pass or a Full Madness Comfort Pass. It is not possible to buy DreamVille accommodations separately.',
              'Ticket refund fee: in case a festival admittance ticket purchased via Tomorrowland is refunded after purchase, a ticket refund fee of €15 will be charged per refunded ticket/person and therefore deducted from the refund amount.',
              'In case your order is cancelled before March 31, 2026, the Treasure Case fee will be refunded. In case your order is cancelled after March 31, 2026, the Treasure Case fee will not be refunded.',
            ]} />
          </StepBlock>

          {/* ─────────────────────────────────────────────────────────── */}
          {/* SECTION: Global Journey Travel Packages                     */}
          {/* ─────────────────────────────────────────────────────────── */}
          <View style={styles.sectionDivider} />
          <H3>Global Journey Travel Packages</H3>

          <StepBlock step="STEP 1: TOMORROWLAND ACCOUNT">
            <P>
              Sign in or create your Tomorrowland Account during the registration period as mentioned above. Make sure you are preregistered for Tomorrowland Belgium 2026.
            </P>
          </StepBlock>

          <StepBlock step="STEP 2: CHECK THE PRICE SIMULATOR">
            <P>
              Before the Global Journey Sale starts, you can already simulate your own package in the Price Simulator.
            </P>
            <P><Em>Do mind: prices in the Price Simulator can slightly deviate from the prices of the Global Journey Sale</Em></P>
          </StepBlock>

          <StepBlock step="STEP 3: SELECT YOUR PREFERRED SHOP">
            <P>
              On the day of the sale, go to your Tomorrowland Account and click on the link to access the Global Journey Sale. Start with choosing the package you want to book. Discover the different packages here.
            </P>
          </StepBlock>

          <StepBlock step="STEP 4: SELECT YOUR PREFERRED WEEKEND">
            <P>
              Select your preferred weekend by clicking on "Weekend 1" or "Weekend 2".{'\n\n'}
              Keep in mind the following packages can only be bought in Weekend 1 or Weekend 2.{'\n\n'}
              <Strong>WEEKEND 1:</Strong>{'\n'}
              Discover Belgium + Discover Europe + Tomorrowland x Grand Prix F1: Belgian Thrill Package + Youth Package + Wellbeing Package{'\n\n'}
              <Strong>WEEKEND 2:</Strong>{'\n'}
              Surprise Package + Love Tomorrow Package + Tomorrowland x Ridley Cycling Package + Youth Package + Wellbeing Package
            </P>
          </StepBlock>

          <StepBlock step="STEP 5: CHOOSE THE CONTENT OF YOUR PACKAGE">
            <P>
              Depending on the package you select, you need to choose the city you want to depart from, your accommodation and the type of Tomorrowland Pass.
            </P>
          </StepBlock>

          <StepBlock step="STEP 6: REVIEW YOUR ORDER">
            <P>
              After you selected everything in the package you can continue and will get a total overview of your package. Please double check everything you chose and click on "Buy Now" to purchase.
            </P>
          </StepBlock>

          <StepBlock step="STEP 7: COMPLETE YOUR ORDER">
            <P>
              The Buyer Information (First Name, Last Name, Address, Phone, Email, Gender, Nationality and Birthdate) will be automatically filled in with the details from your Tomorrowland Account. Select your payment method and don't forget to agree with the Global Journey General Rules & Conditions.{'\n\n'}
              At the bottom of the page, you need to fill in all customer details of the people who will accompany you (First Name, Last Name, Gender, Date of Birth, Phone, Email, Nationality and Country of Residence).{'\n\n'}
              The Main Buyer doesn't have to be among the personalized names and doesn't have to attend the festival.
            </P>
            <P><Strong>You have 10 minutes to complete the details. Make sure you already have the correct customer details before the start of the sale.</Strong></P>
            <P>"Proceed to payment" if you want to finalize your order.</P>
          </StepBlock>

          <StepBlock step="STEP 8: PAY YOUR PACKAGE">
            <P>
              The last step is to pay for your package. Only credit cards are allowed. Check if the spending limit of your credit card is high enough and if you are allowed to make international payments (to Belgium). Otherwise please contact your bank. Failed payments will not be reprocessed and your application will automatically be rejected. You can find all the allowed payment methods here.
            </P>
          </StepBlock>

          <StepBlock step="STEP 9: CONFIRMATION">
            <P>
              If your payment is accepted, a confirmation of your order will appear on your screen. The booking confirmation will also be sent to the email of the Main Buyer within 48 hours. Make sure to check your spam folder or unwanted emails.
            </P>
          </StepBlock>

          <StepBlock step="STEP 10: AFTER YOUR BOOKING">
            <P>
              The following options are only available for the Main Buyer of the Global Journey Package: Booking overview, Address confirmation or pick-up, Travel info, Visitors with disabilities.
            </P>
            <P empty />
            <P><Strong>Important:</Strong></P>
            <P>
              You can buy Packages for a maximum of 6 people in the Global Journey Sale per Tomorrowland Account (with the exception of Friendship Travel Packages) cumulated throughout all sales moments. During the NFT Global Journey Sale you will only be allowed to buy Packages for a maximum of 2 people.
            </P>
          </StepBlock>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      <AppBottomNav />
    </SafeAreaView>
  );
}

// ─── Mini components matching website typography ──────────────────────────────

function H2({ children }: { children: React.ReactNode }) {
  return <Text style={typo.h2}>{children}</Text>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <Text style={typo.h3}>{children}</Text>;
}
function P({ children, empty }: { children?: React.ReactNode; empty?: boolean }) {
  if (empty) return <View style={{ height: 8 }} />;
  return <Text style={typo.p}>{children}</Text>;
}
function Strong({ children }: { children: React.ReactNode }) {
  return <Text style={typo.strong}>{children}</Text>;
}
function Em({ children }: { children: React.ReactNode }) {
  return <Text style={typo.em}>{children}</Text>;
}
function AnchorPill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}
function StepBlock({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <View style={styles.stepBlock}>
      <Text style={typo.stepTitle}>{step}</Text>
      <View style={styles.stepBody}>{children}</View>
    </View>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={typo.p}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  // ── Transparent overlay header ────────────────────────────────────────────
  overlayHeader: {
    // Matches AppHeader: height 56, row, space-between, paddingH 20
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
    width: '100%',
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
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // ── Hero ──────────────────────────────────────────────────────────────────
  heroContainer: {
    // The website hero is tall: image fills, text centred
    minHeight: 340,
    backgroundColor: BG,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBgImage: {
    // absolute fill, 80% opacity — matches website "opacity:.8"
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 48,
    gap: 12,
    zIndex: 1,
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
    // --typography-heading-1: 48px on desktop, ~32px on mobile
    color: WHITE,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0,
    marginTop: 0,
  },
  heroSubtitle: {
    // heading-4: 12–14px, 700, letterSpacing 3px, uppercase
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 4,
  },
  heroDescription: {
    color: WHITE,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.85,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
  body: {
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 32,
  },

  anchorRow: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 24,
    marginTop: 8,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pillText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 24,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginTop: 32,
    marginBottom: 32,
  },

  // ── Step block ────────────────────────────────────────────────────────────
  stepBlock: {
    marginBottom: 28,
  },
  stepBody: {
    marginTop: 8,
    gap: 12,
  },

  // ── Bullet list ───────────────────────────────────────────────────────────
  bulletList: {
    gap: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletDot: {
    color: WHITE,
    fontSize: 16,
    lineHeight: 24,
  },
});

// ─── Typography — mirrors website CSS exactly ─────────────────────────────────
const typo = StyleSheet.create({
  // h2 { font-size:1.5rem=24px → 32px on 768px; font-weight:700; margin-block:1rem }
  h2: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 0,
    letterSpacing: 0,
  },
  // h3 { font-size:24px; font-weight:700 }
  h3: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 0,
  },
  // h4 (step title) { font-size:14px; font-weight:700; letter-spacing:3px; text-transform:uppercase }
  stepTitle: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  // p { font-size:16px; line-height:1.5rem=24px }
  p: {
    color: MUTED,
    fontSize: 16,
    lineHeight: 24,
    flexShrink: 1,
  },
  // strong { font-weight:700 }
  strong: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  // em { font-style: italic }
  em: {
    color: MUTED,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
  },
});
