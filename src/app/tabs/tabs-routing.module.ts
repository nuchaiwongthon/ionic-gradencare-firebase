import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main-menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../main-menu/main-menu.module').then(m => m.MainMenuPageModule)
          }
        ]
      },
      {
        path: 'veg-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../veg-list/veg-list.module').then(m => m.VegListPageModule)
          }
        ]
      },
      {
        path: 'veg-diagnosis',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../veg-diagnosis/veg-diagnosis.module').then(m => m.VegDiagnosisPageModule)
          }
        ]
      },
      {
        path: 'veg-timeline',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../veg-timeline/veg-timeline.module').then(m => m.VegTimelinePageModule)
          }
        ]
      },
      {
        path: 'veg-setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../veg-setting/veg-setting.module').then(m => m.VegSettingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/main-menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main-menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
