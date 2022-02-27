import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddMedicineComponent } from './addMedicine/addMedicine.component';

const routes: Routes = [
  {
    path: 'addMedicine',
    component: AddMedicineComponent,
    data: {
      title: 'Add medicine'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
