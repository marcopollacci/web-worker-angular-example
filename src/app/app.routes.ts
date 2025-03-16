import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'worker',
    loadComponent: () =>
      import('./components/worker/worker.component').then(
        (m) => m.WorkerComponent
      ),
  },
  {
    path: 'no-worker',
    loadComponent: () =>
      import('./components/no-worker/no-worker.component').then(
        (m) => m.NoWorkerComponent
      ),
  },
  {
    path: 'pool-worker',
    loadComponent: () =>
      import('./components/pool-worker/pool-worker.component').then(
        (m) => m.PoolWorkerComponent
      ),
  },
];
