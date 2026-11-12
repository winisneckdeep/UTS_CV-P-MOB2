import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../constants/design';

// Create animated components for react-native-svg with collapsable prop filtered out for web
const AnimatedCircle = Animated.createAnimatedComponent(
  ({ collapsable, ...props }) => <Circle {...props} />
);

/**
 * Beautiful Circular Progress Ring Component
 */
const ProgressRing = ({ progress, color, label, size = 80, strokeWidth = 6, animated = true, wide = false }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: progress / 100,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(progress / 100);
    }
  }, [progress, animated]);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[styles.ringContainer, wide && styles.ringContainerWide]}>
      <View style={[styles.ringWrapper, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          {/* Background track */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke={Colors.neutral[100]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />

          {/* Progress ring */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={[{ rotate: '-90deg' }]}
          />

          {/* Glow effect */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke={color}
            strokeWidth={strokeWidth + 4}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={[{ rotate: '-90deg' }]}
            opacity={progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.15],
            })}
          />
        </Svg>

        {/* Center content */}
        <View style={styles.ringCenter}>
          <Animated.Text
            style={[
              styles.ringValue,
              { color: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Colors.text.quaternary, Colors.text.primary],
              }) },
            ]}
          >
            {progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            })}
          </Animated.Text>
        </View>
      </View>
      <Text style={styles.progressLabel}>{label}</Text>
    </View>
  );
};

/**
 * Stat Card Component
 */
const StatCard = ({ icon, value, label, color, wide }) => (
  <View style={[
    styles.statCard,
    wide && styles.statCardWide,
    { ...Shadows.xs, borderColor: Colors.border.light, borderLeftColor: Colors.background.card },
  ]}>
    <View style={styles.statIconWrapper}>
      <View style={[
        styles.statIcon,
        { backgroundColor: `${color}1A` },
      ]}>
        <Ionicons name={icon} size={20} color={Colors.primary[700]} />
      </View>
    </View>
    <Text style={[
      styles.statValue,
      { color: Colors.text.primary },
    ]}>
      {value}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const AcademicDashboard = ({ academicData }) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 720;
  const { identitasAkademik, currentScore, learningPoints, learningProgress } = academicData;

  const progressItems = [
    { label: 'Attendance', value: learningProgress.attendance, color: Colors.primary[500] },
    { label: 'Practice', value: learningProgress.practice, color: Colors.primary[500] },
    { label: 'Quest', value: learningProgress.quest, color: Colors.primary[500] },
    { label: 'Challenge', value: learningProgress.challenge, color: Colors.primary[500] },
  ];

  const statCards = [
    { icon: 'person-outline', value: currentScore.nilai, label: 'Current Score', color: Colors.primary[500], gradient: true },
    { icon: 'school-outline', value: currentScore.grade, label: 'Grade', color: Colors.primary[500] },
    { icon: 'star-outline', value: learningPoints.total.toLocaleString('id-ID'), label: 'Learning Points', color: Colors.primary[500] },
    { icon: 'stats-chart-outline', value: Math.round(
      (learningProgress.attendance + learningProgress.practice + learningProgress.quest + learningProgress.challenge) / 4
    ) + '%', label: 'Avg Progress', color: Colors.primary[500] },
  ];

  return (
    <View style={styles.container}>
      {/* Stats Grid - Hero Section */}
      <View style={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} wide={isWideScreen} />
        ))}
      </View>

      {/* Academic Identity Card */}
      <View style={[styles.card, styles.identityCard, { ...Shadows.md, borderColor: Colors.border.light }]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardIconWrapper}>
            <View style={[styles.cardIcon, { backgroundColor: Colors.primary[100] }]}>
              <Ionicons name="school-outline" size={20} color={Colors.primary[700]} />
            </View>
          </View>
          <View>
            <Text style={styles.cardTitle}>Identitas Akademik</Text>
            <Text style={styles.cardSubtitle}>Data mahasiswa & informasi mata kuliah</Text>
          </View>
        </View>

        <View style={styles.identityGrid}>
          {[
            { label: 'Nama Lengkap', value: identitasAkademik.nama, icon: 'person-outline' },
            { label: 'NIM', value: identitasAkademik.nim, icon: 'id-card-outline' },
            { label: 'Mata Kuliah', value: identitasAkademik.mataKuliah, icon: 'book-outline' },
            { label: 'Dosen Pengampu', value: identitasAkademik.dosen, icon: 'people-outline' },
          ].map((item, index) => (
            <View key={index} style={styles.identityItem}>
              <View style={styles.identityIconWrapper}>
                <Ionicons name={item.icon} size={17} color={Colors.primary[600]} />
              </View>
              <View style={styles.identityContent}>
                <Text style={styles.identityLabel}>{item.label}</Text>
                <Text style={styles.identityValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Learning Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconWrapper}>
            <View style={[styles.sectionIcon, { backgroundColor: Colors.accent[100] }]}>
              <Ionicons name="trending-up-outline" size={20} color={Colors.primary[700]} />
            </View>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Learning Progress</Text>
            <Text style={styles.sectionSubtitle}>Progress pembelajaran per kategori</Text>
          </View>
        </View>

        <View style={styles.progressGrid}>
          {progressItems.map((item, index) => (
            <ProgressRing
              key={item.label}
              progress={item.value}
              color={item.color}
              label={item.label}
              size={isWideScreen ? 88 : 78}
              strokeWidth={7}
              wide={isWideScreen}
            />
          ))}
        </View>
      </View>

      {/* Footer Note */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          Semester {identitasAkademik.semester} • {identitasAkademik.mataKuliah}
        </Text>
        <Text style={styles.footerText}>
          Dosen: {identitasAkademik.dosen}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing.xl,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  statCardWide: {
    minWidth: '22%',
  },

  statIconWrapper: {
    marginBottom: Spacing.sm,
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statIconText: {
    fontSize: 18,
  },

  statValue: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize.xxl * Typography.lineHeight.tight,
    marginBottom: Spacing.xs,
  },

  statLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },

  // Cards
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    overflow: 'hidden',
  },

  identityCard: {
    marginBottom: Spacing.lg,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  cardIconWrapper: {
    flexShrink: 0,
  },

  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardIconText: {
    fontSize: 20,
  },

  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: 2,
  },

  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
  },

  // Identity Grid
  identityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  identityItem: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  identityIconWrapper: {
    flexShrink: 0,
  },

  identityIcon: {
    fontSize: 20,
  },

  identityContent: {
    flex: 1,
    minWidth: 0,
  },

  identityLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.quaternary,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
    marginBottom: 2,
  },

  identityValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.normal,
  },

  // Progress Section
  progressSection: {
    marginBottom: Spacing.lg,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  sectionIconWrapper: {
    flexShrink: 0,
  },

  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionIconText: {
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: 2,
  },

  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
  },

  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },

  // Ring Styles
  ringContainer: {
    alignItems: 'center',
    flex: 1,
    minWidth: '40%',
  },
  ringContainerWide: {
    minWidth: '20%',
  },

  ringWrapper: {
    position: 'relative',
  },

  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ringValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.heavy,
    letterSpacing: Typography.letterSpacing.tight,
  },

  progressLabel: {
    marginTop: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    textAlign: 'center',
  },

  // Footer
  footerNote: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  footerText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
});

export default AcademicDashboard;
