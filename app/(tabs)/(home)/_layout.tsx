import { Stack } from "expo-router";

export default function IndexStackLayout() {
    return (
        <Stack>
            <Stack.Screen name="main" />
            <Stack.Screen name="workoutLog/[id]" options={{headerShown:false}} />
            <Stack.Screen name="workoutSearch" />
        </Stack>
    )
}