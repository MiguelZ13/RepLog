import Button from "@/components/Button";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Routines() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Routines",
            headerTitleStyle: styles.header,
            headerRight: () => (<View style={{paddingRight: 10}}><Button action={() => alert("a")} /></View>)
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text>These are routines</Text>
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
