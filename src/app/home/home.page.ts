import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class HomePage {
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fecha: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private renderer: Renderer2
  ) {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'] || '';
    });
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fecha = null;

    // Dispara la animación solo en los inputs de nombre y apellido
    const nombreEl = document.getElementById('nombreInput');
    const apellidoEl = document.getElementById('apellidoInput');

    if (nombreEl && apellidoEl) {
      this.renderer.addClass(nombreEl, 'slide');
      this.renderer.addClass(apellidoEl, 'slide');

      setTimeout(() => {
        this.renderer.removeClass(nombreEl, 'slide');
        this.renderer.removeClass(apellidoEl, 'slide');
      }, 1000); // 1 segundo
    }
  }

  async mostrar() {
    const alert = await this.alertCtrl.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['yes']
    });
    await alert.present();
  }
}
