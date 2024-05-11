import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" />
      <Stack.Screen name="AddAdminScreen" />
      <Stack.Screen name="AllUsersScreen" />
      <Stack.Screen name="AddProductScreen" />
      <Stack.Screen name="DeleteUserScreen" />
      <Stack.Screen name="EditProductScreen" />
      <Stack.Screen name="DeleteProductScreen" />
    </Stack>
  );
};

export default StackLayout;
