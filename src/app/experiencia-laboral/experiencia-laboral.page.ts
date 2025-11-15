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
  IonButton,
  IonList,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/angular/standalone';
import { DbtaskService } from '../services/dbtask';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-experiencia-laboral',
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
    IonButton,
    IonList,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ],
  templateUrl: './experiencia-laboral.page.html',
  styleUrls: ['./experiencia-laboral.page.scss']
})
export class ExperienciaLaboralPage {

  nueva = {
    empresa: '',
    cargo: '',
    anios: ''
  };
  lista: any[] = [];
  private usuarioActivo: string | null = ''; 

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private dbtaskService: DbtaskService
  ) {
    this.initStorage();
    addIcons({
      trash
    });
  }

  async initStorage() {
    await this.storage.create();
    this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
  }

  async ionViewWillEnter() {
    if (!this.usuarioActivo) {
      this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
    }
    const guardado = await this.storage.get(`experiencias_${this.usuarioActivo}`);
    if (guardado) this.lista = guardado;
  }

  async agregar() {
    if (!this.nueva.empresa || !this.nueva.cargo) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Empresa y Cargo son obligatorios',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    this.lista.push({ ...this.nueva });
    await this.storage.set(`experiencias_${this.usuarioActivo}`, this.lista);
    this.nueva = { empresa: '', cargo: '', anios: '' };
  }

  async eliminar(i: number) {
    this.lista.splice(i, 1);
    await this.storage.set(`experiencias_${this.usuarioActivo}`, this.lista);
  }
}