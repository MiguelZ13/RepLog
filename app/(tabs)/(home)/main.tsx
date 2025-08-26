import Button from "@/components/Button";
import Log from "@/components/log";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Main() {
  const navigation = useNavigation();
  const router = useRouter();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Logs",
      headerTitleStyle: styles.header,
      headerRight: () => (<View style={{paddingRight: 10}}><Button action={() => router.push("/(tabs)/(home)/workoutLog")} /></View>)
    })
  }, [navigation, router])

  const days = [{date: "8/14/25", name: "Pull Day"}]

  return (
    <View style={styles.container}>
      <FlatList data={days} renderItem={({item}) => <Log date={item.date} name={item.name} />} />
    </View>
  );
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
