import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../constants/design';

const PortfolioCard = ({ project }) => {
  const techStack = project.tech.split(', ').slice(0, 3);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Header with tech badge */}
        <View style={styles.header}>
          <View style={styles.techBadge}>
            <Ionicons name="rocket-outline" size={18} color={Colors.primary[700]} />
          </View>
          <View style={styles.techTags}>
            {techStack.map((tech, index) => (
              <View key={index} style={styles.techTag}>
                <Text style={styles.techTagText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {project.title}
        </Text>

        {/* Description */}
        <Text style={styles.desc} numberOfLines={3}>
          {project.desc}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerLabel}>Project overview</Text>
          </View>
          <View style={styles.projectMark}>
            <Text style={styles.projectMarkText}>APP</Text>
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
    marginBottom: Spacing.sm,
    ...Shadows.xs,
    borderWidth: 1,
    borderColor: Colors.border.light,
    overflow: 'hidden',
    position: 'relative',
  },

  content: {
    position: 'relative',
    zIndex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  techBadge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },

  techBadgeText: {
    fontSize: 16,
  },

  techTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },

  techTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neutral[100],
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  techTagText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.wide,
  },

  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize.xl * Typography.lineHeight.tight,
    marginBottom: Spacing.sm,
  },

  desc: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
    lineHeight: Typography.fontSize.md * Typography.lineHeight.relaxed,
    marginBottom: Spacing.md,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },

  footerLeft: {
    flex: 1,
  },

  footerLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.primary[600],
    letterSpacing: Typography.letterSpacing.wide,
  },

  projectMark: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
  },

  projectMarkText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary[700],
  },
});

export default PortfolioCard;
