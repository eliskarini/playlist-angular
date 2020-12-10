import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service'

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.css']
})
export class PlaylistItemComponent implements OnInit {
  @Input() playlist: object;
  @Input() modalTemplate: ElementRef;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
  }

}
