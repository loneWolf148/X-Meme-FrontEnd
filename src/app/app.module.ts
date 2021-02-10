import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemeListComponent } from './meme-list/meme-list.component';
import { MemeComponent } from './meme/meme.component';
import { UploadMemeComponent } from './upload-meme/upload-meme.component';
import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MemeService } from './service/meme.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeListComponent,
    MemeComponent,
    UploadMemeComponent,
    EditMemeComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
