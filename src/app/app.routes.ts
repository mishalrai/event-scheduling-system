import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Event',
    path: 'event',
    loadComponent: () =>
      import('./containers/event/event.component').then(
        (c) => c.EventComponent
      ),
  },
  {
    title: 'Participant',
    path: 'participant',
    loadComponent: () =>
      import('./containers/participant/participant.component').then(
        (c) => c.ParticipantComponent
      ),
  },
  {
    path: '',
    redirectTo: '/event',
    pathMatch: 'full',
  },
  {
    title: 'Page not found',
    path: '**',
    loadComponent: () =>
      import('./compoents/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ), //Wildcard route for a 404 page
  },
];
