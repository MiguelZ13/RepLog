import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
    const navigation = useNavigation();
    
        useLayoutEffect(() => {
            navigation.setOptions({
                headerTitle: "Settings",
                headerTitleStyle: styles.header,
            })
        }, [navigation])

    return (
        <View style={styles.container}>
            <Text>These are the </Text>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})