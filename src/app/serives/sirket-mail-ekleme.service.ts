import { Injectable } from '@angular/core';
import { SmaHttpClientService } from './custom-http-client/sma-http-client.service';
import { SirketMailAdresi } from '../entities/SirketMailAdresleri';

@Injectable({
  providedIn: 'root'
})
export class SirketMailEklemeService {

  constructor(private smaClientService:SmaHttpClientService) { }
  pencere(){
	const hedefElement = document.getElementById("pencere");
		
		const divPencere = document.createElement("div");
		const h1Baslik = document.createElement("h1");
		const inputDisplayName = document.createElement("input");
		const inputMailAdresi = document.createElement("input");
		const inputSifre = document.createElement("input");
		const inputPortNumarasi = document.createElement("input");
		const inputHost = document.createElement("input");
		const inputAciklama = document.createElement("input");
		const bttnKaydet = document.createElement("button");
		const bttnIptal = document.createElement("button");
		
		bttnIptal.innerHTML = "İptal";
		bttnKaydet.innerHTML = "Kaydet";


		//Pencere div'i için style ayarları
		divPencere.style.backgroundColor="rgb(0, 0, 0, 0.8)";
		divPencere.style.border="solid 2px";
		divPencere.style.margin="5px";
		divPencere.style.width="75%";

		//Başlık
		h1Baslik.innerHTML="Şirket Mail'i Ekle";
		h1Baslik.style.color="rgb(255, 255, 255)"

		inputDisplayName.style.marginTop="5px";
		inputSifre.style.marginTop="5px";
		inputMailAdresi.style.marginTop="5px";
		inputPortNumarasi.style.marginTop="5px"; 
		inputHost.style.marginTop="5px"; 
		inputAciklama.style.marginTop="5px";

		bttnIptal.style.marginTop="5px"; 
		bttnKaydet.style.marginTop="5px";  

		inputDisplayName.style.width="100%"
		inputSifre.style.width="100%"
		inputMailAdresi.style.width="100%"
		inputPortNumarasi.style.width="100%"
		inputHost.style.width="100%"
		inputAciklama.style.width="100%"

		bttnIptal .style.width="50%"
		bttnKaydet.style.width="50%"

		inputDisplayName.style.height="25px";
		inputSifre.style.height="25px";
		inputMailAdresi.style.height="25px";
		inputPortNumarasi.style.height="25px";
		inputHost.style.height="25px";
		inputAciklama.style.height="25px";

		bttnIptal .style.height="25px"
		bttnKaydet.style.height="25px"

		inputDisplayName.placeholder="Display Name";
		inputSifre.placeholder="Şifre";
		inputMailAdresi.placeholder="Mail Adresi";
		inputPortNumarasi.placeholder="Port Numarası";
		inputHost.placeholder="Host";
		inputAciklama.placeholder="Açıklama";

		bttnIptal .style.backgroundColor="rgb(255, 0, 0)"
		bttnKaydet.style.backgroundColor="rgb(60, 255, 0)"

		bttnKaydet.onclick = ()=> {
			const sma:SirketMailAdresi=new SirketMailAdresi();
			sma.displayName=inputDisplayName.value;
			sma.mailAdresi=inputMailAdresi.value;
			sma.sifre=inputSifre.value;
			sma.portNumarasi=Number(inputPortNumarasi.value);
			sma.host=inputHost.value;
			sma.aciklama=inputAciklama.value;

			this.smaClientService.create(sma);
			alert("Kaydetme işlemi baaşarıyla gerçekleşti");
			divPencere.remove();
		};

		bttnIptal.onclick = ()=> {
			divPencere.remove();
		};
		//Notu belirlenen div içine yerleştirme işlemi
		hedefElement.appendChild(divPencere);
		divPencere.appendChild(h1Baslik);

		divPencere.appendChild(inputDisplayName);
		divPencere.appendChild(inputMailAdresi);
		divPencere.appendChild(inputSifre);
		divPencere.appendChild(inputPortNumarasi);
		divPencere.appendChild(inputHost);
		divPencere.appendChild(inputAciklama);

		divPencere.appendChild(bttnIptal);
		divPencere.appendChild(bttnKaydet);
  }
}
