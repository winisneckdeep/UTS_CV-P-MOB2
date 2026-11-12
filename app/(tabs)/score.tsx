import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AcademicDashboard from '../../components/AcademicDashboard';
import ScreenHeader from '../../components/ScreenHeader';
import academicData from '../../data/academicData.json';
import { Colors, Spacing, Layout } from '../../constants/design';

const Score = () => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="My Score" subtitle="Dashboard akademik & progress pembelajaran" icon="school-outline" />

        {/* Academic Dashboard */}
        <AcademicDashboard academicData={academicData} />
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
    padding: Layout.screenPadding,
    paddingBottom: Spacing.xxxl,
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
});

export default Score;
