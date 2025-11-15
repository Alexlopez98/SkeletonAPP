import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DbtaskService {
  public database!: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isWeb: boolean = false;
  private tablaSesion: string = "CREATE TABLE IF NOT EXISTS sesion_data (user_name TEXT PRIMARY KEY NOT NULL, password INTEGER NOT NULL, active INTEGER NOT NULL);";

  constructor(
    private platform: Platform, 
    private sqlite: SQLite,
    private storage: Storage
  ) {
    this.isWeb = !this.platform.is('capacitor') && !this.platform.is('cordova');
    this.crearBD();
  }

  async crearBD() {
    await this.storage.create(); 

    this.platform.ready().then(() => {
      if (this.isWeb) {
        console.warn('SQLite no es compatible en web. El servicio de sesión usará Ionic Storage.');
        this.isDbReady.next(true);
        return;
      }

      this.sqlite.create({
        name: 'skeleton.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      })
      .catch(e => console.error('Error al crear la BD SQLite', e));
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaSesion, []);
      this.isDbReady.next(true);
    } catch (e) {
      console.error("Error al crear la tabla 'sesion_data'", e);
    }
  }

  async validarUsuario(user: string, pass: number) {
    if (this.isWeb) {
      const usuarios = await this.storage.get('sesion_data_web') || [];
      const usuarioEncontrado = usuarios.find((u: any) => u.user_name === user && u.password === pass);
      return Promise.resolve({ rows: { length: usuarioEncontrado ? 1 : 0 } });
    }
    
    return this.database.executeSql('SELECT * FROM sesion_data WHERE user_name = ? AND password = ?', [user, pass]);
  }

  async registrarUsuario(user: string, pass: number) {
    if (this.isWeb) {
      let usuarios = await this.storage.get('sesion_data_web') || [];
      const usuarioEncontrado = usuarios.find((u: any) => u.user_name === user);
      if (usuarioEncontrado) {
        return Promise.reject('El usuario ya existe');
      }
      usuarios.push({ user_name: user, password: pass, active: 1 });
      await this.storage.set('sesion_data_web', usuarios);
      return Promise.resolve();
    }

    let data = [user, pass, 1];
    return this.database.executeSql('INSERT INTO sesion_data(user_name, password, active) VALUES(?, ?, ?)', data);
  }

  async actualizarSesion(user: string, active: number) {
    if (this.isWeb) {
      let usuarios = await this.storage.get('sesion_data_web') || [];
      const index = usuarios.findIndex((u: any) => u.user_name === user);
      if (index > -1) {
        usuarios[index].active = active;
        await this.storage.set('sesion_data_web', usuarios);
      }
      return Promise.resolve();
    }

    return this.database.executeSql('UPDATE sesion_data SET active = ? WHERE user_name = ?', [active, user]);
  }

  async consultarSesionActiva() {
    if (this.isWeb) {
      const usuarios = await this.storage.get('sesion_data_web') || [];
      const sesionActiva = usuarios.some((u: any) => u.active === 1);
      return Promise.resolve(sesionActiva);
    }

    return this.database.executeSql('SELECT * FROM sesion_data WHERE active = 1', [])
      .then(res => {
        return res.rows.length > 0;
      });
  }


  async obtenerUsuarioActivo() {
    if (this.isWeb) {
      const usuarios = await this.storage.get('sesion_data_web') || [];
      const usuarioActivo = usuarios.find((u: any) => u.active === 1);
      return usuarioActivo ? usuarioActivo.user_name : null;
    }

    return this.database.executeSql('SELECT user_name FROM sesion_data WHERE active = 1', [])
      .then(res => {
        if (res.rows.length > 0) {
          return res.rows.item(0).user_name;
        }
        return null;
      });
  }
}