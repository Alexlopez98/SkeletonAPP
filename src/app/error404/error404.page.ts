import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   

import { IonContent, IonButton } from '@ionic/angular/standalone';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,       
    IonContent,
    IonButton,
    LottieComponent
  ],
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss']
})
export class Error404Page {}
