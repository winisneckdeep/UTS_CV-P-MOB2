import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PortfolioCard from '../../components/PortfolioCard';
import ScreenHeader from '../../components/ScreenHeader';
import portfolioData from '../../data/portfolio.json';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../../constants/design';

const Portfolio = () => {
  const projects = portfolioData;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Portofolio" subtitle="Proyek-proyek yang telah dikerjakan" icon="briefcase-outline" />

        {/* Projects List */}
        <View style={styles.listContent}>
          {projects.map((project) => <PortfolioCard key={project.id} project={project} />)}
        </View>

        {/* Empty State / CTA */}
        {projects.length === 0 && (
          <View style={[styles.emptyCard, { ...Shadows.md, borderColor: Colors.border.light }]}>
            <View style={styles.emptyIconWrapper}>
              <View style={[styles.emptyIcon, { backgroundColor: Colors.primary[100] }]}>
                <Ionicons name="folder-outline" size={24} color={Colors.primary[700]} />
              </View>
            </View>
            <Text style={styles.emptyTitle}>Belum Ada Proyek</Text>
            <Text style={styles.emptySubtitle}>
              Tambahkan proyek baru di <Text style={styles.emptyCode}>data/portfolio.json</Text>
            </Text>
            <View style={styles.emptyAction}>
              <Text style={styles.emptyActionText}>Mulai bangun portofolio Anda hari ini!</Text>
            </View>
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
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },

  // List
  listContent: {
    paddingBottom: Spacing.xl,
  },

  // Empty State
  emptyCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: Spacing.xl,
  },

  emptyIconWrapper: {
    marginBottom: Spacing.md,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },

  emptyIconText: {
    fontSize: 36,
  },

  emptyTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },

  emptySubtitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
    textAlign: 'center',
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
    marginBottom: Spacing.lg,
  },

  emptyCode: {
    fontFamily: 'monospace',
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary[600],
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },

  emptyAction: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary[100],
  },

  emptyActionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary[700],
    textAlign: 'center',
  },
});

export default Portfolio;
