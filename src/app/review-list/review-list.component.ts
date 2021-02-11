import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReviewService } from '../service/review-service/review.service';

import { IReview } from '../model/IReview.model';

/**
 * @description This Component renders top 20 recently uploaded reviews
 */
@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  /**
   * @description Contains list of 20 msot recently uploaded review, initially empty
   */
  reviews: IReview[] = [];

  /**
   * @description true, if reviews are still getting loaded from remote server, false otherwise
   */
  isLoading: boolean = true;

  constructor(private service: ReviewService, private router: Router) { }

  ngOnInit(): void {
    /**
     * @description Service to fetch most recently uploaded 20 reviews is called, if error occurs it will reported
     */
    this.service.getReviews().subscribe(data => {
      this.isLoading = false;
      this.reviews = data;
    }, error => {
      window.alert(error.message);
      this.router.navigate(["home"]);
    })
  }

  /**
   * 
   * @param review Particular review
   * @returns Based on how many stars a review has got bootstrap classes will be generated dynamically
   */
  getReviewClasses(review: IReview): string {
    let alertClass = "alert ";
    if (review.stars === 5) {
      return alertClass += "alert-success";
    } else if (review.stars >= 3 && review.stars < 5) {
      return alertClass += "alert-warning";
    } else {
      return alertClass += "alert-danger";
    }
  }
}
