import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app/app.routes';
import { provideIonicAngular, IonicRouteStrategy } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from '@angular/router';
import { Drivers, Storage } from '@ionic/storage';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular({
      mode: 'md',
    }),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideLottieOptions({
      player: () => player
    }),

    {
      provide: Storage,
      useFactory: () => {
        const storage = new Storage({
          name: '__zipiDB',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        storage.create();
        return storage;
      }
    },
    
    SQLite
  ]
});