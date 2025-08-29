import Button from "@/components/Button";
import { useData } from "@/hooks/useData";
import { defaultWorkout } from "@/providers/DataProvider";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SectionList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type set = {
  weight: number,
  reps: number
}

type workoutProps = {
  title: string,
  data: set[]
}

export default function WorkoutLog() {
  const { id } = useLocalSearchParams();
  const { ...value } = useData();
  const { getWorkout } = value;

  const day = getWorkout(Number(id)) ?? defaultWorkout;

  const [workouts, setWorkouts] = useState<workoutProps[]>(day.workouts);
  const [title, setTitle] = useState(day.name);
  const [notes, setNotes] = useState(day.note);

  const updateSet = (sectionIndex: number, itemIndex: number, field: "weight" | "reps", value: string) => {
    setWorkouts(prev => {
      const newWorkouts = [...prev];
      const updatedSection = { ...newWorkouts[sectionIndex] };
      const updatedData = [...updatedSection.data];
      updatedData[itemIndex] = { ...updatedData[itemIndex], [field]: Number(value) || 0 };
      updatedSection.data = updatedData;
      newWorkouts[sectionIndex] = updatedSection;
      return newWorkouts;
    });
  };

  const updateTitle = (sectionIndex: number, value: string) => {
    setWorkouts(prev => {
      const newWorkouts = [...prev];
      newWorkouts[sectionIndex] = { ...newWorkouts[sectionIndex], title: value };
      return newWorkouts;
    });
  };

  const addSet = (sectionIndex: number) => {
    setWorkouts(prev => {
      const newWorkouts = [...prev];
      const updatedSection = { ...newWorkouts[sectionIndex]};
      let updatedData = [...updatedSection.data];
      updatedData = [...updatedData, {weight: 0, reps: 0}];
      updatedSection.data = updatedData;
      newWorkouts[sectionIndex] = updatedSection;
      return newWorkouts;
    })
  }

  const removeSet = (sectionIndex: number, itemIndex: number) => {
    setWorkouts(prev => {
      const newWorkouts = [...prev];
      const updatedSection = {...newWorkouts[sectionIndex]};
      let updatedData = [...updatedSection.data];
      updatedData = updatedData.filter((_, index) => index !== itemIndex);
      updatedSection.data = updatedData;
      newWorkouts[sectionIndex] = updatedSection;
      return newWorkouts;
    })
  }

  return (
    <SafeAreaView>
      <TextInput 
        style={styles.nameInput}
        placeholder="Name"
        onChangeText={newName => setTitle(newName)}
        value={title} />

      <Text style={styles.date}>{day.date}</Text>

      <SectionList sections={workouts}
        keyExtractor={(index) => `workout-${index}`}

        renderItem={({ item, index, section }) => {
          const sectionIndex = workouts.findIndex(s => s === section);
          return (
          <View style={styles.setContainer}>
            <TextInput 
              style={styles.set}
              placeholder="weight"
              keyboardType="numeric"
              onChangeText={text => updateSet(sectionIndex, index, "weight", text)}
              value={item.weight !== 0 ? item.weight.toString() : undefined} />
            <Text style={styles.set}>:</Text>
            <TextInput 
              style={styles.set}
              placeholder="reps"
              keyboardType="numeric" 
              onChangeText={text => updateSet(sectionIndex, index, "reps", text)}
              value={item.reps !== 0 ? item.reps.toString() : undefined} />
            <Button type="remove" action={() => removeSet(sectionIndex, index)} />
          </View>
        )}}

        renderSectionHeader={({ section }) => {
          const sectionIndex = workouts.findIndex(s => s === section)
          return (
            <TextInput 
              style={styles.excerciseName}
              placeholder="name"
              onChangeText={text => updateTitle(sectionIndex, text)}
              value={section.title} />
          )
        }}
        
        renderSectionFooter={({ section }) => {
          const sectionIndex = workouts.findIndex(s => s === section);
          return (
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Button action={() => addSet(sectionIndex)} />
            </View>
          )
        }} />

      <TextInput
        placeholder="Notes"
        onChangeText={newNotes => setNotes(newNotes)}
        value={notes} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  nameInput: {
    padding: 12,
    paddingBottom: 0,
    fontSize: 64,
    fontWeight: "bold",
  },
  date: {
    paddingBottom: 16,
    paddingLeft: 12,
    fontSize: 32,
    fontWeight: "semibold",
    color: "black",
    textDecorationLine: "underline"
  }, 
  excerciseName: {
    padding: 12,
    fontSize: 24
  },
  setContainer: {
    backgroundColor: "#b9c1c9",
    flexDirection: "row",
    flex: 1,
    padding: 12,
    margin: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  set: {
    width: 64,
    textAlign: "center", 
    fontSize: 18,
  }
})
