import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows, getLevelColor, getLevelVariant } from '../constants/design';

const SkillCard = ({ skill }) => {
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: skill.percentage / 100,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, []);

  const levelColor = getLevelColor(skill.level);
  const levelVariant = getLevelVariant(skill.level);
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const progressLabel = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.card}>
      {/* Top accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Ionicons name="flash-outline" size={20} color={Colors.primary[700]} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{skill.name}</Text>
            <View style={[styles.levelBadge, { backgroundColor: levelVariant.backgroundColor }]}>
              <Text style={[styles.levelText, { color: levelVariant.textColor }]}>
                {skill.level}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Animated.View
            style={[
              styles.progressTrack,
              { backgroundColor: Colors.neutral[100] },
            ]}
          >
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: levelColor, width: progressWidth },
              ]}
            >
              <Animated.View
                style={[
                  styles.progressGlow,
                  { backgroundColor: levelColor },
                ]}
              />
            </Animated.View>
          </Animated.View>

          <View style={styles.progressMeta}>
            <Text style={styles.progressLabel}>Proficiency</Text>
            <Animated.Text
              style={[
                styles.percentage,
                { color: Colors.text.primary },
              ]}
            >
              {progressLabel}
            </Animated.Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.xs,
    borderWidth: 1,
    borderColor: Colors.border.light,
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  },

  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Colors.neutral[0],
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },

  content: {
    position: 'relative',
    zIndex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    flexShrink: 0,
  },

  iconText: {
    fontSize: 20,
  },

  headerText: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: Spacing.xs,
  },

  levelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },

  levelText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
  },

  progressSection: {
    gap: Spacing.sm,
  },

  progressTrack: {
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
    position: 'relative',
    overflow: 'hidden',
  },

  progressGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 20,
    borderRadius: BorderRadius.full,
    opacity: 0.6,
  },

  progressMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.tertiary,
  },

  percentage: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    fontVariant: ['tabular-nums'],
  },
});

export default SkillCard;
