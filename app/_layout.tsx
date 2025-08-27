import AppProvider from "@/providers/AppProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
  <AppProvider>
    <StatusBar barStyle={"dark-content"} />
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false
      }} />
    </Stack>
  </AppProvider>
  );
}
