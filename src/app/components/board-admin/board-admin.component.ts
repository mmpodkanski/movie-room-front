import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { AdminService } from 'src/app/_services/admin.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users?: User[];
  movies?: Movie[];
  areRequests = false;

  user: User = {
    id: '',
    username: '',
    email: '',
    role: '',
    locked: false,
    enabled: true,
  };



  constructor(
    private userService: UserService,
    private adminService: AdminService
    ) { }

  ngOnInit(): void {
    this.showUsersList();
    this.showMoviesToAccept();
  }

  showUsersList(): void {
    this.adminService.getAllUsers()
      .subscribe(
        data =>  {
        this.users = data;
      });
  };
 
  showMoviesToAccept(): void {
    this.adminService.getAllMoviesRequests()
      .subscribe(
        data => {
          this.movies = data;
          if(data.length > 0) {
            this.areRequests = true;
          }
      });
  };

  toggleUserStatus(id: any): void {
    this.adminService.toggleUserStatus(id)
      .subscribe(
        response => {
          this.reloadPage();
      });
  };

  acceptMovieRequest(id: any): void {
    this.adminService.acceptMovieRequest(id)
      .subscribe(
        response => {
          this.reloadPage();
      });
  };
  
  
  refuseMovieRequest(id: any): void {
    this.adminService.refuseMovieRequest(id)
      .subscribe(
        resp => {
          this.reloadPage();
      });
  };


  reloadPage(): void {
    window.location.reload();
  };
}
