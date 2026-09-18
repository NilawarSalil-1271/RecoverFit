import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'RecoverFit',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="check-in"
        options={{
          title: 'Daily Check-in',
        }}
      />

      <Stack.Screen
        name="progress"
        options={{
          title: 'Progress',
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />

      <Stack.Screen
        name="recovery-result"
        options={{
          title: 'Recovery Result',
        }}
      />
    </Stack>
  );
}