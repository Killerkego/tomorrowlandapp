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
    paddingBottom: 120,
  },
  
  // Hero Section
  heroContainer: {
    minHeight: 440,
    backgroundColor: BG,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
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
  centerLogo: { width: 40, height: 40, tintColor: '#ffffff' },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
    zIndex: 1,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: GOLD,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative', // Fontos a lebegő gombhoz
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: GOLD,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: BG,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  heroTitle: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: GOLD,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 4,
  },

  // Profile Content
  contentSection: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  sectionTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
    paddingLeft: 12,
  },
  
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoLabel: {
    color: MUTED,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  infoValue: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  // Actions
  actionContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
    gap: 16,
  },
  actionButton: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  signOutButton: {
    borderColor: ACCENT,
    backgroundColor: 'rgba(200, 65, 122, 0.05)',
  },
  actionButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signOutText: {
    color: ACCENT,
  }
});
