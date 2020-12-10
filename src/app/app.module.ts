import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { PlaylistDataComponent } from './components/playlist-data/playlist-data.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistDataComponent,
    PlaylistItemComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
