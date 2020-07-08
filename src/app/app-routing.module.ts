import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './pages/company/company.component';
import {ProductComponent} from './pages/product/product.component';
import {OrderComponent} from './pages/order/order.component';

const routes: Routes = [
  {path: '', component: CompanyComponent},
  {path: 'product-list', component: ProductComponent},
  {path: 'order-list', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
