import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@elrond-marbles/app-config';
import * as AuthActions from '../+state/auth.actions';
import { LoginService } from './login.service';

import { WalletConnectProvider } from '@elrondnetwork/erdjs-wallet-connect-provider';
import { Store } from '@ngrx/store';
import * as QRCode from 'qrcode';

@Injectable()
export class MaiarAppLoginService extends LoginService {
  bridgeUrl!: string;
  qrCodeDrawTimer = 0;
  provider!: WalletConnectProvider;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private store: Store
  ) {
    super();

    this.bridgeUrl = this.appConfig.walletConnectBridgeUrl;
    const callbacks = {
      onClientLogin: async () => {
        const address = await this.provider.getAddress();
        this.store.dispatch(
          AuthActions.loginSuccess({ authEntity: { address } })
        );
      },
      onClientLogout: async () => {
        this.store.dispatch(AuthActions.logout());
      },
    };
    this.provider = new WalletConnectProvider(this.bridgeUrl, callbacks);
  }
  async login() {
    await this.onConnectMaiarApp();
  }
  async logout() {
    await this.provider.logout();
  }

  private async onConnectMaiarApp(): Promise<string> {
    const connectorUri = await this.provider.login();
    return await QRCode.toString(connectorUri, { type: 'svg' });
  }
}
