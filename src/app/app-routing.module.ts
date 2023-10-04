import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateFormComponent } from './create-form/create-form.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'createForm', component: CreateFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
