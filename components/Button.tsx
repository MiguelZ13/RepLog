import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable, StyleSheet, View } from "react-native";

type ButtonProps = {
    action?: () => void
    type?: "add" | "remove"
}

export default function Button({action, type = "add"}: ButtonProps) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, {borderColor: type === "add" ? "teal" : "red"}]} onPress={action}>
                {type === "add" 
                    ? <FontAwesome6 name="add" size={24} color="teal" />
                    : <FontAwesome name="minus" size={20} color="red" />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        borderRadius: 15,
        borderWidth: 2,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})