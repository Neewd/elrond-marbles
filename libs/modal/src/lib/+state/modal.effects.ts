import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as ModalActions from './modal.actions';
import * as ModalFeature from './modal.reducer';

@Injectable()
export class ModalEffects {
  constructor(private readonly actions$: Actions) {}
}
