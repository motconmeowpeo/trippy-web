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
  apiKey: 'AIzaSyCc4VBVIu_dvt9SE57dj8fMBYDlgPCidqg',
  authDomain: 'trippy-3dc63.firebaseapp.com',
  projectId: 'trippy-3dc63',
  storageBucket: 'trippy-3dc63',
  messagingSenderId: '414110793136',
  appId: '1:414110793136:web:8bf17ce2e644df61a6aa75',
  measurementId: 'G-RXCXF78T58',
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
export class AppModule {}
