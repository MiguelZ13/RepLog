import Button from "@/components/Button";
import Log from "@/components/log";
import { useData } from "@/hooks/useData";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Main() {
  const navigation = useNavigation();
  const router = useRouter();
  const { ...value } = useData();
  const { data, lastId, addWorkout, removeWorkout} = value
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Logs",
      headerTitleStyle: styles.header,
      headerRight: () => (<View style={{paddingRight: 10}}><Button action={
        () => {
          addWorkout();
          router.navigate({
            pathname: "/(tabs)/(home)/workoutLog/[id]",
            params: {id: lastId + 1}
          })
        }} /></View>)
    })
  }, [navigation, router, data, lastId, addWorkout])

  return (
    <View style={styles.container}>
      <FlatList data={data}
       keyExtractor={(item) => `Log-${item.id}`}
       renderItem={({item}) => <View style={styles.logContainer}>
        <Text>{item.id}</Text>
        <Log 
          date={item.date} 
          name={item.name}
          notes={item.note} 
          action={() => router.navigate({
            pathname: "/(tabs)/(home)/workoutLog/[id]",
            params: {id: item.id}
          })} />
        <Button type="remove" action={() => removeWorkout(item.id)} />
      </View>} />
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
    alignItems: "stretch",
    paddingVertical: 5
  },
  logContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    gap: 5
  }
})
