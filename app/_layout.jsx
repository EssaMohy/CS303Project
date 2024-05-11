import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)"  />
      <Stack.Screen name="(authenticate)"  />
      <Stack.Screen name="(admin)"  />
      <Stack.Screen name="index"  />
      <Stack.Screen name="[id]" options={{ headerShown: true, headerTitle:'Category Details' }} />
      <Stack.Screen name="ProductDetials"  />
    </Stack>
  );
};

export default StackLayout;