import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

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
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export default function SettingsProvider({
    children, initialSettings
}: {
    children: React.ReactNode;
    initialSettings?: Settings | null;
}) {
    const [settings, setSettings] = useState<Settings>(initialSettings || defaultSettings);

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