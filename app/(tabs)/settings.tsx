import { useData } from "@/hooks/useData";
import { useSettings } from "@/hooks/useSettings";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
    const navigation = useNavigation();
    const { ...Settings } = useSettings();
    const { settings, updateSettings } = Settings;
    const { ...values } = useData();
    const { clearWorkouts } = values;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Settings",
            headerTitleStyle: styles.header,
        })
    }, [navigation])

    return (

        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text>Warn before deleting</Text>
                <Switch
                    onValueChange={() => 
                    updateSettings({deleteWarning: !settings.deleteWarning})}
                    value={settings.deleteWarning} />
            </View>
            <Pressable onPress={clearWorkouts}>
                <Text>Clear Data</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        fontWeight: "bold"
    },
    container: {
        backgroundColor: "white",
        flex: 1
    },
    settingsContainer: {
        marginHorizontal: 5,
        marginVertical: 20,
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    }
})