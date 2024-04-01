import { Component } from '@angular/core';
import { SmaHttpClientService } from '../../../../serives/custom-http-client/sma-http-client.service';
import { SirketMailAdresi } from '../../../../entities/SirketMailAdresleri';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SirketMailEklemeService } from '../../../../serives/sirket-mail-ekleme.service';
import { log } from 'console';

@Component({
  selector: 'app-sma-tablosu',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './sma-tablosu.component.html',
  styleUrl: './sma-tablosu.component.css'
})
export class SmaTablosuComponent {
	private datas=[];
	
	constructor(private smaHttpClient:SmaHttpClientService,private sirketMailEkleme:SirketMailEklemeService){}

	displayedColumns: string[] = ['secme','id','displayName', 'mailAdresi', 'sifre', 'portNumarasi','host','aciklama'];
	dataSource: MatTableDataSource<SirketMailAdresi> = null;
	
	ngOnInit() {
		this.get();
	}

	clickEkleme(){
		this.sirketMailEkleme.pencere();
	}

	clickSilme(){
		console.log(this.datas);
	this.datas.forEach(data => {
		this.smaHttpClient.delete(data);
	});
	alert("Silme işlemi başarılı bir şekilde gerçekleşmiştir.");
	this.datas=[];
}
	onCheckboxChange(event: any,id:number){
		this.datas.push(id);
		console.log(this.datas)
	}
	async get(){
		const all_sma:{sirketMailAdresleri:SirketMailAdresi[];} = await this.smaHttpClient.get();
		this.dataSource=new MatTableDataSource<SirketMailAdresi>(all_sma.sirketMailAdresleri);
	}
	async clickFiltrele(displayName?:HTMLInputElement,mailAdresi?:HTMLInputElement,sifre?:HTMLInputElement,portNumarasi?:HTMLInputElement,host?:HTMLInputElement,Descending?:HTMLInputElement){
		
		const allSMA:{ sirketMailAdresleri: SirketMailAdresi[]; } = await this.smaHttpClient.getWhere(displayName.value,mailAdresi.value,sifre.value,Number(portNumarasi.value),host.value,Boolean(Descending.value));
		this.dataSource=new MatTableDataSource<SirketMailAdresi>(allSMA.sirketMailAdresleri);
	}
}
