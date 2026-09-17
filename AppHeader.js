import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = {
  violet: '#462977',
  white: '#FFFFFF',
};

export default function AppHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity
          style={styles.back}
          onPress={onBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.violet,
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  back: { marginRight: 14 },
  backIcon: { color: COLORS.white, fontSize: 22, lineHeight: 24 },
  title: { color: COLORS.white, fontSize: 17, fontWeight: '700' },
});
