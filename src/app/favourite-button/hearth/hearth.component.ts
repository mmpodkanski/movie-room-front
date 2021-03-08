import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-hearth-button',
  templateUrl: './hearth.component.html',
  providers: [HearthButton],
  styleUrls: ['./hearth.component.css']
})
export class HearthButton implements OnInit {
  selected?: boolean;
  movieId?: any;

  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id;
    this.checkedByUser();
  }

  public toggleSelected() {
    if (this.selected) {
      this.movieService.removeFromFavourites(this.movieId)
        .subscribe(
          response => {
            this.selected = !this.selected;
            this.selectedChange.emit(this.selected);
      });
    } else {
      this.movieService.addToFavourites(this.movieId)
        .subscribe(
          response => {
            this.selected = !this.selected;
            this.selectedChange.emit(this.selected);
      });
    }
  };

  checkedByUser(): void {
    this.movieService.checkFavourite(this.movieId)
    .subscribe(
      response => {
        this.selected = response;
      }
    )
  }

  


}