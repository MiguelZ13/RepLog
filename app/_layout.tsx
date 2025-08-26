import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
  <Stack>
    <StatusBar barStyle={"dark-content"} />
    <Stack.Screen name="(tabs)" options={{
      headerShown: false
    }} />
  </Stack>
  );
}
