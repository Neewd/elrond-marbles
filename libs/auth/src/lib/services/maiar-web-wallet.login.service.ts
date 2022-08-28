import { APP_CONFIG } from '@elrond-marbles/app-config';
import { LoginService } from './login.service';
import { WalletProvider } from '@elrondnetwork/erdjs-web-wallet-provider';
import { Store } from '@ngrx/store';
import { Inject } from '@angular/core';

export class MaiarWebWalletLoginService extends LoginService {
  provider!: WalletProvider;
  callbackUrl!: string;

  readonly WAIT_CALLBACK_TIMEOUT: number = 500;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private store: Store
  ) {
    super();
  }

  async login(): Promise<void> {
    setTimeout(async () => {
      await this.provider.login({ callbackUrl: this.callbackUrl });
    }, this.WAIT_CALLBACK_TIMEOUT);
  }
  async logout(): Promise<void> {
    await this.provider.logout({ callbackUrl: this.callbackUrl });
  }
}
