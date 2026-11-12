import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../constants/design';

export default function ScreenHeader({ title, subtitle, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={26} color={Colors.primary[700]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.eyebrow}>PORTOFOLIO MAHASISWA</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxl,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[100],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  eyebrow: {
    color: Colors.primary[600],
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: Typography.letterSpacing.wider,
    marginBottom: 2,
  },
  title: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize.xl * Typography.lineHeight.tight,
  },
  subtitle: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
});
