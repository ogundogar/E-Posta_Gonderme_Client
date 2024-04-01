import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { KmaTablosuComponent } from './components/main-content/table/kma-tablosu/kma-tablosu.component';
import { SmaTablosuComponent } from './components/main-content/table/sma-tablosu/sma-tablosu.component';
import { YmTablosuComponent } from './components/main-content/table/ym-tablosu/ym-tablosu.component';

export const routes: Routes = [
	{path:"",component:MainContentComponent},
	{path:"kma-tablosu",component:KmaTablosuComponent},
	{path:"sma-tablosu",component:SmaTablosuComponent},
	{path:"ym-tablosu",component:YmTablosuComponent}

];
