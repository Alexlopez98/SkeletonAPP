import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { DbtaskService } from '../services/dbtask';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ],
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss']
})
export class MisDatosPage {

  datos = {
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    telefono: ''
  };

  private usuarioActivo: string | null = ''; 

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private dbtaskService: DbtaskService 
  ) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
  }

  async ionViewWillEnter() {
    if (!this.usuarioActivo) {
      this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
    }
    const guardados = await this.storage.get(`misDatos_${this.usuarioActivo}`);
    if (guardados) {
      this.datos = guardados;
    }
  }

  async guardar() {
    await this.storage.set(`misDatos_${this.usuarioActivo}`, this.datos);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Datos guardados correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }
}