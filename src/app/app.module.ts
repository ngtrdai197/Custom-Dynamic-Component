import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCommunityComponent } from './my-community/my-community.component';
import { MyOptionsComponent } from './my-options/my-options.component';

@NgModule({
  declarations: [
    AppComponent,
    MyCommunityComponent,
    MyOptionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
