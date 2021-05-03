import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/_services/actor.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {

  currentActor: Actor = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    imageUrl: '',
    gender: ''
  };

  isLoggedIn = false;
  showAdminButtons = false;
  role: string = '';

  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private injector: Injector,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActor(this.route.snapshot.params.id);

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.role = user.role;

      this.showAdminButtons = this.role.includes('ROLE_ADMIN');
    }
  }

  getActor(id: any): void {
    this.actorService.getOne(id)
      .subscribe(
        data => {
          this.currentActor = data;
          this.checkAndUpdateGender();
          this.checkAndUpdateBirthdate();
      });
  }

  editActor(): void {
    this.router.navigate([`/actors/${this.currentActor.id}/edit`]);
  }


  deleteActor(): void {
    const notifier = this.injector.get(NotificationService);
    this.actorService.deleteActor(this.currentActor.id)
      .subscribe(
        req => {
          this.router.navigate([`/movies`]);
          notifier.showSuccess("Aktor został usunięty !");
        }
      )
  }

  checkAndUpdateGender(): void {
    let gender = this.currentActor.gender;
    switch (gender) {
      case "MAN":
        this.currentActor.gender = "Mężczyzna";
        break;
      case "WOMEN":
        this.currentActor.gender = "Kobieta";
        break;
      case "NONE":
        this.currentActor.gender = "Brak danych";
        break;
      case null:
        this.currentActor.gender = "Brak danych";
        break;
    };
  }

  checkAndUpdateBirthdate(): void {
    let birthdate = this.currentActor.birthDate;
    switch(birthdate) {
      case "Not updated":
        this.currentActor.birthDate = "Brak danych";
        break;
      case null:
        this.currentActor.birthDate = "Brak danych";
        break;
    };
  }


}
