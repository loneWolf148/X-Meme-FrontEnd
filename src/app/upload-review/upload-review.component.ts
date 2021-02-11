import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReview } from '../model/IReview.model';

import { ReviewService } from '../service/review-service/review.service';

/**
 * @description This component handles rendering of upload of review and takes care of necessary service calls
 */
@Component({
  selector: 'app-upload-review',
  templateUrl: './upload-review.component.html',
  styleUrls: ['./upload-review.component.css']
})
export class UploadReviewComponent implements OnInit {
  /**
   * @description This review defines two-way binded model of uploaded review
   */
  readonly review: IReview = {
    id: null,
    reviewer: null,
    comment: null,
    stars: null
  }

  constructor(private router: Router, private service: ReviewService) { }

  ngOnInit(): void { }

  /**
   * @description Method called after upload form is submitted
   * @returns success if review uploaded successfully, error otherwise. 
   */
  submitForm() {
    this.service.uploadReview(this.review).subscribe(response => {
      if (response.id > 0) {
        window.alert("Review Uploaded Succcessfully");
        this.router.navigate(["review-list"]);
      } else {
        window.alert("Review Not Uploaded Successfully");
      }
    }, error => {
      window.alert(error.message);
    })
  }
}
