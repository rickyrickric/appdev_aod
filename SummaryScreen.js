import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from './AppHeader';

const COLORS = {
  violet: '#462977',
  pink: '#D81B73',
  mint: '#34B3A0',
  mintSoft: '#E4F6F3',
  bg: '#F7F2FA',
  field: '#FAF7FD',
  border: '#E9DFF2',
  text: '#2E1B52',
  muted: '#6B5B8A',
};

const FIELDS = [
  ['Full Name', 'fullName'],
  ['Email Address', 'email'],
  ['Age', 'age'],
  ['Course', 'course'],
  ['Student ID', 'studentId'],
  ['Phone Number', 'phone'],
  ['Gender', 'gender'],
];

export default function SummaryScreen({ route, navigation }) {
  const student = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Summary" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Registration Summary</Text>
        <Text style={styles.intro}>Please review the details you submitted.</Text>

        <View style={styles.card}>
          {FIELDS.map(([label, key], index) => (
            <View
              key={key}
              style={[styles.row, index === FIELDS.length - 1 && styles.rowLast]}
            >
              <Text style={styles.rowLabel}>{label}</Text>
              <Text style={styles.rowValue}>{student[key] || '—'}</Text>
            </View>
          ))}
        </View>

        <View style={styles.badgeRow}>
          <View style={[styles.badge, student.notifications && styles.badgeOn]}>
            <Text
              style={[styles.badgeText, student.notifications && styles.badgeTextOn]}
            >
              {student.notifications ? 'Notifications on' : 'Notifications off'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile', { fullName: student.fullName })}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>VIEW PROFILE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonOutlineText}>BACK TO REGISTRATION</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
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
    marginBottom: 6,
  },
  intro: { fontSize: 14, color: COLORS.muted, marginBottom: 20 },

  card: {
    backgroundColor: COLORS.field,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 12,
    marginBottom: 12,
  },
  rowLast: { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  rowValue: { fontSize: 15, color: COLORS.text },

  badgeRow: { flexDirection: 'row', marginBottom: 24 },
  badge: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.field,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  badgeOn: { borderColor: COLORS.mint, backgroundColor: COLORS.mintSoft },
  badgeText: { fontSize: 13, fontWeight: '600', color: COLORS.muted },
  badgeTextOn: { color: COLORS.mint },

  button: {
    backgroundColor: COLORS.pink,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  buttonOutline: {
    borderWidth: 1,
    borderColor: COLORS.violet,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonOutlineText: { color: COLORS.violet, fontSize: 16, fontWeight: '700' },
});
