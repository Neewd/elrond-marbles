import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MODAL_FEATURE_KEY, ModalState } from './modal.reducer';

// Lookup the 'Modal' feature state managed by NgRx
export const getModalState =
  createFeatureSelector<ModalState>(MODAL_FEATURE_KEY);

export const getModalOpen = createSelector(
  getModalState,
  (state: ModalState) => state.open
);
