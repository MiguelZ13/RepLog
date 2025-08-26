import { StyleSheet, Text, View } from "react-native";

type LogProps = {
    date: string,
    name: string,
}

export default function Log({date, name}: LogProps) {
    return (
    <View style={styles.container}>
        <View style={{flex:1, flexDirection:"row", alignItems: "center"}}>
            <Text style={styles.date}>{date}: </Text>
            <Text style={styles.name}>{name}</Text>
        </View>
        <Text>Summary: </Text>
    </View>
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
