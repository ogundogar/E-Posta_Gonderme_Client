import { Component } from '@angular/core';
import { YollananMail } from '../../../../entities/YollananMailler';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { YmHttpClientService } from '../../../../serives/custom-http-client/ym-http-client.service';
import { MailYollamaService } from '../../../../serives/mail-yollama.service';
import { SirketMailAdresi } from '../../../../entities/SirketMailAdresleri';
import { KmaHttpClientService } from '../../../../serives/custom-http-client/kma-http-client.service';
import { SmaHttpClientService } from '../../../../serives/custom-http-client/sma-http-client.service';
import { KullaniciMailAdresi } from '../../../../entities/KullaniciMailAdresi';

@Component({
  selector: 'app-ym-tablosu',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './ym-tablosu.component.html',
  styleUrl: './ym-tablosu.component.css'
})
export class YmTablosuComponent {
	private datas=[];
	private smaData=[];
	private kmaData=[];

	displayedColumns: string[] = ['secme','id','sirketMailAdresi', 'kullaniciMailAdresi', 'baslik', 'mesaj','createDate'];
	dataSource: MatTableDataSource<YollananMail> = null;

	constructor(private ymHttpClient:YmHttpClientService,private mailYollamaService:MailYollamaService){}

	ngOnInit() {
		this.get();
	}
	clickEkleme(){
		this.mailYollamaService.pencere();
	}
	clickSilme(){
		console.log(this.datas);
	this.datas.forEach(data => {this.ymHttpClient.delete(data);});
	alert("Silme işlemi başarılı bir şekilde gerçekleşmiştir.");
	this.datas=[];
	}
	onCheckboxChange(event: any,id:number){
		this.datas.push(id);
		console.log(this.datas)
	}
	async get(){
		const all_ym:{yollananMailler:YollananMail[];} = await this.ymHttpClient.get();
		this.dataSource=new MatTableDataSource<YollananMail>(all_ym.yollananMailler);
	}
	async clickFiltrele(sirketMailAdresi?:HTMLInputElement,baslik?:HTMLInputElement,tarih?:HTMLInputElement,Descending?:HTMLInputElement){
		
		const allYM:{yollananMailler:YollananMail[];} = await this.ymHttpClient.getWhere(sirketMailAdresi.value,baslik.value,new Date(tarih.value),Boolean(Descending.value));
		this.dataSource=new MatTableDataSource<YollananMail>(allYM.yollananMailler);
	}
}
