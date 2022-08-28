import { APP_CONFIG } from '@elrond-marbles/app-config';
import { Inject, Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ExtensionProvider } from '@elrondnetwork/erdjs-extension-provider';
import { Store } from '@ngrx/store';

@Injectable()
export class MaiarExtensionLoginService extends LoginService {
  provider: ExtensionProvider;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private store: Store
  ) {
    super();
    this.provider = ExtensionProvider.getInstance();
  }

  async login() {
    console.log('mair extension login');
    try {
      await this.provider.init();
    } catch (err) {
      return;
    }

    const address = await this.provider.login();
    console.log('address', address);
  }

  async logout() {
    await this.provider.logout();
  }
}
