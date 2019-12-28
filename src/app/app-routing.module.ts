import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BlankComponent } from './pages/blank/blank.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { AccountlistComponent } from './pages/accountlist/accountlist.component';
import { AccountTransactionComponent } from './pages/account-transaction/account-transaction.component';
import { MoneyTransferComponent } from './pages/money-transfer/money-transfer.component';
import { DepositComponent } from './pages/deposit/deposit.component';
import { WithdrawComponent } from "./pages/withdraw/withdraw.component";
import { VirmanComponent } from "./pages/virman/virman.component";
import { EftComponent } from './pages/eft/eft.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PayBillComponent } from "./pages/pay-bill/pay-bill.component";
import { PaymenthistoryComponent } from './pages/paymenthistory/paymenthistory.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blank',
        component: BlankComponent
      },
      {
        path: '',
        component: HomepageComponent
      },
      {
        path:'accountlist',
        component:AccountlistComponent
      },
      {
        path:'account-transaction',
        component:AccountTransactionComponent
      },
      {
        path:'money-transfer',
        component:MoneyTransferComponent
      },
      {
        path:'deposit',
        component:DepositComponent
      },
      {
        path:'withdraw',
        component:WithdrawComponent
      },
      {
        path:'virman',
        component:VirmanComponent
      },
      {
        path:'eft',
        component:EftComponent
      },
      {
        path:'payment',
        component:PayBillComponent
      },
      {
        path:'paymenthistory',
        component:PaymenthistoryComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
