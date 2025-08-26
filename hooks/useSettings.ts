import { SettingsContext } from "@/providers/SettingsProvider";
import { useContext } from "react";

export const useSettings = () => useContext(SettingsContext);