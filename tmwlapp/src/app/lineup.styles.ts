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
    paddingTop: 40,
    paddingBottom: 20,
    gap: 8,
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

  // Week & Day Selectors
  selectorContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    zIndex: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  weekButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  weekButtonActive: {
    backgroundColor: 'rgba(200, 65, 122, 0.2)',
    borderColor: ACCENT,
    borderWidth: 1.5,
  },
  weekButtonText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  weekButtonTextActive: {
    color: WHITE,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  dayButton: {
    width: 80,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayButtonActive: {
    backgroundColor: 'rgba(200, 65, 122, 0.1)',
    borderColor: ACCENT,
  },
  dayButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '600',
  },
  dayButtonTextActive: {
    color: WHITE,
    fontWeight: '700',
  },

  // Stage Selector (Horizontal Scroll)
  stageSelector: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  stageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  stageButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: GOLD,
  },
  stageButtonText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stageButtonTextActive: {
    color: GOLD,
    fontWeight: '700',
  },

  // Artist List
  body: {
    backgroundColor: BG,
    paddingTop: 16,
    paddingBottom: 40,
  },
  artistCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  artistImage: {
    width: 100,
    height: 100,
    backgroundColor: '#111',
  },
  artistInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  timeText: {
    color: GOLD,
    fontSize: 12,
    fontWeight: '700',
  },
  artistName: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  stageName: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: MUTED,
    fontSize: 16,
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
