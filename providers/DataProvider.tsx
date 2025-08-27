import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useMemo, useState } from "react";

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

export const DataContext = createContext<any>(null);

export default function DataProvider({
  children, initialData
}: {
  children: React.ReactNode;
  initialData: Data[] | null;
}) {
  const [data, setData] = useState<Data[]>(initialData || defaultData);

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