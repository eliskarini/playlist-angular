import { Component, OnInit, } from '@angular/core';

import { PlaylistService }  from 'src/app/services/playlist.service'

@Component({
  selector: 'playlist-data',
  templateUrl: './playlist-data.component.html',
  styleUrls: ['./playlist-data.component.css']
})
export class PlaylistDataComponent implements OnInit {
  playlistForm = this.playlistService.playlistForm;
  constructor(public playlistService: PlaylistService) { }

  playlists = this.playlistService.playlists;

  ngOnInit() {
  }
}
