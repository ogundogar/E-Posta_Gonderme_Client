import { Injectable } from '@angular/core';
import { YmHttpClientService } from './custom-http-client/ym-http-client.service';
import { YollananMail } from '../entities/YollananMailler';
import { KmaHttpClientService } from './custom-http-client/kma-http-client.service';
import { SmaHttpClientService } from './custom-http-client/sma-http-client.service';
import { SirketMailAdresi } from '../entities/SirketMailAdresleri';
import { KullaniciMailAdresi } from '../entities/KullaniciMailAdresi';

@Injectable({
  providedIn: 'root'
})
export class MailYollamaService {
	private kullanici:Number[]=[]

	constructor(private ymHttpClientSerivce:YmHttpClientService,private kmaHttpCLientService:KmaHttpClientService, private smaHttpClientService:SmaHttpClientService) { }


	async pencere(){
	const hedefElement = document.getElementById("pencere");
		
		const divPencere = document.createElement("div");
		const h1Baslik = document.createElement("h1");
		const selectSMA = document.createElement("select");
		const selectKMA = document.createElement("select");
		const inputBaslik = document.createElement("input");
		const inputMesaj = document.createElement("textarea");
		const bttnEkle = document.createElement("button");
		const bttnKaydet = document.createElement("button");
		const bttnIptal = document.createElement("button");
		
		bttnIptal.innerHTML = "İptal";
		bttnKaydet.innerHTML = "Kaydet";
		bttnEkle.innerHTML = "Ekle";

		const all_sma:{sirketMailAdresleri:SirketMailAdresi[];} = await this.smaHttpClientService.get();
		const smaData=all_sma.sirketMailAdresleri;
		
		smaData.forEach(data=>{
			const option = document.createElement("option");
			option.text = data.mailAdresi;
			option.value = String(data.id);
			selectSMA.add(option);
		})

		const all_KMA:{ kullaniciMailAdresleri: KullaniciMailAdresi[]; } = await this.kmaHttpCLientService.get();
		const kmaData=all_KMA.kullaniciMailAdresleri
		kmaData.forEach(data=>{
			const option = document.createElement("option");
			option.text = data.mailAdresi;
			option.value = String(data.id);
			selectKMA.add(option);
		})
		//Pencere div'i için style ayarları
		divPencere.style.backgroundColor="rgb(0, 0, 0, 0.8)";
		divPencere.style.border="solid 2px";
		divPencere.style.margin="5px";
		divPencere.style.width="75%";

		//Başlık
		h1Baslik.innerHTML="Mail Yolla";
		h1Baslik.style.color="rgb(255, 255, 255)"

		selectSMA.style.marginTop="5px";
		selectKMA.style.marginTop="5px";
		inputBaslik.style.marginTop="5px";
		inputMesaj.style.marginTop="5px"; 
		bttnIptal.style.marginTop="5px"; 
		bttnKaydet.style.marginTop="5px"; 
		bttnEkle.style.marginTop="5px"; 

		selectSMA.style.width="100%"
		selectKMA.style.width="80%"
		inputBaslik.style.width="100%"
		inputMesaj.style.width="100%"
		bttnIptal .style.width="50%"
		bttnKaydet.style.width="50%"
		bttnEkle.style.width="20%"; 

		selectSMA.style.height="25px";
		selectKMA.style.height="25px";
		inputBaslik.style.height="25px";
		inputMesaj.style.height="100px";
		bttnIptal .style.height="25px"
		bttnKaydet.style.height="25px"
		bttnEkle.style.height="25px"; 

		inputBaslik.placeholder="Başlık";
		inputMesaj.placeholder="Mesaj";

		bttnIptal .style.backgroundColor="rgb(255, 0, 0)"
		bttnKaydet.style.backgroundColor="rgb(60, 255, 0)"

		const ul = document.createElement("ul");
		ul.style.width="100%"

		bttnEkle.onclick = ()=> {
			console.log(selectKMA.value)
			const li = document.createElement("li");
			li.style.width="50%";
			li.style.color="white";
			kmaData.forEach(data => {
				if(data.id==Number(selectKMA.value))
				li.textContent=data.mailAdresi;
			});
			ul.appendChild(li);
			this.kullanici.push(Number(selectKMA.value));
		};

		bttnKaydet.onclick = ()=> {
			const ym:YollananMail=new YollananMail();
			ym.sirketMailAdresi=Number(selectSMA.value);
			ym.kullaniciMailAdresi=this.kullanici;
			ym.baslik=inputBaslik.value;
			ym.mesaj=inputMesaj.value;
			this.ymHttpClientSerivce.create(ym);
			alert("Kaydetme işlemi baaşarıyla gerçekleşti");
			divPencere.remove();
		};

		bttnIptal.onclick = ()=> {
			divPencere.remove();
		};
		//Notu belirlenen div içine yerleştirme işlemi
		hedefElement.appendChild(divPencere);
		divPencere.appendChild(h1Baslik);
		divPencere.appendChild(selectSMA);
		divPencere.appendChild(selectKMA);
		divPencere.appendChild(bttnEkle);
		divPencere.appendChild(ul);
		divPencere.appendChild(inputBaslik);
		divPencere.appendChild(inputMesaj);

		divPencere.appendChild(bttnIptal);
		divPencere.appendChild(bttnKaydet);
  }
}
