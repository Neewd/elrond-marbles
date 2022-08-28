import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalFacade } from '../+state/modal.facade';
import { getModalOpen } from '../+state/modal.selectors';
import { closeModal } from './../+state/modal.actions';

@Component({
  selector: 'em-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('opacityTranslateY', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1rem)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'translateY(1rem)' })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  titleTemplate!: TemplateRef<HTMLElement> | null;
  bodyTemplate!: TemplateRef<HTMLElement> | null;
  footerTemplate!: TemplateRef<HTMLElement> | null;

  closable!: boolean;
  modalOpened$: Observable<boolean>;
  type!: 'none' | 'error' | 'success' | 'warning' | 'info';

  constructor(private store: Store, private modalFacadeService: ModalFacade) {
    this.modalOpened$ = this.store.select(getModalOpen);

    this.modalFacadeService.titleTemplate$.subscribe((titleTemplate) => {
      this.titleTemplate = titleTemplate;
    });

    this.modalFacadeService.closable$.subscribe((closable) => {
      this.closable = closable;
    });

    this.modalFacadeService.bodyTemplate$.subscribe((bodyTemplate) => {
      this.bodyTemplate = bodyTemplate;
    });

    this.modalFacadeService.footerTemplate$.subscribe((footerTemplate) => {
      this.footerTemplate = footerTemplate;
    });

    this.modalFacadeService.type$.subscribe((type) => {
      this.type = type;
    });
  }

  onCloseModal(): void {
    this.store.dispatch(closeModal());
  }
}
