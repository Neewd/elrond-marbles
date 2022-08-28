import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ModalActions from './modal.actions';
import { ModalEffects } from './modal.effects';
import { ModalFacade } from './modal.facade';
import { ModalEntity } from './modal.models';
import {
  MODAL_FEATURE_KEY,
  ModalState,
  initialModalState,
  modalReducer,
} from './modal.reducer';
import * as ModalSelectors from './modal.selectors';

interface TestSchema {
  modal: ModalState;
}

describe('ModalFacade', () => {
  let facade: ModalFacade;
  let store: Store<TestSchema>;
  const createModalEntity = (id: string, name = ''): ModalEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MODAL_FEATURE_KEY, modalReducer),
          EffectsModule.forFeature([ModalEffects]),
        ],
        providers: [ModalFacade],
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
      facade = TestBed.inject(ModalFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allModal$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allModal$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadModalSuccess` to manually update list
     */
    it('allModal$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allModal$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ModalActions.loadModalSuccess({
          modal: [createModalEntity('AAA'), createModalEntity('BBB')],
        })
      );

      list = await readFirst(facade.allModal$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
