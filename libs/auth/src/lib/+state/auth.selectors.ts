import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getLoginOptions = createSelector(
  getAuthState,
  (state: AuthState) => state.loginOptions
);

export const getSelectedOption = createSelector(
  getAuthState,
  (state: AuthState) => state.selectedLoginOption
);

export const getQrCode = createSelector(
  getAuthState,
  (state: AuthState) => state.qrCode
);

export const getAuthEntity = createSelector(
  getAuthState,
  (state: AuthState) => state.authEntity
);
