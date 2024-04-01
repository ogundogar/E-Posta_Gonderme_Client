import {Component, ViewChild } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { KullaniciMailAdresi } from '../../../../entities/KullaniciMailAdresi';
import { KmaHttpClientService } from '../../../../serives/custom-http-client/kma-http-client.service';
import { KullaniciEklemeService } from '../../../../serives/kullanici-ekleme.service';




@Component({
  selector: 'app-kma-tablosu',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './kma-tablosu.component.html',
  styleUrl: './kma-tablosu.component.css'
})
export class KmaTablosuComponent {
	private datas=[];
	private cinsiyet:boolean;
	constructor(private kmaHttpClient:KmaHttpClientService,private kullaniciEklemeService:KullaniciEklemeService){}

	displayedColumns: string[] = ['secme','id','ad', 'soyad', 'mailAdresi', 'dogumTarihi','cinsiyet','telefonNumarasi','isYeri','unvan'];
	dataSource: MatTableDataSource<KullaniciMailAdresi> = null;
	
	
	ngOnInit() {
		this.get();
	}
	clickEkleme(){
		this.kullaniciEklemeService.pencere();
	}
	clickSilme(){
		this.datas.forEach(data => {this.kmaHttpClient.delete(data);});
		this.datas=[];
	}
	onCheckboxChange(event: any,id:number){
		this.datas.push(id);
		console.log(this.datas);
	}
	clickCinsiyet(cinsiyet){
		if(cinsiyet.id=="erkek")
		this.cinsiyet=true;
		else if(cinsiyet.id=="kadin")
		this.cinsiyet=false;
		}
	async get(){
		const all_KMA:{ kullaniciMailAdresleri: KullaniciMailAdresi[]; } = await this.kmaHttpClient.get();
		this.dataSource=new MatTableDataSource<KullaniciMailAdresi>(all_KMA.kullaniciMailAdresleri);
	}
	async clickFiltrele(ad?:HTMLInputElement,soyad?:HTMLInputElement,isYeri?:HTMLInputElement,baslangicTarihi?:HTMLInputElement,bitisTarihi?:HTMLInputElement,Descending?:HTMLInputElement){
		const allKMA:{ kullaniciMailAdresleri: KullaniciMailAdresi[]; } = await this.kmaHttpClient.getWhere(ad.value,soyad.value,isYeri.value,this.cinsiyet,new Date(baslangicTarihi.value),new Date(bitisTarihi.value),Boolean(Descending.value));
		this.dataSource=new MatTableDataSource<KullaniciMailAdresi>(allKMA.kullaniciMailAdresleri);
	}


}
