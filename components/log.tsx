import { Pressable, StyleSheet, Text, View } from "react-native";

type LogProps = {
    action: () => void;
    date: string,
    name: string,
    notes: string
}

export default function Log({action, date, name, notes}: LogProps) {
    return (
    <Pressable onPress={action} style={styles.container}>
        <View style={{flex:1, flexDirection:"row", alignItems: "center"}}>
            <Text style={styles.date}>{date}: </Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        <Text>Summary: </Text>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 100,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#AFEEEE",
        justifyContent: "center",
        flex: 1,
        padding: 20,
        marginVertical: 10
    },
    date: {
        fontSize: 24,
        fontWeight: "bold",
    },
    name: {
        fontSize: 28
    }
})
