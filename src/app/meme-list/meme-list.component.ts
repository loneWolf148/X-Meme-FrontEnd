import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MemeService } from '../service/meme.service';

import { IMeme } from '../model/IMeme.model';

/**
 * @description This component encapsulates 100 most recently uploaded memes
 */
@Component({
  selector: 'app-meme-list',
  templateUrl: './meme-list.component.html',
  styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {
  /**
   * @type {Array<IMeme>} 
   * @description Stores list of 100 recently uploaded memes, initally empty
   */
  memes: IMeme[] = [];

  /**
   * @type {boolean}
   * @description true refers that 100 most recently uploaded memes are still getting fetched, false means already fetched
   */
  isLoading: boolean = true;

  constructor(private memeService: MemeService, private router : Router) { }

  ngOnInit(): void {
    /**
     * @description Calling necessary services to fetch 100 most recently uploaded memes from remote server
     */
    this.memeService.getMemes().subscribe((data) => {
      this.isLoading = false;
      this.memes = data;
    }, (_) => {
      window.alert("Memes Could Not Fetched");
      this.router.navigate(["page-not-found"]);
    });
  }

}
