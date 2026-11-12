import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing, Platform } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../constants/design';

const ProfileHeader = ({ profile }) => {
  const useNativeDriver = Platform.OS !== 'web';
  const avatarScale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Subtle entrance animation
    Animated.timing(avatarScale, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Svg style={styles.backgroundGradient} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="profileHeaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={Colors.gradients.dark[0]} />
            <Stop offset="100%" stopColor={Colors.gradients.dark[1]} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#profileHeaderGradient)" />
      </Svg>

      <View style={styles.contentWrapper}>
        <Animated.View
          style={[
            styles.avatarWrapper,
            {
              transform: [{ scale: avatarScale }],
            },
          ]}
        >
          <View style={styles.avatarRing}>
            <Image
              source={require('../assets/WhatsApp Image 2026-11-07 at 10.22.48.jpeg')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          <View style={styles.statusDot} />
        </Animated.View>

        <View style={styles.infoContainer}>
          <Text style={styles.eyebrow}>PERSONAL CV</Text>
          <Text style={styles.name}>
            {profile.nama} - {profile.nim}
          </Text>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: Colors.primary[100] }]}>
              <Text style={[styles.badgeText, { color: Colors.primary[700] }]}>
                {profile.fakultas}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: Colors.secondary[100] }]}>
              <Text style={[styles.badgeText, { color: Colors.secondary[700] }]}>
                {profile.prodi}
              </Text>
            </View>
          </View>

          <View style={styles.profesiRow}>
            <View style={styles.profesiIcon} />
            <Text style={styles.profesi}>{profile.profesi}</Text>
          </View>

          <Text style={styles.deskripsi} numberOfLines={3}>
            {profile.deskripsi}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.screenPadding,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    padding: 0,
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
    position: 'relative',
    overflow: 'hidden',
  },

  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.lg,
    position: 'relative',
    zIndex: 1,
  },

  avatarWrapper: {
    position: 'relative',
    flexShrink: 0,
  },

  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.xs,
    borderWidth: 2,
    borderColor: Colors.background.secondary,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
  },

  statusDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.secondary[500],
    borderWidth: 3,
    borderColor: Colors.background.secondary,
  },

  infoContainer: {
    flex: 1,
    paddingTop: Spacing.xs,
    minWidth: 0,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    letterSpacing: Typography.letterSpacing.wider,
    marginBottom: 3,
  },

  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.heavy,
    color: Colors.text.inverse,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.tight,
    marginBottom: Spacing.xs,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },

  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },

  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
  },

  profesiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    backgroundColor: Colors.accent[50],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.accent[100],
    alignSelf: 'flex-start',
  },

  profesiIcon: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent[500],
  },

  profesi: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.normal,
  },

  deskripsi: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.inverse,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
    letterSpacing: Typography.letterSpacing.normal,
  },
});

export default ProfileHeader;
