import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/_services/actor.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit {

  currentActor: Actor = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    imageUrl: '',
    gender: ''
  };

  actorId: string = '';


  constructor(
    private actorService: ActorService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params.id;
    this.getActor(this.actorId);
  }


  getActor(id: any): void {
    this.actorService.getOne(id)
      .subscribe(
        data => {
          this.currentActor = data;
          if (this.currentActor.birthDate === "Not updated") {
            this.currentActor.birthDate = "Brak danych";
          }
          if (this.currentActor.gender === null) {
            this.currentActor.gender = "Brak danych";
          }
      });
  }

  editActor(): void {
    const notifier = this.injector.get(NotificationService);
    const data = {
      firstName: this.currentActor.firstName,
      lastName: this.currentActor.lastName,
      birthDate: this.currentActor.birthDate,
      imageUrl: this.currentActor.imageUrl,
      gender: this.currentActor.gender
    };

    this.actorService.updateActor(this.actorId, data)
      .subscribe(
        req => {
          this.router.navigate([`/actors/${this.actorId}`])
          notifier.showSuccess('Aktor został zaktualizowany!');
      });
  }

}
