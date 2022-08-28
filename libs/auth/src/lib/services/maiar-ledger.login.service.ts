import { APP_CONFIG } from './../../../../app-config/index';
import { LoginService } from './login.service';
import { HWProvider } from '@elrondnetwork/erdjs-hw-provider';
import { Inject } from '@angular/core';
import { Store } from '@ngrx/store';

export class MaiarLedgerLoginService extends LoginService {
  addresses: string[] = [];
  address!: string;
  provider!: HWProvider;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private authStore: Store
  ) {
    super();
    this.provider = new HWProvider();
  }

  async login(): Promise<string> {
    const chosenAddressIndex = this.addresses.findIndex(
      (currentAddress) => currentAddress === this.address
    );
    await this.provider.login({ addressIndex: chosenAddressIndex });
    return await this.provider.getAddress();
  }

  logout(): void {
    throw new Error('Method not implemented.');
  }

  private async getAddresses(): Promise<string[] | null> {
    try {
      await this.provider.init();
    } catch (err) {
      return null;
    }
    this.addresses = await this.provider.getAccounts();
    return this.addresses;
  }
}
