import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { YollananMail } from '../../entities/YollananMailler';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YmHttpClientService {

	constructor(private httpClientService:HttpClientService) { }
	
	async get():Promise<{yollananMailler:YollananMail[];}>{

		const PromiseData:Promise<{yollananMailler:YollananMail[];}>=lastValueFrom(
		this.httpClientService.get<{yollananMailler:YollananMail[];}>({
		controller:"YollananMail"})
		);

		return await PromiseData;
	}

	async getWhere(sirketMailAdresi?:string,baslik?:string,tarih?:Date,Descending?:boolean):Promise<{yollananMailler:YollananMail[];}>{
		let queryString = "";
		if (sirketMailAdresi) {
			queryString += `sirketMailAdresi=${sirketMailAdresi}`;
		}
		if (baslik) {
			queryString += `${queryString.length > 0 ? "&" : ""}baslik=${baslik}`;
		}
		if (String(tarih) != 'Invalid Date') {
			queryString += `${queryString.length > 0 ? "&" : ""}tarih=${tarih}`;
		}
		if (Descending!=null) {
			queryString += `${queryString.length > 0 ? "&" : ""}Descending=${Descending}`;
		}
		const PromiseData:Promise<{yollananMailler:YollananMail[];}>=lastValueFrom(
		this.httpClientService.get<{yollananMailler:YollananMail[];}>({
		controller:"YollananMail",
		action: "GetWhere",
		queryString:queryString
	}));
		return await PromiseData;
	}

	create(yollananMail: YollananMail, successCallBack?: () => void){
	this.httpClientService.post({
		controller:"YollananMail",
	},yollananMail).subscribe(result=>{ 
		successCallBack()});
	}

	put(){}

	delete(id: number,successCallBack?: () => void,) {
    this.httpClientService.delete<any>({
      controller: "YollananMail"
    }, id).subscribe(result=>{ 
		successCallBack()});
  }
}
