import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows, Layout } from '../constants/design';
import ScreenHeader from './ScreenHeader';
import profileData from '../data/profile.json';

const ContactForm = () => {
  const useNativeDriver = Platform.OS !== 'web';
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const submitAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.pesan.trim()) {
      newErrors.pesan = 'Pesan wajib diisi';
    } else if (formData.pesan.trim().length < 10) {
      newErrors.pesan = 'Pesan minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setTouched({ nama: true, email: true, pesan: true });
      // Shake animation on error
      Animated.sequence([
        Animated.timing(submitAnim, { toValue: 1, duration: 50, useNativeDriver }),
        Animated.timing(submitAnim, { toValue: 0, duration: 50, useNativeDriver }),
        Animated.timing(submitAnim, { toValue: 1, duration: 50, useNativeDriver }),
        Animated.timing(submitAnim, { toValue: 0, duration: 50, useNativeDriver }),
      ]).start();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Submit animation
    Animated.timing(submitAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver,
    }).start();

    // The assignment does not require email delivery or server storage.
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    Animated.timing(submitAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver,
    }).start();

    setSubmitStatus('success');
    Animated.timing(successAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver,
    }).start();
    setFormData({ nama: '', email: '', pesan: '' });
    setTouched({});
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const inputFields = [
    {
      name: 'nama',
      label: 'Nama Lengkap',
      placeholder: 'Masukkan nama lengkap Anda',
      icon: 'person-outline',
      autoCapitalize: 'words',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'contoh@email.com',
      icon: 'mail-outline',
      keyboardType: 'email-address',
      autoCapitalize: 'none',
    },
    {
      name: 'pesan',
      label: 'Pesan',
      placeholder: 'Tulis pesan Anda di sini...',
      icon: 'chatbubble-outline',
      multiline: true,
      numberOfLines: 5,
      autoCapitalize: 'sentences',
    },
  ];

  const getInputStyle = (field) => {
    const hasError = touched[field] && errors[field];
    const isFocused = focusedField === field;

    if (hasError) return styles.inputError;
    if (isFocused) return styles.inputFocused;
    return styles.inputDefault;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <ScreenHeader title="Hubungi Saya" subtitle="Kirim pesan dan saya akan merespons secepatnya" icon="mail-outline" />

        {/* Status Banners */}
        {submitStatus === 'success' && <Animated.View
          style={[
            styles.statusBanner,
            styles.statusBannerSuccess,
            { transform: [{ scale: successAnim }, { translateY: successAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], opacity: successAnim },
          ]}
        >
          <View style={styles.statusContent}>
            <View style={styles.statusIconWrapper}>
              <View style={[styles.statusIcon, { backgroundColor: Colors.secondary[100] }]}>
                <Text style={styles.statusIconText}>✓</Text>
              </View>
            </View>
            <Text style={styles.statusText}>
              Formulir berhasil diproses. Pengiriman email belum dihubungkan.
            </Text>
          </View>
        </Animated.View>}

        {/* Form */}
        <View style={[styles.formCard, { ...Shadows.md, borderColor: Colors.border.light }]}>
          {inputFields.map((field) => (
            <View key={field.name} style={styles.fieldWrapper}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>{field.label}</Text>
                <Text style={styles.requiredMark}>*</Text>
              </View>

              <View style={[
                styles.inputWrapper,
                getInputStyle(field.name),
              ]}>
                <Ionicons name={field.icon} size={18} color={Colors.primary[600]} style={styles.inputIcon} />
                <TextInput
                  style={[
                    styles.input,
                    field.multiline && styles.textArea,
                  ]}
                  placeholder={field.placeholder}
                  placeholderTextColor={Colors.text.quaternary}
                  value={formData[field.name]}
                  onChangeText={(value) => handleChange(field.name, value)}
                  onBlur={() => handleBlur(field.name)}
                  onFocus={() => handleFocus(field.name)}
                  keyboardType={field.keyboardType}
                  multiline={field.multiline}
                  numberOfLines={field.numberOfLines}
                  textAlignVertical={field.multiline ? 'top' : 'center'}
                  autoCapitalize={field.autoCapitalize}
                  autoCorrect={false}
                  disabled={isSubmitting}
                  autoComplete={field.name === 'email' ? 'email' : field.name === 'nama' ? 'name' : 'off'}
                />
              </View>

              {Boolean(touched[field.name] && errors[field.name]) && (
                <Animated.View
                  style={styles.errorWrapper}
                >
                  <View style={styles.errorRow}>
                    <Ionicons name="alert-circle-outline" size={16} color={Colors.danger[600]} />
                    <Text style={styles.errorText}>{errors[field.name]}</Text>
                  </View>
                </Animated.View>
              )}
            </View>
          ))}

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
              { transform: [{ scale: submitAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.98] }) }] },
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.9}
          >
            <Animated.View style={styles.buttonContent}>
              {isSubmitting ? (
                <View style={styles.buttonLoading}>
                  <View style={styles.spinner} />
                  <Text style={styles.submitButtonTextLoading}>Mengirim...</Text>
                </View>
              ) : (
                <View style={styles.buttonDefault}>
                  <Text style={styles.submitButtonText}>Kirim Pesan</Text>
                  <View style={styles.buttonArrowWrapper}>
                    <Text style={styles.buttonArrow}>→</Text>
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Contact Info Section */}
        <View style={[styles.infoCard, { ...Shadows.md, borderColor: Colors.border.light }]}>
          <View style={styles.infoHeader}>
            <View style={[styles.infoIconWrapper, { backgroundColor: Colors.secondary[100] }]}>
              <Ionicons name="location-outline" size={20} color={Colors.primary[700]} />
            </View>
            <View>
              <Text style={styles.infoTitle}>Informasi Kontak</Text>
              <Text style={styles.infoSubtitle}>Cara lain untuk menghubungi saya</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            {[
              { icon: 'mail-outline', label: 'Email', value: profileData.kontak.email, color: Colors.primary[500] },
              { icon: 'call-outline', label: 'WhatsApp', value: profileData.kontak.whatsapp, color: Colors.primary[500] },
              { icon: 'location-outline', label: 'Lokasi', value: profileData.kontak.lokasi, color: Colors.primary[500] },
            ].map((item, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={[styles.infoItemIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={17} color={item.color} />
                </View>
                <View style={styles.infoItemContent}>
                  <Text style={styles.infoItemLabel}>{item.label}</Text>
                  <Text style={styles.infoItemValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  // Status Banners
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },

  statusBannerSuccess: {
    backgroundColor: Colors.secondary[50],
    borderWidth: 1,
    borderColor: Colors.secondary[100],
  },

  statusBannerError: {
    backgroundColor: Colors.danger[50],
    borderWidth: 1,
    borderColor: Colors.danger[100],
  },

  statusContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },

  statusIconWrapper: {
    flexShrink: 0,
    marginTop: 2,
  },

  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusIconText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.secondary[600],
  },

  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.secondary[700],
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },

  // Form Card
  formCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },

  fieldWrapper: {
    marginBottom: Spacing.md,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },

  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.normal,
  },

  requiredMark: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.danger[500],
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },

  inputDefault: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  inputFocused: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 2,
    borderColor: Colors.primary[500],
    ...Shadows.xs,
  },

  inputError: {
    backgroundColor: Colors.danger[50],
    borderWidth: 1,
    borderColor: Colors.danger[300],
  },

  inputIcon: {
    fontSize: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },

  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingRight: Spacing.md,
  },

  textArea: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    minHeight: 120,
  },

  errorWrapper: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  errorIcon: {
    fontSize: 12,
  },

  errorText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.danger[600],
  },

  // Submit Button
  submitButton: {
    backgroundColor: Colors.primary[600],
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    ...Shadows.md,
    minHeight: 56,
  },

  submitButtonDisabled: {
    backgroundColor: Colors.primary[300],
    ...Shadows.none,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },

  submitButtonText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    letterSpacing: Typography.letterSpacing.wide,
  },

  submitButtonTextLoading: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
    letterSpacing: Typography.letterSpacing.wide,
  },

  buttonArrowWrapper: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.overlay.light,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonArrow: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.inverse,
  },

  spinner: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.overlay.medium,
    borderTopColor: Colors.text.inverse,
  },

  // Info Card
  infoCard: {
    backgroundColor: Colors.background.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
  },

  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },

  infoIconWrapper: {
    flexShrink: 0,
  },

  infoIcon: {
    fontSize: 22,
  },

  infoTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.tight,
    marginBottom: 2,
  },

  infoSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    color: Colors.text.tertiary,
  },

  infoGrid: {
    gap: Spacing.sm,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.sm,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  infoItemIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },

  infoItemIconText: {
    fontSize: 18,
  },

  infoItemContent: {
    flex: 1,
    minWidth: 0,
  },

  infoItemLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text.quaternary,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wider,
    marginBottom: 2,
  },

  infoItemValue: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.normal,
  },
});

export default ContactForm;
