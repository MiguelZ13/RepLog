import { PropsWithChildren } from "react";
import SettingsProvider from "./SettingsProvider";

export default function AppProvider({children}: PropsWithChildren) {
    return (
        <SettingsProvider>
            {children}
        </SettingsProvider>
    )
}