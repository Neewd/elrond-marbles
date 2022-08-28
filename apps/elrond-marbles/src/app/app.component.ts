import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@elrond-marbles/api-interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'em-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  displayTest = false;
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient, private store: Store) {}
}
