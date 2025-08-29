import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type Settings = {
    theme: "light" | "dark";
    deleteWarning: boolean;
};

const defaultSettings: Settings = {
    theme: "light",
    deleteWarning: true
};

type SettingsContextType = {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export default function SettingsProvider({ children }: PropsWithChildren) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const settingsData = await AsyncStorage.getItem("app_data");
                setSettings(settingsData != null ? JSON.parse(settingsData) : defaultSettings)
            } catch (e) {
                console.error(`Error Loading Data: ${e}`)
            }
        }
        loadSettings();
    }, [])

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prev) => {
            const updated = {...prev, ...newSettings};
            AsyncStorage.setItem("app_settings", JSON.stringify(updated));
            return updated;
        });
    }

    return (
        <SettingsContext value={{settings, updateSettings}}>
            {children}
        </SettingsContext>
    )
}