import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './sidebar/sidebar.component';
import { KmaTablosuComponent } from './table/kma-tablosu/kma-tablosu.component';
import { SmaTablosuComponent } from './table/sma-tablosu/sma-tablosu.component';
import { YmTablosuComponent } from './table/ym-tablosu/ym-tablosu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule,SidebarComponent,KmaTablosuComponent,SmaTablosuComponent,YmTablosuComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
