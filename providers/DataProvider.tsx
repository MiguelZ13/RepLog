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
  data: Data[];
  lastId: number;
  getWorkout: (id: number) => Data | null;
  addWorkout: () => void;
  updateWorkout: (workout: Data) => void;
  removeWorkout: (id: number) => void;
  clearWorkouts: () => void;
}

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Data[]>(defaultData);
  const [lastId, setLastId] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("app_data");
        const loadedData: Data[] = jsonData != null ? JSON.parse(jsonData) : defaultData;
        setData(loadedData);
        setLastId(loadedData[0].id)
      } catch (e) {
        console.error(`Error Loading Data: ${e}`)
      }
    }
    loadData();
  }, [])

  useEffect(() => {
    const refreshData = async () => {
      try {
        setLastId(data[0].id)
        await AsyncStorage.setItem(`app_data`, JSON.stringify(data));
      } catch (e) {
        console.error(`Error Refreshing Data: ${e}`)
      }
    }
    refreshData();
  }, [data])

  const value = useMemo(() => ({
    getWorkout: (id: number) => 
      data.find((d) => d.id === id) ?? null,
    addWorkout: async () => {
      setData((prev) => {
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;
        let nextId = lastId + 1
        const newWorkout = {...defaultWorkout, id: nextId, date: formattedDate};
        const updated = [newWorkout, ...prev];
        return updated
      });
    },
    updateWorkout: async (workout: Data) => {
      setData(data.map((d) =>  d.id === workout.id ? workout : d));
    },
    removeWorkout: async (id: number) => {
      setData(data.filter((d) => d.id !== id));
    },
    clearWorkouts: () => {
      setData(defaultData);
    },
    data, 
    lastId
  }), [data, lastId])

  return (
    <DataContext value={value}>
      {children}
    </DataContext>
  )
}