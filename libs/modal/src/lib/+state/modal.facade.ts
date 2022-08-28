import { Injectable, TemplateRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as ModalActions from './modal.actions';
import * as ModalSelectors from './modal.selectors';

@Injectable()
export class ModalFacade {
  titleTemplate$: Subject<TemplateRef<HTMLElement> | null> = new Subject();
  bodyTemplate$: Subject<TemplateRef<HTMLElement> | null> = new Subject();
  footerTemplate$: Subject<TemplateRef<HTMLElement> | null> = new Subject();

  closable$: Subject<boolean> = new Subject();
  open$ = this.store.pipe(select(ModalSelectors.getModalOpen));
  type$: Subject<'none' | 'info' | 'success' | 'warning' | 'error'> =
    new Subject();

  constructor(private readonly store: Store) {}

  setClosable(closable: boolean): void {
    this.closable$.next(closable);
  }

  setBodyTemplate(bodyTemplateRef: TemplateRef<HTMLElement> | null) {
    this.bodyTemplate$.next(bodyTemplateRef);
  }

  setTitleTemplate(titleTemplateRef: TemplateRef<HTMLElement> | null) {
    this.titleTemplate$.next(titleTemplateRef);
  }

  setFooterTemplate(footerTemplateRef: TemplateRef<HTMLElement> | null) {
    this.footerTemplate$.next(footerTemplateRef);
  }

  setType(type: 'none' | 'info' | 'success' | 'warning' | 'error') {
    this.type$.next(type);
  }

  openModal() {
    this.store.dispatch(ModalActions.openModal());
  }

  closeModal() {
    this.store.dispatch(ModalActions.closeModal());
    this.setTitleTemplate(null);
    this.setBodyTemplate(null);
    this.setClosable(false);
    this.setType('none');
  }
}
