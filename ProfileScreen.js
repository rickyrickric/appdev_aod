import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from './AppHeader';

const COLORS = {
  violet: '#462977',
  pink: '#D81B73',
  pinkSoft: '#FDE4F1',
  pinkMuted: '#F09CC2',
  bg: '#F7F2FA',
  field: '#FAF7FD',
  border: '#E9DFF2',
  text: '#2E1B52',
  muted: '#6B5B8A',
};

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export default function ProfileScreen({ route, navigation }) {
  const fullName = route.params?.fullName || 'Student';
  const firstName = fullName.trim().split(/\s+/)[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Profile" onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials(fullName)}</Text>
        </View>

        <Text style={styles.welcome}>Welcome, {firstName}!</Text>
        <Text style={styles.subtitle}>Welcome to the Student Portal.</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registration complete</Text>
          <Text style={styles.cardBody}>
            Your registration has been successfully submitted. You can review the
            details you sent at any time.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>VIEW REGISTRATION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.popTo('Registration')}
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

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.pinkSoft,
    borderWidth: 1,
    borderColor: COLORS.pinkMuted,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: COLORS.pink },

  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.violet,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.field,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardBody: { fontSize: 14, lineHeight: 21, color: COLORS.muted },

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
