import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import ProfileHeader from '../../components/ProfileHeader';
import profileData from '../../data/profile.json';
import skillsData from '../../data/skills.json';
import portfolioData from '../../data/portfolio.json';
import academicData from '../../data/academicData.json';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../../constants/design';

const Home = () => {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 720;
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [menuSizes, setMenuSizes] = useState<Record<string, { width: number; height: number }>>({});
  const profile = profileData;

  const quickActions = [
    { title: 'Tentang Saya', route: '/about', icon: 'person-outline' },
    { title: 'Keterampilan', route: '/skills', icon: 'flash-outline' },
    { title: 'Portofolio', route: '/portfolio', icon: 'briefcase-outline' },
    { title: 'My Score', route: '/score', icon: 'school-outline' },
    { title: 'Kontak', route: '/contact', icon: 'chatbubble-outline' },
  ] as const;

  const stats = [
    { value: skillsData.length, label: 'Keterampilan', icon: 'flash-outline', color: Colors.primary[600], bgColor: Colors.primary[50] },
    { value: portfolioData.length, label: 'Proyek', icon: 'briefcase-outline', color: Colors.primary[600], bgColor: Colors.primary[50] },
    { value: academicData.currentScore.nilai, label: 'Nilai UTS', icon: 'school-outline', color: Colors.primary[600], bgColor: Colors.primary[50] },
    { value: academicData.learningPoints.total.toLocaleString('id-ID'), label: 'Learning Points', icon: 'star-outline', color: Colors.primary[600], bgColor: Colors.primary[50] },
  ] as const;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader profile={profile} />

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Menu Utama</Text>
            <Text style={styles.sectionSubtitle}>Akses cepat ke fitur aplikasi</Text>
          </View>
          <View style={[styles.menuList, isWideScreen && styles.menuListWide]}>
            {quickActions.map((action) => {
              const isActive = activeMenuItem === action.route;

              return (
                <Link key={action.route} href={action.route} asChild>
                  <Pressable
                    onLayout={({ nativeEvent }) => {
                      const { width: itemWidth, height: itemHeight } = nativeEvent.layout;
                      setMenuSizes((current) => {
                        const previous = current[action.route];
                        if (previous?.width === itemWidth && previous?.height === itemHeight) return current;
                        return { ...current, [action.route]: { width: itemWidth, height: itemHeight } };
                      });
                    }}
                    onHoverIn={() => setActiveMenuItem(action.route)}
                    onHoverOut={() => setActiveMenuItem(null)}
                    onPressIn={() => setActiveMenuItem(action.route)}
                    onPressOut={() => setActiveMenuItem(null)}
                    style={StyleSheet.flatten([styles.menuItem, isActive && styles.menuItemActive])}
                  >
                    {isActive && (
                      <Svg
                        width={menuSizes[action.route]?.width ?? 1}
                        height={menuSizes[action.route]?.height ?? 1}
                        viewBox={`0 0 ${menuSizes[action.route]?.width ?? 1} ${menuSizes[action.route]?.height ?? 1}`}
                        style={styles.menuGradient}
                        preserveAspectRatio="none"
                      >
                        <Defs>
                          <LinearGradient
                            id={`menuGradient-${action.route.slice(1)}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <Stop offset="0%" stopColor={Colors.gradients.dark[0]} />
                            <Stop offset="100%" stopColor={Colors.gradients.dark[1]} />
                          </LinearGradient>
                        </Defs>
                        <Rect
                          width={menuSizes[action.route]?.width ?? 1}
                          height={menuSizes[action.route]?.height ?? 1}
                          fill={`url(#menuGradient-${action.route.slice(1)})`}
                        />
                      </Svg>
                    )}
                    <View style={styles.menuContent}>
                      <Ionicons
                        name={action.icon}
                        size={20}
                        color={isActive ? Colors.text.inverse : Colors.primary[600]}
                      />
                      <Text style={[styles.menuTitle, isActive && styles.menuTitleActive]}>
                        {action.title}
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={isActive ? Colors.text.inverse : Colors.primary[600]}
                      />
                    </View>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ringkasan</Text>
            <Text style={styles.sectionSubtitle}>Statistik profil singkat</Text>
          </View>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={[
                  styles.statCard,
                  isWideScreen && styles.statCardWide,
                  { ...Shadows.sm, borderColor: Colors.border.light },
                ]}
              >
                <View style={[styles.statIconWrapper, { backgroundColor: `${stat.color}15` }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {portfolioData[0] && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Proyek Unggulan</Text>
              <Text style={styles.sectionSubtitle}>Salah satu proyek dalam portofolio</Text>
            </View>
            <Link href="/portfolio" asChild>
              <Pressable style={styles.featuredProject}>
                <View style={styles.featuredProjectIcon}>
                  <Ionicons name="rocket-outline" size={22} color={Colors.primary[700]} />
                </View>
                <View style={styles.featuredProjectContent}>
                  <Text style={styles.featuredProjectTitle} numberOfLines={1}>
                    {portfolioData[0].title}
                  </Text>
                  <Text style={styles.featuredProjectDescription} numberOfLines={2}>
                    {portfolioData[0].desc}
                  </Text>
                  <Text style={styles.featuredProjectTech} numberOfLines={1}>
                    {portfolioData[0].tech}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary[600]} />
              </Pressable>
            </Link>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  menuList: {
    gap: Spacing.sm,
  },
  menuListWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    minHeight: 52,
    flexGrow: 1,
    flexBasis: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
  },
  menuItemActive: {
    borderColor: Colors.primary[700],
  },
  menuGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    zIndex: 1,
  },
  menuTitle: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.normal,
  },
  menuTitleActive: {
    color: Colors.text.inverse,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  statCardWide: {
    minWidth: '22%',
  },
  statIconWrapper: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statIconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.heavy,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize.lg * Typography.lineHeight.tight,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  featuredProject: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
    ...Shadows.sm,
  },
  featuredProjectIcon: {
    width: 44,
    height: 44,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary[100],
  },
  featuredProjectContent: {
    flex: 1,
    minWidth: 0,
  },
  featuredProjectTitle: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  featuredProjectDescription: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    marginBottom: Spacing.xs,
  },
  featuredProjectTech: {
    color: Colors.primary[700],
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },
});

export default Home;
