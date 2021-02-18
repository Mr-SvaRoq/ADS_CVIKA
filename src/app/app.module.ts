import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Cviko1Component } from './cviko1/cviko1.component';

@NgModule({
  declarations: [
    AppComponent,
    Cviko1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
