import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
    impact(style: string): void;
    notification(type: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeHaptics',
);