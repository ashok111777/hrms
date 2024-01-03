import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guards/auth.guard';
import { NotfoundComponent } from './others/notfound/notfound.component';



const routes: Routes = [
  { path: '', redirectTo: 'prelogin', pathMatch: 'full' },
  { path: 'prelogin', loadChildren: () => import('./prelogin/prelogin.module').then(m => m.PreloginModule) },
  {
    path: 'main', loadChildren: () => import('./layout-view/layout-view.module').then(m => m.LayoutViewModule),
    canActivate: [AuthGuard], canActivateChild: [AuthGuard]
  },
  { path: '**', component: NotfoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
