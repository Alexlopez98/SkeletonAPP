import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  usuario: string = '';
  password: string = '';
  error: string = '';

  constructor(private navCtrl: NavController) {}

  login() {
    const userRegex = /^[a-zA-Z0-9]{3,8}$/;
    const passRegex = /^[0-9]{4}$/;

    if (!userRegex.test(this.usuario)) {
      this.error = 'El usuario debe tener entre 3 y 8 caracteres alfanuméricos.';
      return;
    }

    if (!passRegex.test(this.password)) {
      this.error = 'La contraseña debe tener exactamente 4 números.';
      return;
    }

    this.error = '';
    this.navCtrl.navigateForward('/home', {
      queryParams: { usuario: this.usuario }
    });
  }
}
