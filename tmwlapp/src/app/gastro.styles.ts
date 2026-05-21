import { StyleSheet } from 'react-native';

// Design system colors (same as lineup)
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
    minHeight: 380,
    backgroundColor: BG,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
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

  // Category Selector (Horizontal Scroll)
  categorySelector: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    borderColor: GOLD,
  },
  categoryButtonText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoryButtonTextActive: {
    color: GOLD,
    fontWeight: '700',
  },

  // Menu item cards
  body: {
    backgroundColor: BG,
    paddingTop: 16,
    paddingBottom: 40,
  },
  itemCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  itemImage: {
    width: 110,
    height: 110,
    backgroundColor: '#111',
  },
  itemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 20,
  },
  priceTag: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  restaurantText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  hoursText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '400',
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
