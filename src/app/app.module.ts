import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule   } from './app-routing.module';
import { AppComponent       } from './app.component';
import { HomeComponent      } from './pages/home/home.component';
import { AsideComponent     } from './pages/aside/aside.component';
import { PlayerComponent    } from './pages/player/player.component';

import { SidebarModule      } from 'primeng/sidebar';
import { ButtonModule       } from 'primeng/button';
import { MenubarModule      } from 'primeng/menubar';
import { InGameComponent    } from './pages/in-game/in-game.component';
import { DataViewModule     } from 'primeng/dataview';
import { RippleModule       } from "primeng/ripple";
import { DialogModule       } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule        } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule  } from 'primeng/inputswitch';
import { ListboxModule      } from 'primeng/listbox';
import { CardModule         } from 'primeng/card';
import { DividerModule      } from 'primeng/divider';
import { TableModule        } from 'primeng/table';
import { PanelModule        } from 'primeng/panel';
import { DragDropModule     } from 'primeng/dragdrop';
import { FileUploadModule   } from 'primeng/fileupload';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsideComponent,
    InGameComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    DataViewModule,
    RippleModule,
    DialogModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ListboxModule,
    CardModule,
    DividerModule,
    TableModule,
    PanelModule,
    DragDropModule,
    FileUploadModule
  ],
  exports : [
    PlayerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
