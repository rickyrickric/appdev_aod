import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from './AppHeader';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const COLORS = {
  violet: '#462977',
  pink: '#D81B73',
  pinkSoft: '#FDE4F1',
  pinkMuted: '#F09CC2',
  mint: '#34B3A0',
  bg: '#F7F2FA',
  field: '#FAF7FD',
  border: '#E9DFF2',
  text: '#2E1B52',
  muted: '#6B5B8A',
  danger: '#C0203F',
};

const notify = (title, message) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

const EMPTY_FORM = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  course: '',
  studentId: '',
  phone: '',
  gender: '',
};

export default function StudentRegistrationForm({ navigation }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [notifications, setNotifications] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const found = {};
    if (!form.fullName.trim()) found.fullName = 'Full name is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.';
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword) found.confirmPassword = 'Please confirm your password.';
    else if (form.confirmPassword !== form.password) {
      found.confirmPassword = 'Passwords do not match.';
    }
    const age = Number(form.age);
    if (!form.age || age <= 0) found.age = 'Age is required.';
    if (!form.course.trim()) found.course = 'Course is required.';
    if (!form.studentId.trim()) found.studentId = 'Student ID is required.';
    if (form.phone && form.phone.replace(/\D/g, '').length < 11) {
      found.phone = 'Enter an 11-digit mobile number.';
    }
    if (!form.gender) found.gender = 'Select a gender.';
    return found;
  };
  const handleRegister = () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      notify('Incomplete form', 'Please review the highlighted fields.');
      return;
    }
    if (!agreed) {
      notify('Terms required', 'Please accept the Terms and Conditions to continue.');
      return;
    }
    navigation.navigate('Summary', {
      fullName: form.fullName,
      email: form.email,
      age: form.age,
      course: form.course,
      studentId: form.studentId,
      phone: form.phone,
      gender: form.gender,
      notifications,
    });
  };

  const renderInput = (key, label, options = {}) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[key] && styles.inputError]}
        placeholderTextColor="#A899BF"
        value={form[key]}
        onChangeText={(value) => setField(key, value)}
        {...options}
      />
      {errors[key] ? <Text style={styles.errorText}>{errors[key]}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Registration" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Student Registration Form</Text>

          {renderInput('fullName', 'Full Name', {
            placeholder: 'Juan Dela Cruz',
            autoCapitalize: 'words',
          })}

          {renderInput('email', 'Email Address', {
            placeholder: 'juan.delacruz@email.com',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,
          })}

          {renderInput('password', 'Password', {
            placeholder: 'Enter password',
            secureTextEntry: true,
            autoCapitalize: 'none',
          })}

          {renderInput('confirmPassword', 'Confirm Password', {
            placeholder: 'Re-enter password',
            secureTextEntry: true,
            autoCapitalize: 'none',
          })}

          {renderInput('age', 'Age', {
            placeholder: 'e.g. 20',
            keyboardType: 'number-pad',
            maxLength: 2,
          })}

          {renderInput('course', 'Course', { placeholder: 'BS Computer Science' })}

          {renderInput('studentId', 'Student ID', { placeholder: 'e.g. 2023-00123' })}

          {renderInput('phone', 'Phone Number', {
            placeholder: '09XXXXXXXXX',
            keyboardType: 'phone-pad',
            maxLength: 11,
          })}

          <View style={styles.field}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {GENDER_OPTIONS.map((option) => {
                const selected = form.gender === option;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[styles.genderOption, selected && styles.genderOptionSelected]}
                    onPress={() => setField('gender', option)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.genderText, selected && styles.genderTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
          </View>

          <View style={styles.rowField}>
            <Text style={styles.label}>Receive Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D5CCE4', true: COLORS.mint }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !agreed && styles.buttonDisabled]}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  flex: { flex: 1 },
  content: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.violet,
    marginBottom: 24,
  },

  field: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.field,
  },
  inputError: { borderColor: COLORS.danger },
  errorText: { fontSize: 12, color: COLORS.danger, marginTop: 5 },

  genderRow: { flexDirection: 'row', gap: 10 },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.field,
  },
  genderOptionSelected: {
    borderColor: COLORS.pink,
    backgroundColor: COLORS.pinkSoft,
  },
  genderText: { fontSize: 14, color: COLORS.muted },
  genderTextSelected: { color: COLORS.violet, fontWeight: '600' },

  rowField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.field,
  },
  checkboxChecked: { backgroundColor: COLORS.violet, borderColor: COLORS.violet },
  checkmark: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  checkboxLabel: { fontSize: 14, color: COLORS.text, flex: 1 },

  button: {
    backgroundColor: COLORS.pink,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: COLORS.pinkMuted },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
