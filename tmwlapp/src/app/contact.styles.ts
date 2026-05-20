import { StyleSheet } from 'react-native';

// Design system colors
export const BG = '#000000';
export const WHITE = '#ffffff';
export const MUTED = 'rgba(255,255,255,0.75)';
export const BORDER = 'rgba(255,255,255,0.12)';
export const GOLD = '#d4af37';
export const ACCENT = '#c8417a';

export const styles = StyleSheet.create({
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
    minWidth: '28%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
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

export const typo = StyleSheet.create({
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
