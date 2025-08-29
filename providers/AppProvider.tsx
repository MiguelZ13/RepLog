import { PropsWithChildren } from "react";
import DataProvider from "./DataProvider";
import SettingsProvider from "./SettingsProvider";

export default function AppProvider({children}: PropsWithChildren) {
    return (
        <SettingsProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </SettingsProvider>
    )
}