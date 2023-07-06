import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './website/authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/authentication/signin',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./website/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./website/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'technology',
        loadChildren: () =>
          import('./website/technology/technology.module').then(
            (m) => m.TechnologyModule
          ),
      },
      {
        path: 'skill',
        loadChildren: () =>
          import('./website/skill/skill.module').then(
            (m) => m.SkillModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./website/about/about.module').then(
            (m) => m.AboutModule
          ),
      },
      {
        path: 'experience',
        loadChildren: () =>
          import('./website/experience/experience.module').then(
            (m) => m.ExperienceModule
          ),
      },
      {
        path: 'certificate',
        loadChildren: () =>
          import('./website/certificate/certificate.module').then(
            (m) => m.CertificateModule
          ),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./website/portfolio/portfolio.module').then(
            (m) => m.PortfolioModule
          ),
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./website/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
