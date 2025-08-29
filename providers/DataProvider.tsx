import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useMemo, useState } from "react";

type set = {
  weight: number;
  reps: number;
};

type workout= {
  title: string;
  data: set[];
};

type Data = {
  id: number;
  name: string;
  date: string;
  workouts: workout[];
  note: string;
};

const defaultWorkout: Data = {
  id: 0,
  name: "",
  date: "",
  workouts: [{
    title: "",
    data: [{weight: 0, reps: 0}]
  }],
  note: ""
};

const defaultData: Data[] = [defaultWorkout]

type DataContextType = {
  getWorkout: (id: number) => Data | null;
  addWorkout: () => void;
  updateWorkout: (workout: Data) => void;
}

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider(children: React.ReactNode) {
  const [data, setData] = useState<Data[]>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("app_data");
        setData(jsonData != null ? JSON.parse(jsonData) : defaultData)
      } catch (e) {
        console.error(`Error Loading Data: ${e}`)
      }
    }
    loadData();
  }, [])

  const value = useMemo(() => ({
    getWorkout: (id: number) => 
      data.find((d) => d.id === id) ?? null,
    addWorkout: () => (
      setData((prev) => {
        const newWorkout = {...defaultWorkout, id: prev.length};
        const updated = [...prev, newWorkout];
        AsyncStorage.setItem(`app_data`, JSON.stringify(updated));
        return updated
      })
    ),
    updateWorkout: (workout: Data) => (
      setData((prev) => {
        const updated = prev.map((d) => {
          if (d.id === workout.id) {
            return workout;
          } else {
            return d;
          }
        });
        AsyncStorage.setItem(`app_data`, JSON.stringify(updated))
        return updated;
      }))
  }), [data])

  return (
    <DataContext value={value}>
      {children}
    </DataContext>
  )
}