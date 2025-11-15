import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { DbtaskService } from './services/dbtask'; 
import { addIcons } from 'ionicons';
import { homeOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterModule,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuToggle,
  ],
})
export class AppComponent {
  
  constructor(
    private dbtaskService: DbtaskService,
    private router: Router
  ) {
    
    addIcons({
      homeOutline,
      logOutOutline
    });
  }

  async logout() {
    try {
      const usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
      
      if (usuarioActivo) {
        await this.dbtaskService.actualizarSesion(usuarioActivo, 0);
      }
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    } finally {
      this.router.navigate(['/login']);
    }
  }
}