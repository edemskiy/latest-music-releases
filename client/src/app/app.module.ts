import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SubsComponent } from './subs/subs.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { AlbumCardComponent } from './subs/album-card/album-card.component';
import { ReleasesPipe } from './shared/releases.pipe';
import { ArtistsListComponent } from './subs/artists-list/artists-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SubsComponent,
    HomeComponent,
    HeaderComponent,
    ArtistSearchComponent,
    AlbumCardComponent,
    ReleasesPipe,
    ArtistsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
