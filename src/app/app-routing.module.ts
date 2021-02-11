import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { MemeComponent } from './meme/meme.component';
import { MemeListComponent } from './meme-list/meme-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadMemeComponent } from './upload-meme/upload-meme.component';
import { HomeComponent } from './home/home.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { UploadReviewComponent } from './upload-review/upload-review.component';

const routes: Routes = [
  { path: "edit-meme/:id", component: EditMemeComponent },
  { path: "home", component: HomeComponent },
  { path: "meme/:id", component: MemeComponent },
  { path: "meme-list", component: MemeListComponent },
  { path: "upload-meme", component: UploadMemeComponent },
  { path: "review-list", component: ReviewListComponent },
  { path: "upload-review", component: UploadReviewComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
