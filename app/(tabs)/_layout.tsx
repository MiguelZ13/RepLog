import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
    <Tabs screenOptions={{popToTopOnBlur:true,
        tabBarActiveTintColor: "teal"
        }}>
        <Tabs.Screen name="(home)" options={{
            title: "Home",
            tabBarIcon: ({color, size}) => (
                <FontAwesome 
                    name="home" 
                    size={size} 
                    color={color} />),
            headerShown: false}
        } />
        <Tabs.Screen name="routines" options={{
            title: "Routines",
            tabBarIcon: ({color, size}) => (
                <FontAwesome6 
                    name="dumbbell" 
                    size={size} 
                    color={color} />
            )
        }} />
        <Tabs.Screen name="settings" options={{
            title: "Settings",
            tabBarIcon: ({color, size}) => (
                <Ionicons 
                    name="settings" 
                    size={size} 
                    color={color} />)
        }} />
    </Tabs>
    );
}