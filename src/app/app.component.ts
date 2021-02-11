import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  insideReview: boolean = false;

  enableReviewNavigation() {
    this.insideReview = true;
  }

  disableReviewNavigation() {
    this.insideReview = false;
  }
}
