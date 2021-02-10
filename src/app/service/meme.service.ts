import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { IMeme } from '../model/IMeme.model';
import { IUpdateResponse } from '../model/IUpdate.model';
import { IUploadResponse } from '../model/IUploadResponse';

/**
 * @description This class encapsulated http calls associated with CRUD operation related to memes
 */
@Injectable({
  providedIn: 'root'
})
export class MemeService {
  /**
   * @description Custom HTTP Options to be set during making HTTP calls
   */
  private readonly httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  /**
   * @description HTTP Call to fetch 100 most recently uploaded memes
   * @returns {Observable<IMeme>} retuns list of 100 most recently uploaded memes
   */
  getMemes(): Observable<IMeme[]> {
    return this.http.get<IMeme[]>(environment.apiUrl).pipe(catchError(this.errorHandler));
  }

  /**
   * @description HTTP Call to fetch payload of a particular Meme having given id
   * @param id ID of Meme to be fetched
   * @returns {Observable<IMeme>} Meme payload if found, otherwise 404 error status if not found
   */
  getMeme(id: number): Observable<IMeme> {
    return this.http.get<IMeme>(`${environment.apiUrl}/${id}`).pipe(catchError(this.errorHandler));
  }

  /**
   * @description This method checks whether given URL is existing or not
   * @param url Meme Image URL specified by Uploader who's existence need to be checked
   * @returns {Promise<boolean>}
   */
  async checkImageUrl(url: string): Promise<boolean> {
    try {
      const res = await fetch(url, { mode: "no-cors" });
      return true; 
    } catch (err) {
      return false;
    }
  }

  /**
   * @description This method responsible for uploading meme
   * @param meme Meme Payload to be Uploaded
   * @returns {Observable<IUploadResponse>} Autogenerated ID of Meme if successfully uploaded
   */
  uploadMeme(meme: IMeme): Observable<IUploadResponse> {
    const memeContent = {
      name: meme.name,
      caption: meme.caption,
      url: meme.url
    };

    return this.http.post<IUploadResponse>(environment.apiUrl, memeContent, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  /**
   * @description This method is responsible for editing meme payload
   * @param updatedMeme Upadated Meme Paylod speicified by User
   * @returns {Observable<IUploadResponse>} success message if successfully updated
   */
  editMeme(updatedMeme: IMeme): Observable<IUpdateResponse> {
    const requestUrl = `${environment.apiUrl}/${updatedMeme.id}`;

    const content = {
      name: updatedMeme.name,
      caption: updatedMeme.caption,
      url: updatedMeme.url
    };

    return this.http.patch<IUpdateResponse>(requestUrl, content, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  /**
   * @description this method throws caught error response
   * @param error HTTP error response sent by API if any API error occurres
   */
  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}