import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, briefcaseOutline, schoolOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonRouterOutlet
  ]
})
export class HomePage {

  constructor(
    private router: Router
  ) {
    addIcons({
      personOutline,
      briefcaseOutline,
      schoolOutline
    });
  }

  segmentChanged($event: any) {
    let direction = $event.detail.value;
    this.router.navigate(['home/' + direction]);
  }
}