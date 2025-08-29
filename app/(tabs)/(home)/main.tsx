import Button from "@/components/Button";
import Log from "@/components/log";
import { useData } from "@/hooks/useData";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Main() {
  const navigation = useNavigation();
  const router = useRouter();
  const { ...value } = useData();
  const { data, addWorkout} = value
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Logs",
      headerTitleStyle: styles.header,
      headerRight: () => (<View style={{paddingRight: 10}}><Button action={
        () => {
          addWorkout();
          router.navigate({
            pathname: "/(tabs)/(home)/workoutLog/[id]",
            params: {id: data.length - 1}
          })
        }} /></View>)
    })
  }, [navigation, router, data, addWorkout])

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({item}) => <Log 
        date={item.date} 
        name={item.name} 
        action={() => router.navigate({
          pathname: "/(tabs)/(home)/workoutLog/[id]",
          params: {id: item.id}
        })} />} />
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
