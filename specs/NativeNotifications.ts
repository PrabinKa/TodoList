import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
    scheduleNotification(
        id: string,
        title: string,
        body: string,
        timeStamp: number
    ): void;

    cancelNotification(id: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeNotifications');