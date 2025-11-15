import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DbtaskService } from '../services/dbtask'; 
import { AlertController } from '@ionic/angular';

import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  usuario: string = '';
  password: string = '';


  constructor(
    private router: Router,
    private dbtaskService: DbtaskService, 
    private alertCtrl: AlertController     
  ) {}

  login() {
    if (!this.validarCampos()) {
      return; 
    }

    const passNum = parseInt(this.password);

    this.dbtaskService.validarUsuario(this.usuario, passNum)
      .then(res => {
        if (res.rows.length > 0) {
          this.dbtaskService.actualizarSesion(this.usuario, 1);
          this.router.navigate(['/home'], {
            state: { usuario: this.usuario }
          });
        } else {
          this.presentAlert('Error', 'Usuario o contraseña incorrectos.');
        }
      })
      .catch(e => this.presentAlert('Error', 'Error al iniciar sesión: ' + e));
  }

  registrar() {
    if (!this.validarCampos()) {
      return; 
    }

    const passNum = parseInt(this.password);

    this.dbtaskService.registrarUsuario(this.usuario, passNum)
      .then(res => {
        this.presentAlert('Éxito', 'Usuario registrado correctamente.');
        this.router.navigate(['/home'], {
          state: { usuario: this.usuario }
        });
      })
      .catch(e => {
        this.presentAlert('Error', 'El usuario ya existe.');
      });
  }


  validarCampos(): boolean {
    const userRegex = /^[a-zA-Z]{3,8}$/;
    const passRegex = /^[0-9]{4}$/;

    if (!userRegex.test(this.usuario)) {
      this.presentAlert('Error de Validación', 'El usuario debe tener entre 3 y 8 letras.');
      return false;
    }
    if (!passRegex.test(this.password)) {
      this.presentAlert('Error de Validación', 'La contraseña debe tener exactamente 4 números.');
      return false;
    }
    return true;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}