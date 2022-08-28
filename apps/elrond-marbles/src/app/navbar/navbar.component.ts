import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalActions, ModalFacade } from '@elrond-marbles/modal';
import { Store } from '@ngrx/store';

@Component({
  selector: 'em-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @ViewChild('titleTemplate') titleTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('bodyTemplate') bodyTemplate!: TemplateRef<HTMLElement>;
  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<HTMLElement>;

  constructor(private store: Store, private modaleFacade: ModalFacade) {}

  openModal(): void {
    this.modaleFacade.setTitleTemplate(this.titleTemplate);
    this.modaleFacade.setBodyTemplate(this.bodyTemplate);
    this.modaleFacade.setFooterTemplate(this.footerTemplate);
    this.modaleFacade.setClosable(true);
    this.store.dispatch(ModalActions.openModal());
  }
}
