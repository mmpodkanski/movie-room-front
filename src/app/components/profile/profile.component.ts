import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  movies?: Movie[];

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getFavourites();
  }


  getFavourites(): void {
    this.userService.getUserFavourites(this.currentUser.id)
      .subscribe(
        data => {
          this.movies = data;
      });
  }


  goToMovie(movie: Movie): void {
    this.router.navigate([`/movies/${movie.id}`]);
  }
}
