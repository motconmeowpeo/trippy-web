import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterModule } from '@core/component/footer';
import { HeaderModule } from '@core/component/header';
import { RatingModule } from '@core/component/rating';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AuthInterceptor, ErrorMessageInterceptor } from '@core/services';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from '@core/guard';
import { IconsModule } from '@core/ui';
import { HttpService } from '@core/services/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBLmyT1VQYsb-Wo8GV_dUp1evDd_cvXy7M',
  authDomain: 'portfolio-403709.firebaseapp.com',
  projectId: 'portfolio-403709',
  storageBucket: 'portfolio-403709.appspot.com',
  messagingSenderId: '778215680092',
  appId: '1:778215680092:web:9aa50668733282508bde99',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    // BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HeaderModule,
    FooterModule,
    RatingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    IconsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => '',
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorMessageInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
