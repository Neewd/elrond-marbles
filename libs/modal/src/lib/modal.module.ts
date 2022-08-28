import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromModal from './+state/modal.reducer';
import { ModalEffects } from './+state/modal.effects';
import { ModalFacade } from './+state/modal.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromModal.MODAL_FEATURE_KEY, fromModal.modalReducer),
    EffectsModule.forFeature([ModalEffects]),
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  providers: [ModalFacade],
})
export class ModalModule {}
