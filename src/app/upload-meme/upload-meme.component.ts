import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MemeService } from '../service/meme-service/meme.service';

import { IUploadResponse } from '../model/IUploadResponse.model';
import { IMeme } from '../model/IMeme.model';
import { windowWhen } from 'rxjs/operators';

/**
 * @description This component is resposible for encapsulating Meme Upload
 */
@Component({
  selector: 'app-upload-meme',
  templateUrl: './upload-meme.component.html',
  styleUrls: ['./upload-meme.component.css']
})
export class UploadMemeComponent implements OnInit {
  /**
   * @description two way binded model of meme who's payloads are entered in upload form
   */
  readonly meme: IMeme = {
    id: null,
    name: null,
    caption: null,
    url: null
  };

  constructor(private service: MemeService, private router: Router) { }

  ngOnInit(): void { }

  /**
   * @description This method calls necessary service to upload the meme payload
   * @description If upload is successful method alerts the user with success message and redirect to {@link HomeComponent}
   * @description Otherwise it alerts the user with reason of failure 
   * @summary handles editing payload of meme
   * @returns {void} 
   */
  private uploadMeme(): void {
    this.service.uploadMeme(this.meme).subscribe((response: IUploadResponse) => {
      if (response.id > 0) {
        window.alert("Meme Uploaded Successfully");
        this.router.navigate(["home"]);
      } else {
        window.alert("Meme Could Not Be Uploaded");
      }
    }, (error) => {
      window.alert(error.message);
    });
  }

  /**
   * @description Firstly this method check whether URL is Valid. 
   * @description If URL is valid {@link editForm} method is called to upload payload
   * @returns {Promise<void>}
   */
  async submitForm(): Promise<void> {
    try {
      const validUrl = await this.service.checkImageUrl(this.meme.url);
      if (validUrl) {
        this.uploadMeme();
      } else {
        window.alert("Wrong Image URL");
      }
    } catch (_) {
      window.alert("Wrong Image URL")
    }
  }
}
