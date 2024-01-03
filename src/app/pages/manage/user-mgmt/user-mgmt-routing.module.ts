import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMgmtComponent } from './user-mgmt.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [{
  path: '',
  component: UserMgmtComponent,
  children: [
    {
      path: '', redirectTo: 'users', pathMatch: 'full'
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'roles',
      component: RolesComponent
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMgmtRoutingModule { }
