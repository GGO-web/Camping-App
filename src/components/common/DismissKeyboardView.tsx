import React from 'react';
import { ScrollView } from 'react-native';

export function DismissKeyboardView({ children }: any) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
