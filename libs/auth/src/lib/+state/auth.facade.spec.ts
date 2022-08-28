import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { authReducer, AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

interface TestSchema {
  auth: AuthState;
}

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer),
          EffectsModule.forFeature([AuthEffects]),
        ],
        providers: [AuthFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthFacade);
    });
  });
});
