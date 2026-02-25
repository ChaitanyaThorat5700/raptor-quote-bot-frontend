import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // =========================
  // PUBLIC ROUTES
  // =========================
  {
    path: '',
    loadComponent: () =>
      import('./public/estimator/estimator.component')
        .then(m => m.EstimatorComponent)
  },
  {
    path: 'quote/:publicCode',
    loadComponent: () =>
      import('./public/quote-view/quote-view.component')
        .then(m => m.QuoteViewComponent)
  },

  // =========================
  // ADMIN LOGIN
  // =========================
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./admin/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  // =========================
  // ADMIN PROTECTED AREA
  // =========================
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/layout/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'leads',
        loadComponent: () =>
          import('./admin/leads/lead-list/lead-list.component')
            .then(m => m.LeadListComponent)
      },
      {
        path: 'leads/:id',
        loadComponent: () =>
          import('./admin/leads/lead-detail/lead-detail.component')
            .then(m => m.LeadDetailComponent)
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./admin/pricing/pricing.component')
            .then(m => m.PricingComponent)
      }
    ]
  },

  // =========================
  // FALLBACK ROUTE
  // =========================
  {
    path: '**',
    redirectTo: ''
  }

];