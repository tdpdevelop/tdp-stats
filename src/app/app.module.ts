import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent     } from './app.component';
import { HomeComponent    } from './pages/home/home.component';
import { AsideComponent   } from './pages/aside/aside.component';

import { SidebarModule    } from 'primeng/sidebar';
import { ButtonModule     } from 'primeng/button';
import { MenubarModule    } from 'primeng/menubar';
import { InGameComponent  } from './pages/in-game/in-game.component';
import { DataViewModule   } from 'primeng/dataview';
import { RippleModule     } from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsideComponent,
    InGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    DataViewModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
