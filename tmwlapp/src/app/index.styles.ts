import { StyleSheet } from 'react-native';

export const BOTTOM_NAV_HEIGHT = 62;
export const HEADER_BAR_HEIGHT = 56;

export const styles = StyleSheet.create({
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
    tintColor: '#ffffff',
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
