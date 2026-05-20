import { StyleSheet } from 'react-native';

// Design system színek a lineup.styles.ts alapján
export const BG = '#000000';
export const WHITE = '#ffffff';
export const MUTED = 'rgba(255,255,255,0.75)';
export const BORDER = 'rgba(255,255,255,0.12)';
export const GOLD = '#d4af37';
export const ACCENT = '#c8417a';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: BG 
  },
  screen: { 
    flex: 1 
  },
  content: { 
    flex: 1, 
    paddingTop: 16 
  },
  
  // Kereső sáv
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    height: 48,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  searchIcon: { 
    fontSize: 18, 
    marginRight: 8, 
    color: MUTED 
  },
  searchInput: { 
    flex: 1, 
    color: WHITE, 
    fontSize: 16 
  },

  // Szűrők (Kategória és Ár)
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: BORDER,
  },
  activePill: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)', // Arany árnyalat
    borderColor: GOLD,
  },
  filterText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterTextActive: {
    color: GOLD,
    fontWeight: '700',
  },

  // Lista és Kártyák (artistCard stílushoz hasonlóan)
  listContainer: { 
    paddingBottom: 20,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#111', // Sötét háttér a képnek
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    fontSize: 32,
    opacity: 0.5,
  },
  cardInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  priceText: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '700',
  }
});