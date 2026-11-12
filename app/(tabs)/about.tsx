import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';
import profileData from '../../data/profile.json';
import academicData from '../../data/academicData.json';
import skillsData from '../../data/skills.json';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../../constants/design';

const About = () => {
  const [profileCardSize, setProfileCardSize] = useState({ width: 1, height: 1 });
  const details = [
    { label: 'NIM', value: profileData.nim, icon: 'id-card-outline', color: Colors.primary[600] },
    { label: 'Semester', value: academicData.identitasAkademik.semester, icon: 'calendar-outline', color: Colors.accent[600] },
    { label: 'Fakultas', value: profileData.fakultas, icon: 'business-outline', color: Colors.secondary[600] },
    { label: 'Program Studi', value: profileData.prodi, icon: 'book-outline', color: Colors.accent[600] },
    { label: 'Mata Kuliah', value: academicData.identitasAkademik.mataKuliah, icon: 'school-outline', color: Colors.primary[600] },
    { label: 'Dosen Pengampu', value: academicData.identitasAkademik.dosen, icon: 'person-outline', color: Colors.danger[600] },
  ] as const;

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Tentang Saya" subtitle="Profil pribadi dan informasi akademik" icon="person-outline" />

        <View
          style={[styles.profileCard, Shadows.sm]}
          onLayout={({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout;
            setProfileCardSize((current) =>
              current.width === width && current.height === height ? current : { width, height }
            );
          }}
        >
          <Svg
            width={profileCardSize.width}
            height={profileCardSize.height}
            viewBox={`0 0 ${profileCardSize.width} ${profileCardSize.height}`}
            style={styles.profileGradient}
            preserveAspectRatio="none"
            pointerEvents="none"
          >
            <Defs>
              <LinearGradient id="aboutProfileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={Colors.gradients.dark[0]} />
                <Stop offset="100%" stopColor={Colors.gradients.dark[1]} />
              </LinearGradient>
            </Defs>
            <Rect width={profileCardSize.width} height={profileCardSize.height} fill="url(#aboutProfileGradient)" />
          </Svg>
          <View style={styles.profileContent}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('../../assets/WhatsApp Image 2026-11-07 at 10.22.48.jpeg')}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.name}>{profileData.nama}</Text>
            <Text style={styles.profession}>{profileData.profesi}</Text>
            <Text style={styles.description}>{profileData.deskripsi}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: Colors.primary[100] }]}>
              <Ionicons name="school-outline" size={18} color={Colors.primary[700]} />
            </View>
            <View style={styles.cardHeading}>
              <Text style={styles.cardTitle}>Informasi Akademik</Text>
              <Text style={styles.cardSubtitle}>Data profil perkuliahan</Text>
            </View>
          </View>

          <View style={styles.detailList}>
            {details.map((item) => (
              <View key={item.label} style={styles.detailRow}>
                <View style={[styles.detailIcon, { backgroundColor: `${item.color}18` }]}>
                  <Ionicons name={item.icon} size={17} color={item.color} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: Colors.secondary[100] }]}>
              <Ionicons name="construct-outline" size={18} color={Colors.secondary[700]} />
            </View>
            <View style={styles.cardHeading}>
              <Text style={styles.cardTitle}>Fokus Keahlian</Text>
              <Text style={styles.cardSubtitle}>Keterampilan dari profil</Text>
            </View>
          </View>
          <View style={styles.skillTags}>
            {skillsData.map((skill, index) => (
              <View
                key={skill.id}
                style={[
                  styles.skillTag,
                  { backgroundColor: tagColors[index % tagColors.length].backgroundColor },
                ]}
              >
                <Text style={[styles.skillTagText, { color: tagColors[index % tagColors.length].color }]}>
                  {skill.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const tagColors = [
  { backgroundColor: Colors.primary[50], color: Colors.primary[700] },
  { backgroundColor: Colors.secondary[50], color: Colors.secondary[700] },
  { backgroundColor: Colors.accent[50], color: Colors.accent[700] },
  { backgroundColor: Colors.danger[50], color: Colors.danger[700] },
];

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
  profileCard: {
    alignItems: 'center',
    backgroundColor: Colors.gradients.dark[0],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary[700],
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  profileGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  profileContent: {
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  avatarWrap: {
    width: 76,
    height: 76,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.card,
    borderWidth: 3,
    borderColor: Colors.background.card,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.full,
  },
  name: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  profession: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    color: Colors.text.inverse,
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.light,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeading: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  cardSubtitle: {
    color: Colors.text.tertiary,
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  detailList: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    color: Colors.text.quaternary,
    fontSize: 10,
    fontWeight: Typography.fontWeight.semiBold,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
  },
  detailValue: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 2,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillTag: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  skillTagText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },
});

export default About;
