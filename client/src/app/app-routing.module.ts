import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SubsComponent } from './subs/subs.component';
import { HomeComponent } from './home/home.component';
import { LoggedUserGuard } from './logged-user.guard';
import { ArtistSearchComponent } from './artist-search/artist-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedUserGuard],
    children: [
      {
        path: '',
        component: SubsComponent,
        data: { title: 'Your subscriptions' },
      },
      {
        path: 'search',
        component: ArtistSearchComponent,
        data: { title: 'Search for artists' },
      },
    ],
  },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
