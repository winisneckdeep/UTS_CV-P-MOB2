import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SkillCard from '../../components/SkillCard';
import ScreenHeader from '../../components/ScreenHeader';
import skillsData from '../../data/skills.json';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../../constants/design';

const Skills = () => {
  const skills = skillsData;

  const levelLegend = [
    { label: 'Advanced', color: Colors.secondary[500], range: '85-100%', bg: Colors.secondary[100] },
    { label: 'Intermediate', color: Colors.accent[500], range: '70-84%', bg: Colors.accent[100] },
    { label: 'Beginner', color: Colors.danger[500], range: '<70%', bg: Colors.danger[100] },
  ];

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Keterampilan" subtitle="Teknologi dan kemampuan yang dikuasai" icon="flash-outline" />

        {/* Skills List */}
        <View style={styles.listContent}>
          {skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
        </View>

        {/* Legend Section */}
        <View style={[styles.legendCard, { ...Shadows.md, borderColor: Colors.border.light }]}>
          <View style={styles.legendHeader}>
            <View style={[styles.legendIconWrapper, { backgroundColor: Colors.secondary[100] }]}>
              <Ionicons name="stats-chart-outline" size={20} color={Colors.secondary[700]} />
            </View>
            <View>
              <Text style={styles.legendTitle}>Legenda Level</Text>
              <Text style={styles.legendSubtitle}>Klasifikasi tingkat keahlian</Text>
            </View>
          </View>

          <View style={styles.legendItems}>
            {levelLegend.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendColorWrapper}>
                  <View style={[styles.legendColorDot, { backgroundColor: item.color }]} />
                  <View style={[styles.legendColorBar, { backgroundColor: item.bg }]} />
                </View>
                <View style={styles.legendTextWrapper}>
                  <Text style={[styles.legendLabel, { color: item.color }]}>{item.label}</Text>
                  <Text style={styles.legendRange}>{item.range}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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

  // Legend Card
  legendCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
  },

  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  legendIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  legendIcon: {
    fontSize: 20,
  },

  legendTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: 2,
  },

  legendSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
  },

  legendItems: {
    gap: Spacing.sm,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  legendColorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexShrink: 0,
  },

  legendColorDot: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
  },

  legendColorBar: {
    width: 40,
    height: 6,
    borderRadius: BorderRadius.full,
  },

  legendTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  legendLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    letterSpacing: Typography.letterSpacing.normal,
    marginBottom: 2,
  },

  legendRange: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.tertiary,
  },
});

export default Skills;
