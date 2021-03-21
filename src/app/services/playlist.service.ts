import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Playlist } from '../interfaces/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlistForm;
  modalTitle: string;

  activePlaylist: Playlist;
  tempActivePlaylist: Playlist;

  playlists: Playlist[] = [
    {
      name: 'Kopikustik',
      totalDuration: 5,
      totalSongs: 2,
      description: 'More than a coffee, this is all of your favorite accoustic songs.',
      songs: [
        {
          title: 'Cigarettes of ours',
          artist: 'Ardhito Pramono',
          duration: 3
        },
        {
          title: 'Walking Back Home',
          artist: 'Vira Talisa',
          duration: 2
        },
      ]
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5
        },
      ]
    }
  ];

  constructor(public modalService: NgbModal, public fb: FormBuilder) { 
    this.playlistForm = this.fb.group({
      name: [],
      description: [],
      songs: this.fb.array([])
    });
  }

  get songsArrayForm() {
    return this.playlistForm.get('songs') as FormArray;
  }

  open(content, playlist?) {
    if (playlist) {
      this.modalTitle = 'Edit Playlist';
      this.activePlaylist = playlist;
      // Save original data for restore when cancel
      this.tempActivePlaylist = JSON.parse(JSON.stringify(playlist));
    } else {
      this.modalTitle = 'Create New Playlist'
      this.activePlaylist = {
        name: '',
        description: '',
        songs: [{
          title: '',
          artist: '',
          duration: 0,
        },{
          title: '',
          artist: '',
          duration: 0,
        }],
        totalDuration: 0,
        totalSongs: 0
      };
    }
    this.updateSongsFormArray();

    this.modalService.open(content, {size: 'xl'}).result.then(() => {
      // Save function
      this.activePlaylist.totalSongs = this.activePlaylist.songs.length;
      this.activePlaylist.totalDuration = 0;
      this.activePlaylist.songs.forEach(song => {
        this.activePlaylist.totalDuration += song.duration
      });

      // Save the playlist if it's a new playlist
      if (!playlist) {
        this.playlists.push(this.activePlaylist);
      }
    }, () => {
      // Function when cancel add/save playlist
     Object.assign(this.activePlaylist, this.tempActivePlaylist);
    }).finally(() => this.tempActivePlaylist = null);
  }

  deletePlaylist(index: number): void {
    this.playlists.splice(index, 1);
  }

  removeSongFromPlaylist(playlist: Playlist, songIndex: number): void {
    if (!playlist || songIndex === undefined) {
      return;
    }
    // Splice(remove) song by song index
    playlist.songs.splice(songIndex, 1);
    this.updateSongsFormArray()
  }

  addSongToPlaylist(playlist: Playlist) {
    playlist.songs.push({
      title: '',
      artist: '',
      duration: 0,
    });
    this.updateSongsFormArray()
  }

  updateSongsFormArray() {
    this.songsArrayForm.clear();
    this.activePlaylist.songs.forEach(() => {
      this.songsArrayForm.push(
        this.fb.group({
          title: [], artist: [], duration: ['', Validators.min(0)]
        })
      );
    })
  }
}
