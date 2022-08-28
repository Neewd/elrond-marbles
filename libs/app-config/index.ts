import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken('Application config');

export interface EnvironmentModel {
  production: boolean;
  walletConnectBridgeUrl: string;
  callbackUrl: string;
  walletProviderUrl: string;
}
