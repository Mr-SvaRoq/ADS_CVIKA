import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Cviko1Component } from './cviko1/cviko1.component';
import {FormsModule} from '@angular/forms';
import { Cviko2Component } from './cviko2/cviko2.component';
import { Cviko3Component } from './cviko3/cviko3.component';

@NgModule({
  declarations: [
    AppComponent,
    Cviko1Component,
    Cviko2Component,
    Cviko3Component
  ],
    imports: [
        BrowserModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
