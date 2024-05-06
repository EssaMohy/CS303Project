import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      Options={{
        headerTransparent: true,
        headerStyle: { height: 0 },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ headerShown: false }} />
    </Stack>
  );
}
