import { StyleSheet, Dimensions } from 'react-native';
import { BG, WHITE, GOLD, MUTED, BORDER, ACCENT } from './login.styles';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  // Hero Section
  heroContainer: {
    height: 280,
    backgroundColor: BG,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    zIndex: 1,
    alignItems: 'center', // Középre igazítja a tartalmat
  },
  heroBreadcrumb: {
    color: GOLD,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroTitle: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center', // Középre igazítja a szöveget
  },

  // Tickets List
  container: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  ticketCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 20,
    overflow: 'hidden',
  },
  ticketImage: {
    width: '100%',
    height: 160,
  },
  ticketInfo: {
    padding: 20,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketLabel: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  ticketTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    marginRight: 10,
  },
  priceTag: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: GOLD,
  },
  priceText: {
    color: GOLD,
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  featureText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },
  buyButton: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: ACCENT,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buyButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  }
});
