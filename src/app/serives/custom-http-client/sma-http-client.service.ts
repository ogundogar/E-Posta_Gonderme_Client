import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { SirketMailAdresi } from '../../entities/SirketMailAdresleri';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmaHttpClientService {

	constructor(private httpClientService:HttpClientService) { }

	async get(successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{sirketMailAdresleri:SirketMailAdresi[];}>{

		const PromiseData:Promise<{sirketMailAdresleri:SirketMailAdresi[];}>=lastValueFrom(
		this.httpClientService.get<{sirketMailAdresleri:SirketMailAdresi[];}>({
		controller:"SirketMailAdresi"})
		);

		return await PromiseData;
	  }
	  async getWhere(displayName?:string,mailAdresi?:string,sifre?:string,portNumarasi?:Number,host?:string,Descending?:boolean):Promise<{sirketMailAdresleri:SirketMailAdresi[];}>{
		let queryString = "";
		if (displayName) {
			queryString += `displayName=${displayName}`;
		}
		if (mailAdresi) {
			queryString += `${queryString.length > 0 ? "&" : ""}mailAdresi=${mailAdresi}`;
		}
		if (sifre) {
			queryString += `${queryString.length > 0 ? "&" : ""}sifre=${sifre}`;
		}
		if (portNumarasi) {
			queryString += `${queryString.length > 0 ? "&" : ""}portNumarasi=${portNumarasi}`;
		}
		if (host) {
			queryString += `${queryString.length > 0 ? "&" : ""}host=${host}`;
		}
		if (Descending!=null) {
			queryString += `${queryString.length > 0 ? "&" : ""}Descending=${Descending}`;
		}
		const PromiseData:Promise<{sirketMailAdresleri:SirketMailAdresi[];}>=lastValueFrom(
		this.httpClientService.get<{sirketMailAdresleri:SirketMailAdresi[];}>({
		controller:"SirketMailAdresi",
		action: "GetWhere",
		queryString:queryString
	}));
		return await PromiseData;
	  }

  create(sirketMailAdresi: SirketMailAdresi, successCallBack?: () => void){
	this.httpClientService.post({
		controller:"SirketMailAdresi",
	},sirketMailAdresi).subscribe(result=>{ 
		successCallBack()});
  }

  put(){}

   delete(id: number, successCallBack?: () => void) {
     this.httpClientService.delete<any>({
      controller: "SirketMailAdresi"
    }, id).subscribe(result=>{ 
		successCallBack()});
  }
}
