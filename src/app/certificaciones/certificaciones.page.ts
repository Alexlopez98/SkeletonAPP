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
  IonItemOption,
  IonCheckbox
} from '@ionic/angular/standalone';
import { DbtaskService } from '../services/dbtask';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-certificaciones',
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
    IonItemOption,
    IonCheckbox
  ],
  templateUrl: './certificaciones.page.html',
  styleUrls: ['./certificaciones.page.scss']
})
export class CertificacionesPage {

  cert = {
    nombre: '',
    fechaObtencion: '',
    tieneVencimiento: false,
    fechaVencimiento: ''
  };

  lista: any[] = [];
  private usuarioActivo: string | null = ''; 

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private dbtaskService: DbtaskService
  ) {
    this.initStorage();
    addIcons({ trash });
  }

  async initStorage() {
    await this.storage.create();
    this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
  }

  async ionViewWillEnter() {
    if (!this.usuarioActivo) {
      this.usuarioActivo = await this.dbtaskService.obtenerUsuarioActivo();
    }
    const guardado = await this.storage.get(`certificaciones_${this.usuarioActivo}`);
    if (guardado) this.lista = guardado;
  }

  async agregar() {
    if (!this.cert.nombre || !this.cert.fechaObtencion) {
      this.mostrarAlerta('Error', 'Nombre y Fecha de Obtención son obligatorios');
      return;
    }

    if (this.cert.tieneVencimiento && !this.cert.fechaVencimiento) {
      this.mostrarAlerta('Error', 'Debe indicar la fecha de vencimiento');
      return;
    }

    this.lista.push({ ...this.cert });
    await this.storage.set(`certificaciones_${this.usuarioActivo}`, this.lista);
    
    this.cert = { nombre: '', fechaObtencion: '', tieneVencimiento: false, fechaVencimiento: '' };
  }

  async eliminar(i: number) {
    this.lista.splice(i, 1);
    await this.storage.set(`certificaciones_${this.usuarioActivo}`, this.lista);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}