import { Injectable } from '@angular/core';
import { KullaniciMailAdresi } from '../entities/KullaniciMailAdresi';
import { KmaHttpClientService } from './custom-http-client/kma-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class KullaniciEklemeService {
	
constructor(private kmaHttpClient:KmaHttpClientService) { }
pencere(){
	const hedefElement = document.getElementById("pencere");
		
		const divPencere = document.createElement("div");
		const h1Baslik = document.createElement("h1");
		const inputAd = document.createElement("input");
		const inputSoyad = document.createElement("input");
		const inputMailAdresi = document.createElement("input");
		const inputDogumTarihi = document.createElement("input");
		const inputCinsiyetErkek = document.createElement("input");
		const inputCinsiyetKadin = document.createElement("input");
		const lblCinsiyetErkek = document.createElement("label");
		const lblCinsiyetKadin = document.createElement("label");
		const inputTelefonNumarasi = document.createElement("input");
		const inputIsYeri = document.createElement("input");
		const inputUnvan = document.createElement("input");
		const bttnKaydet = document.createElement("button");
		const bttnIptal = document.createElement("button");
		
		bttnIptal.innerHTML = "İptal";
		bttnKaydet.innerHTML = "Kaydet";
		
		lblCinsiyetErkek.innerText="Erkek";
		lblCinsiyetKadin.innerText="Kadın";
		
		lblCinsiyetErkek.style.color="white";
		lblCinsiyetKadin.style.color="white";

		

		inputDogumTarihi.type="date";
		
		inputCinsiyetErkek.type="radio";
		inputCinsiyetKadin.type="radio";
		inputCinsiyetErkek.name="cinsiyet";
		inputCinsiyetKadin.name="cinsiyet";

		//Pencere div'i için style ayarları
		divPencere.style.backgroundColor="rgb(0, 0, 0, 0.8)";
		divPencere.style.border="solid 2px";
		divPencere.style.margin="5px";
		divPencere.style.width="75%";

		//Başlık
		h1Baslik.innerHTML="Kullancı Ekle";
		h1Baslik.style.color="rgb(255, 255, 255)"

		inputAd.style.marginTop="5px";
		inputSoyad.style.marginTop="5px";
		inputMailAdresi.style.marginTop="5px";
		inputDogumTarihi.style.marginTop="5px"; 
		inputCinsiyetErkek.style.marginTop="5px"; 
		inputCinsiyetKadin.style.marginTop="5px";
		inputTelefonNumarasi.style.marginTop="5px"; 
		inputIsYeri.style.marginTop="5px"; 
		inputUnvan.style.marginTop="5px";
		bttnIptal.style.marginTop="5px"; 
		bttnKaydet.style.marginTop="5px";  

		inputAd.style.width="100%"
		inputSoyad .style.width="100%"
		inputMailAdresi.style.width="100%"
		inputDogumTarihi .style.width="100%"
		inputCinsiyetErkek.style.width="25%" 
		inputCinsiyetKadin.style.width="25%"
		lblCinsiyetErkek.style.width="25%"
		lblCinsiyetKadin.style.width="25%"
		inputTelefonNumarasi .style.width="100%"
		inputIsYeri .style.width="100%"
		inputUnvan.style.width="100%"
		bttnIptal .style.width="50%"
		bttnKaydet.style.width="50%"

		inputAd .style.height="25px";
		inputSoyad .style.height="25px";
		inputMailAdresi.style.height="25px";
		inputDogumTarihi .style.height="25px";
		inputTelefonNumarasi .style.height="25px";
		inputIsYeri .style.height="25px";
		inputUnvan.style.height="25px";
		bttnIptal .style.height="25px"
		bttnKaydet.style.height="25px"

		inputAd.placeholder="Ad";
		inputSoyad .placeholder="Soyad";
		inputMailAdresi.placeholder="Mail Adresi";
		inputDogumTarihi .placeholder="Doğum Tarihi";
		inputTelefonNumarasi .placeholder="Telefon Numarası";
		inputIsYeri .placeholder="İş Yeri";
		inputUnvan.placeholder="Unvans";

		bttnIptal .style.backgroundColor="rgb(255, 0, 0)"
		bttnKaydet.style.backgroundColor="rgb(60, 255, 0)"

		let cinsiyet:boolean;
		inputCinsiyetErkek.onclick=()=>{
			cinsiyet=true;
		}
		inputCinsiyetKadin.onclick=()=>{
			cinsiyet=false;
		}

		bttnKaydet.onclick = ()=> {
			const kma:KullaniciMailAdresi=new KullaniciMailAdresi();
			kma.ad=inputAd.value;
			kma.soyad=inputSoyad.value;
			kma.mailAdresi=inputMailAdresi.value;
			kma.dogumTarihi=new Date(inputDogumTarihi.value);
			kma.cinsiyet=cinsiyet;
			kma.telefonNumarasi=inputTelefonNumarasi.value;
			kma.isYeri=inputIsYeri.value;
			kma.unvan=inputUnvan.value;
			
			this.kmaHttpClient.create(kma);
			alert("Kaydetme işlemi baaşarıyla gerçekleşti");
			divPencere.remove();
		};

		bttnIptal.onclick = ()=> {
			divPencere.remove();
		};
		//Notu belirlenen div içine yerleştirme işlemi
		hedefElement.appendChild(divPencere);
		divPencere.appendChild(h1Baslik);
		divPencere.appendChild(inputAd);
		divPencere.appendChild(inputSoyad);
		divPencere.appendChild(inputMailAdresi);
		divPencere.appendChild(inputDogumTarihi);
		divPencere.appendChild(inputCinsiyetErkek);
		divPencere.appendChild(lblCinsiyetErkek);
		divPencere.appendChild(inputCinsiyetKadin);
		divPencere.appendChild(lblCinsiyetKadin);
		divPencere.appendChild(inputTelefonNumarasi);
		divPencere.appendChild(inputIsYeri);
		divPencere.appendChild(inputUnvan);
		divPencere.appendChild(bttnIptal);
		divPencere.appendChild(bttnKaydet);
  }
}
