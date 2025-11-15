import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard'; 

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
    
    canActivate: [authGuard], 
    
    children: [
      {
        path: 'mis-datos',
        loadComponent: () =>
          import('./mis-datos/mis-datos.page').then(m => m.MisDatosPage),
      },
      {
        path: 'experiencia-laboral',
        loadComponent: () =>
          import('./experiencia-laboral/experiencia-laboral.page').then(m => m.ExperienciaLaboralPage),
      },
      {
        path: 'certificaciones',
        loadComponent: () =>
          import('./certificaciones/certificaciones.page').then(m => m.CertificacionesPage),
      },
      {
        path: '',
        redirectTo: 'mis-datos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'error404',
    loadComponent: () =>
      import('./error404/error404.page').then(m => m.Error404Page)
  },
  { path: '**', redirectTo: 'error404' }
];