import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { APP_CONFIG } from '@elrond-marbles/app-config';
import { EffectsModule } from '@ngrx/effects';
import { State, Store, StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import * as fromAuth from './+state/auth.reducer';
import { LoginService } from './services';
import { LoginFactory } from './services/login.factory';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthFacade,
    {
      provide: LoginService,
      useFactory: LoginFactory,
      deps: [State, Store, APP_CONFIG],
    },
  ],
})
export class AuthModule {}
