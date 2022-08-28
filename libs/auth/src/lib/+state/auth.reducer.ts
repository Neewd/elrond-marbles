import { AuthEntity } from './auth-entity.model';
import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface LoginOption {
  id: string;
  label: string;
}

export interface AuthState {
  authEntity: AuthEntity | null;
  loginOptions: LoginOption[];
  selectedLoginOption: LoginOption | null;
  qrCode: string;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}
export const initialAuthState: AuthState = {
  // set initial required properties
  loginOptions: [
    {
      id: 'maiarApp',
      label: 'Maiar Application',
    },
    {
      id: 'maiarWebWallet',
      label: 'Maiar web wallet',
    },
    {
      id: 'maiarLedger',
      label: 'Ledger',
    },
    {
      id: 'maiarExtension',
      label: 'Maiar chrome extension',
    },
  ],
  selectedLoginOption: null,
  qrCode: '',
  authEntity: null,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.selectLoginOption, (state, { loginOption }) => ({
    ...state,
    selectedLoginOption: loginOption,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
