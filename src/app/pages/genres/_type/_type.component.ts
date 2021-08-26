import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinct, filter, first, map } from 'rxjs/operators';
import { Song } from 'src/app/song/song.interface';
import { SongService } from 'src/app/song/song.service';

@Component({
  selector: 'page-genres-type',
  templateUrl: './_type.component.html',
  styleUrls: ['./_type.component.scss']
})
export class GenresTypePage implements OnInit, OnDestroy, AfterViewInit {
  type = '';
  songs: Song[] = [];

  private currentPage = 1;
  private paramSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    this.getType();
    this.loadSong();
  }

  ngAfterViewInit(): void {
    fromEvent(document, 'scroll')
      .pipe(
        map(() => window.scrollY),
        filter(
          current =>
            current >= document.body.clientHeight - window.innerHeight - 200
        ),
        debounceTime(200),
        distinct()
      )
      .subscribe(() => this.loadSong());
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  private getType(): void {
    this.paramSubscription = this.route.params.subscribe(param => {
      this.type = param['type'];
    });
  }

  private loadSong() {
    this.songService
      .getSongList({ size: 30, page: this.currentPage })
      .pipe(first())
      .subscribe(songs => {
        this.currentPage++;
        this.songs = [...this.songs, ...songs];
      });
  }
}
