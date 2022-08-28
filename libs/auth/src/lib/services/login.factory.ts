import { MaiarWebWalletLoginService } from './maiar-web-wallet.login.service';
import { MaiarLedgerLoginService } from './maiar-ledger.login.service';
import { State, Store } from '@ngrx/store';
import { AuthState } from '../+state/auth.reducer';
import { MaiarAppLoginService } from './maiar-app.login.service';
import { MaiarExtensionLoginService } from './maiar-extension.login.service';
import { EnvironmentModel } from '@elrond-marbles/app-config';

export function LoginFactory(
  state: State<AuthState>,
  store: Store,
  appConfig: EnvironmentModel
) {
  const selectedOption = state.getValue().auth.selectedLoginOption;
  if (selectedOption.id === 'maiarApp') {
    return new MaiarAppLoginService(appConfig, store);
  }
  if (selectedOption.id === 'maiarExtension') {
    return new MaiarExtensionLoginService(appConfig, store);
  }
  if (selectedOption.id === 'maiarLedger') {
    return new MaiarLedgerLoginService(appConfig, store);
  }
  if (selectedOption.id === 'maiarWebWallet') {
    return new MaiarWebWalletLoginService(appConfig, store);
  }
  return null;
}
