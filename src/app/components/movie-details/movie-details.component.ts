import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { Actor } from 'src/app/models/actor.model';
import { MovieService } from 'src/app/_services/movie.service';
import { Comment } from 'src/app/models/comment.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { not } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {
  @Input() comment: Comment= {
    ownerId: '',
    author: '',
    title: '',
    description: '',
    createdAt: ''
  };

  @Input() actor: Actor = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    imageUrl: ''
  };

  @Input() currentMovie: Movie = {
    id: '',
    releaseDate: '',
    title: '',
    description: '',
    director: '',
    writer: '',
    category: '',
    actors: [this.actor],
    comments: [this.comment],
    imgLogoUrl: '',
    imgBackUrl: ''
  };
  
  errorMsg?: string;
  selected?: boolean;
  isLoggedIn = false;
  showAdminButtons = false;
  role: string = '';

  constructor(
    private movieService: MovieService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private injector: Injector,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovie(this.route.snapshot.params.id);

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.role = user.role;

      this.showAdminButtons = this.role.includes('ROLE_ADMIN');
    }
    
  }

  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
          this.checkAndUpdateCategory();
      });
  }

  addComment(): void {
    const userId = this.tokenStorage.getUser().id;
    const data = {
      ownerId: userId,
      title: this.comment.title,
      description: this.comment.description
    };

    this.movieService.createComment(this.currentMovie.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.reloadPage();
        });
  };

  checkAndUpdateCategory(): void {
    switch (this.currentMovie.category) {
      case "DRAMA":
        this.currentMovie.category = "DRAMAT";
        break;
      case "ACTION":
        this.currentMovie.category = "AKCJA";
        break;
      case "COMEDY":
        this.currentMovie.category = "KOMEDIA";
        break;
      case "FANTASY":
        this.currentMovie.category = "KOMEDIA";
        break;
      case "ROMANCE":
        this.currentMovie.category = "ROMANS";
        break;
    };
  }


  editMovie(): void {
    this.router.navigate([`/movies/${this.currentMovie.id}/edit`]);
  }

  deleteMovie(): void {
    const notifier = this.injector.get(NotificationService);
    this.movieService.deleteMovieById(this.currentMovie.id)
      .subscribe(
        req => {
          this.router.navigate([`/movies`]);
          notifier.showSuccess("Film został usunięty !");
        }
    )
  }

  goToActor(id: any) {
    this.router.navigate([`/actors/${id}`]);
  }


  reloadPage(): void {
    window.location.reload();
  };


  

  

}
