import { useEffect } from "react";
import {
    settingsRequireReload,
    useSettingsStore,
    type SettingsState,
} from "@/stores/useSettingsStore";

interface PersistedSettings {
    state: Partial<SettingsState>;
    version: number;
}

export function useSettingsSync() {
    useEffect(() => {
        const handleStorage = (event: StorageEvent) => {
            if (
                event.key !== "v2/settings" ||
                !event.oldValue ||
                !event.newValue
            ) {
                return;
            }

            try {
                const oldSettings = (
                    JSON.parse(event.oldValue) as PersistedSettings
                ).state;

                const newSettings = (
                    JSON.parse(event.newValue) as PersistedSettings
                ).state;

                const shouldReload = settingsRequireReload(
                    oldSettings,
                    newSettings,
                );

                if (shouldReload) {
                    window.location.reload();
                } else {
                    void useSettingsStore.persist.rehydrate();
                }
            } catch (error) {
                console.error("Failed to synchronize settings:", error);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
        };
    }, []);
}
