import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MemeService } from '../service/meme.service';

import { IMeme } from '../model/IMeme.model';
import { IUpdateResponse } from '../model/IUpdate.model';


/**
 * @description This class represents Component associated with Editing of Payload(Caption and URL) of Meme
 */
@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.css']
})
export class EditMemeComponent implements OnInit {

  /**
   * @type {IMeme}
   * @description Behaves as two-way binded model of Meme which is being updated
   */
  readonly meme: IMeme = {
    id: null,
    name: null,
    caption: null,
    url: null
  };

  /**
   * @type {boolean}
   * @description true means meme payload is being loaded, false means already loaded
   */
  payloadLoading: boolean = true;

  /**
   * @constructor Constructor of EditComponent
   * @param service MemeService to access services provided by MemeService
   * @param router Router to Navigate to Different Component
   * @param activatedRoute ActivatedRoute to read {id} field from navigation path
   */
  constructor(private service: MemeService, private router: Router, private activatedRoute: ActivatedRoute) {
    const id: number = +this.activatedRoute.snapshot.paramMap.get("id");
    this.meme.id = id;
  }

  /**
   * @description In This method corresponding meme payload is loaded to be reflected in form 
   * @returns {void}
   */
  ngOnInit(): void {
    this.service.getMeme(this.meme.id).subscribe(data => {
      this.meme.name = data.name;
      this.meme.caption = data.caption;
      this.meme.url = data.url;

      this.payloadLoading = false;
    }, _ => {
      window.alert("Meme Details Could Not Be Fetched");
      this.payloadLoading = false;

      this.router.navigate(["home"]);
    })
  }

  /**
   * @description This method calls necessary service to update the meme payload
   * @description If update is successful method alerts the user with success message and redirect to {@link HomeComponent}
   * @description Otherwise it alerts the user with reason of failure 
   * @summary handles editing payload of meme
   * @returns {void} 
   */
  private editForm(): void {
    this.service.editMeme(this.meme).subscribe((data: IUpdateResponse) => {
      window.alert(data.message);
      this.router.navigate(["home"]);
    }, (_) => {
      window.alert("Meme Could Not Be Updated");
    })
  }


  /**
   * @description Firstly this method check whether URL is Valid. 
   * @description If URL is valid {@link editForm} method is called to update payload
   * @returns {Promise<void>}
   */
  async submitForm(): Promise<void> {
    const urlExists: boolean = await this.service.checkImageUrl(this.meme.url);
    if (urlExists) {
      this.editForm();
    } else {
      window.alert("URL Doesn't Exist");
    }
  }
}
