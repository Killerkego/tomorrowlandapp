import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Design system colors
export const BG = '#000000';
export const WHITE = '#ffffff';
export const GOLD = '#d4af37';
export const MUTED = 'rgba(255,255,255,0.6)';
export const BORDER = 'rgba(255,255,255,0.12)';
export const ACCENT = '#c8417a';

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
    paddingBottom: 20,
    // NINCS justifyContent: 'center' - Ez okozza a fókuszvesztést Androidon!
  },

  // Hero Section
  heroContainer: {
    height: 340,
    backgroundColor: BG,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
    zIndex: 1,
  },
  heroBreadcrumb: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    color: WHITE,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: 0.5,
  },

  // Login Form Container
  formContainer: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  inputGroup: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 8,
    borderWidth: 1.5, // FIX vastagság a pixel elcsúszás ellen
    borderColor: BORDER,
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: GOLD,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: WHITE,
    fontSize: 16,
    height: '100%',
    paddingVertical: Platform.OS === 'ios' ? 0 : 8,
  },
  eyeIcon: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 56,
    backgroundColor: 'rgba(200, 65, 122, 0.2)',
    borderColor: ACCENT,
    borderWidth: 1.5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },

  // Success State Styles
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    gap: 16,
  },
  successTitle: {
    color: GOLD,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  successText: {
    color: WHITE,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  successButton: {
    height: 56,
    width: '100%',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successButtonText: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
