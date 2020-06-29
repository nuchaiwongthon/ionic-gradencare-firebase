import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'main-menu',
    canActivate: [AppComponent],
    loadChildren: () => import('./main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'veg-list',
    loadChildren: () => import('./veg-list/veg-list.module').then( m => m.VegListPageModule)
  },
  {
    path: 'veg-diagnosis',
    loadChildren: () => import('./veg-diagnosis/veg-diagnosis.module').then( m => m.VegDiagnosisPageModule)
  },
  {
    path: 'veg-timeline',
    loadChildren: () => import('./veg-timeline/veg-timeline.module').then( m => m.VegTimelinePageModule)
  },
  {
    path: 'veg-setting',
    loadChildren: () => import('./veg-setting/veg-setting.module').then( m => m.VegSettingPageModule)
  },
  {
    path: 'veg-detail/:data',
    loadChildren: () => import('./veg-detail/veg-detail.module').then( m => m.VegDetailPageModule)
  },
  {
    path: 'veg-add-timeline',
    loadChildren: () => import('./veg-add-timeline/veg-add-timeline.module').then( m => m.VegAddTimelinePageModule)
  },
  {
    path: 'veg-time-line-detail/:data',
    loadChildren: () => import('./modal/veg-time-line-detail/veg-time-line-detail.module').then( m => m.VegTimeLineDetailPageModule)
  },
  {
    path: 'map-detail',
    loadChildren: () => import('./modal/map-detail/map-detail.module').then( m => m.MapDetailPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./modal/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
