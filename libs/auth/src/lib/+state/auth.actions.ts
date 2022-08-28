import { AuthEntity } from './auth-entity.model';
import { createAction, props } from '@ngrx/store';
import { LoginOption } from './auth.reducer';

export const selectLoginOption = createAction(
  '[Auth] Select Login Option',
  props<{ loginOption: LoginOption }>()
);

export const login = createAction('[Auth] Login started');

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ authEntity: AuthEntity }>()
);

export const loginFailure = createAction('[Auth] Login failure');

export const logout = createAction('[Auth] Logout');

export const qrCodeSuccess = createAction(
  '[Auth] QRCode retrieved',
  props<{ qrCode: string }>()
);
