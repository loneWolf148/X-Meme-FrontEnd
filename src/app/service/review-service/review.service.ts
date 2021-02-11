import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { IReview } from '../../model/IReview.model';
import { IUploadResponse } from 'src/app/model/IUploadResponse.model';

/**
 * @description This class encapsulates all HTTP service calls related ot Review
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  /**
  * @description Custom HTTP Options to be set during making HTTP calls
  */
  private readonly httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  /**
   * @description Base API End Point to access Meme Services to remote API
   */
  private readonly baseServiceUrl = `${environment.apiUrl}/${environment.reviewEndPoint}`;

  constructor(private http: HttpClient) { }

  /**
   * This method returns 20 most recently uploaed review
   * @returns 20 most recently uploaded review
   */
  getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(this.baseServiceUrl).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param reviewId Unique id of a review
   * @returns review if any review with speicified id already exists, otherwise error
   */
  getReview(reviewId: number): Observable<IReview> {
    return this.http.get<IReview>(`${this.baseServiceUrl}/${reviewId}`).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param userReview Review entered by reviewer
   * @returns id of newly uploaded review if upload is successful, otherwise error
   */
  uploadReview(userReview: IReview): Observable<IUploadResponse> {
    const content = {
      "reviewer": userReview.reviewer,
      "comment": userReview.comment,
      "stars": userReview.stars
    };

    return this.http.post<IUploadResponse>(this.baseServiceUrl, content, this.httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * This method throws the error HTTP response to be handled by components
   * @param error error HTTP Response returned by HTTP calls
   */
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
