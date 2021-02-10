import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IMeme } from '../model/IMeme.model';

/**
 * @description This component encapsulates Each Meme which already been uploaded
 * @description This Component is nested under MemeListComponent where for each meme, this component is rendered
 */
@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {
  /**
   * @description Represents two-way binded model of a meme
   */
  @Input() meme: IMeme;

  /**
   * @param router Router for redirecting to seperate component upon some event
   */
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
   * @description This method responsible for redirecting to edit-meme page after Edit Meme button is clicked
   * @returns {void}
   */
  editMeme(): void {
    this.router.navigate(["edit-meme", this.meme.id]);
  }
}
