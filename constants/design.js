/**
 * Shared visual tokens for the Personal CV & Academic Score app.
 */

// ============================================
// COLOR PALETTE
// ============================================
const blueScale = {
  50: '#EEF4FC',
  100: '#DDE9F8',
  200: '#BFD4F0',
  300: '#96B6E3',
  400: '#6F96D4',
  500: '#4778C3',
  600: '#3566B0',
  700: '#294F8C',
  800: '#1C3B6B',
  900: '#10243A',
  950: '#0A192B',
};

export const Colors = {
  primary: blueScale,
  secondary: blueScale,
  accent: blueScale,
  danger: blueScale,

  // Blue-tinted neutrals keep surfaces and borders in the same theme.
  neutral: {
    0: '#FFFFFF',
    50: '#F3F6FA',
    100: '#E6ECF4',
    200: '#CDD8E8',
    300: '#AABBD4',
    400: '#7F96B6',
    500: '#5E7598',
    600: '#465D80',
    700: '#344969',
    800: '#243754',
    900: '#172840',
    950: '#101D32',
  },

  // Semantic aliases for easy theming
  background: {
    primary: '#F3F6FA',
    secondary: '#FFFFFF',
    tertiary: '#EAF0F6',
    card: '#FFFFFF',
    modal: 'rgba(16, 36, 58, 0.6)',
  },

  overlay: {
    light: 'rgba(255, 255, 255, 0.2)',
    medium: 'rgba(255, 255, 255, 0.3)',
  },

  text: {
    primary: '#111111',
    secondary: '#202A38',
    tertiary: '#394B63',
    quaternary: '#5E7598',
    inverse: '#FFFFFF',
    link: '#3566B0',
    linkHover: '#294F8C',
  },

  border: {
    light: '#E2E8EF',
    medium: '#CDD8E8',
    dark: '#7F96B6',
    focus: '#4778C3',
    error: '#4778C3',
  },

  status: {
    success: '#4778C3',
    warning: '#3566B0',
    error: '#294F8C',
    info: '#4778C3',
  },

  // Gradient definitions
  gradients: {
    primary: ['#E6F0FF', '#D8E7FA'],
    primaryLight: ['#F1F6FD', '#E6EEF8'],
    secondary: ['#E6F0FF', '#D8E7FA'],
    dark: ['#10243A', '#294F8C'],
    hero: ['#E5F0FF', '#DCEAFE', '#F3F6FA'],
    card: ['#FFFFFF', '#F6F8FB'],
  },
};

// ============================================
// SPACING SYSTEM (8px base unit)
// ============================================
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

// ============================================
// BORDER RADIUS
// ============================================
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  xxxl: 32,
  full: 9999,
};

// ============================================
// TYPOGRAPHY
// ============================================
export const Typography = /** @type {const} */ ({
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
    heavy: 'System',
  },

  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
    hero: 48,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    heavy: '800',
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
});

// ============================================
// SHADOWS & ELEVATION
// ============================================
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  xs: {
    shadowColor: '#10243A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  sm: {
    shadowColor: '#10243A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  md: {
    shadowColor: '#10243A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  lg: {
    shadowColor: '#10243A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },

  xl: {
    shadowColor: '#10243A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },

  // Colored shadows for brand elements
  primary: {
    shadowColor: '#294F8C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },

  success: {
    shadowColor: '#294F8C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
};

// ============================================
// ANIMATION & TRANSITION
// ============================================
export const Animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// ============================================
// LAYOUT CONSTANTS
// ============================================
export const Layout = {
  screenPadding: Spacing.md,
  cardPadding: Spacing.md,
  sectionGap: Spacing.lg,
  itemGap: Spacing.md,
  maxContentWidth: 800,
  headerHeight: 56,
  tabBarHeight: 85,
};

// ============================================
// COMPONENT VARIANTS
// ============================================
export const Variants = {
  button: {
    primary: {
      backgroundColor: Colors.primary[600],
      borderColor: Colors.primary[600],
      textColor: Colors.text.inverse,
    },
    secondary: {
      backgroundColor: Colors.background.secondary,
      borderColor: Colors.border.medium,
      textColor: Colors.text.primary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: Colors.primary[600],
      textColor: Colors.primary[600],
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: Colors.text.secondary,
    },
    danger: {
      backgroundColor: Colors.danger[600],
      borderColor: Colors.danger[600],
      textColor: Colors.text.inverse,
    },
    success: {
      backgroundColor: Colors.secondary[600],
      borderColor: Colors.secondary[600],
      textColor: Colors.text.inverse,
    },
  },

  card: {
    elevated: {
      backgroundColor: Colors.background.card,
      borderRadius: BorderRadius.lg,
      ...Shadows.md,
      borderWidth: 1,
      borderColor: Colors.border.light,
    },
    flat: {
      backgroundColor: Colors.background.card,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: Colors.border.light,
    },
    outlined: {
      backgroundColor: Colors.background.primary,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: Colors.border.medium,
    },
    gradient: {
      backgroundColor: Colors.background.card,
      borderRadius: BorderRadius.lg,
      ...Shadows.lg,
    },
  },

  input: {
    default: {
      backgroundColor: Colors.background.secondary,
      borderColor: Colors.border.light,
      borderWidth: 1,
      borderRadius: BorderRadius.md,
    },
    focused: {
      backgroundColor: Colors.background.secondary,
      borderColor: Colors.border.focus,
      borderWidth: 2,
      borderRadius: BorderRadius.md,
    },
    error: {
      backgroundColor: Colors.danger[50],
      borderColor: Colors.border.error,
      borderWidth: 1,
      borderRadius: BorderRadius.md,
    },
    disabled: {
      backgroundColor: Colors.neutral[100],
      borderColor: Colors.border.light,
      borderWidth: 1,
      borderRadius: BorderRadius.md,
    },
  },

  badge: {
    default: {
      backgroundColor: Colors.primary[100],
      textColor: Colors.primary[700],
    },
    success: {
      backgroundColor: Colors.secondary[100],
      textColor: Colors.secondary[700],
    },
    warning: {
      backgroundColor: Colors.accent[100],
      textColor: Colors.accent[700],
    },
    danger: {
      backgroundColor: Colors.danger[100],
      textColor: Colors.danger[700],
    },
    info: {
      backgroundColor: Colors.primary[100],
      textColor: Colors.primary[700],
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
export const getLevelColor = (level) => {
  switch (level) {
    case 'Advanced': return Colors.secondary[500];
    case 'Intermediate': return Colors.accent[500];
    case 'Beginner': return Colors.danger[500];
    default: return Colors.neutral[500];
  }
};

export const getLevelVariant = (level) => {
  switch (level) {
    case 'Advanced': return Variants.badge.success;
    case 'Intermediate': return Variants.badge.warning;
    case 'Beginner': return Variants.badge.danger;
    default: return Variants.badge.default;
  }
};

export default {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Shadows,
  Animation,
  Layout,
  Variants,
  getLevelColor,
  getLevelVariant,
};
