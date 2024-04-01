import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { KullaniciMailAdresi } from '../../entities/KullaniciMailAdresi';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KmaHttpClientService {
  constructor(private httpClientService:HttpClientService){}
	
 	async get():Promise<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>{
		const PromiseData:Promise<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>=lastValueFrom(
		this.httpClientService.get<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>({
		controller:"KullaniciMailAdresi"}));
		return await PromiseData;
	  }

	async getWhere(ad?:string,soyad?:string,isYeri?:string,cinsiyet?:boolean,baslangicTarihi?:Date,bitisTarihi?:Date,Descending?:boolean):Promise<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>{
		let queryString = "";
		if (ad) {
			queryString += `ad=${ad}`;
		}
		if (soyad) {
			queryString += `${queryString.length > 0 ? "&" : ""}soyad=${soyad}`;
		}
		if (isYeri) {
			queryString += `${queryString.length > 0 ? "&" : ""}isYeri=${isYeri}`;
		}
		if (cinsiyet!=null) {
			queryString += `${queryString.length > 0 ? "&" : ""}cinsiyet=${cinsiyet}`;
		}
		if (String(baslangicTarihi) != 'Invalid Date') {
			queryString += `${queryString.length > 0 ? "&" : ""}baslangicTarihi=${baslangicTarihi}`;
		}
		if (String(bitisTarihi) != 'Invalid Date') {
			queryString += `${queryString.length > 0 ? "&" : ""}bitisTarihi=${bitisTarihi}`;
		}
		if (Descending!=null) {
			queryString += `${queryString.length > 0 ? "&" : ""}Descending=${Descending}`;
		}
		const PromiseData:Promise<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>=lastValueFrom(
		this.httpClientService.get<{kullaniciMailAdresleri:KullaniciMailAdresi[]}>({
		controller:"KullaniciMailAdresi",
		action: "GetWhere",
		queryString:queryString
	}));
		return await PromiseData;
	  }

	create(Kullanici: KullaniciMailAdresi, successCallBack?: () => void){
	this.httpClientService.post({
		controller:"KullaniciMailAdresi",
	},Kullanici).subscribe(result=>{ successCallBack()});}

	put(){}

	delete(id: number, successCallBack?: () => void) {
	this.httpClientService.delete<any>({controller: "KullaniciMailAdresi" }, id)
		.subscribe(result=>{ successCallBack()});}

}
