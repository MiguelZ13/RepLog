import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from "react";

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

export const defaultWorkout: Data = {
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
  data: Data[]
  getWorkout: (id: number) => Data | null;
  addWorkout: () => void;
  updateWorkout: (workout: Data) => void;
  removeWorkout: (id: number) => void;
}

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children }: PropsWithChildren) {
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
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        const newWorkout = {...defaultWorkout, id: prev.length, date: formattedDate};
        const updated = [...prev, newWorkout];
        AsyncStorage.setItem(`app_data`, JSON.stringify(updated));
        return updated
      })
    ),
    updateWorkout: (workout: Data) => (
      setData((prev) => {
        const updated = prev.map((d) =>  d.id === workout.id ? workout : d);
        AsyncStorage.setItem(`app_data`, JSON.stringify(updated))
        return updated;
      })
    ),
    removeWorkout: (id: number) => (
      setData((prev) => {
        const updated = prev.filter((d) => d.id !== id);
        AsyncStorage.setItem("app_data", JSON.stringify(updated));
        return updated;
      })
    ),
    data
  }), [data])

  return (
    <DataContext value={value}>
      {children}
    </DataContext>
  )
}