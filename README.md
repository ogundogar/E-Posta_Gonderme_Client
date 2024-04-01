<h3>VERİ TABANI</h3>
Database’e bağlanmak için ORM aracı olan entity framework kullanıldı. Entity framework’ün code first yaklaşımı kullanılarak veri tabanı oluşturuldu. Code first yaklaşımı ile geliştirilmesi hem Microsoft.Entity.FrameworkCore kütüphanesinden türetilen DbContext sınıfı içerisindeki connection string ve provider’ı değiştirerek diğer veri tabanlarında da kullanmamız gerektiğinde veri tabanını hızlı bir şekilde oluşturulabilir hem de veri tabanındaki değişiklikleri kod kısmında yapılabilir. Veri tabanı 3 tablo ile oluşturuldu. 

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/28df4aa9-7427-42eb-ae90-7b5817349684)

Bu tablolar;
-Kullanıcı bilgilerinin sakladığı KullanıcıMailAdresleri tablosu
-Şirket mail adreslerinin saklandığı SirketMailAdresleri tablosu
-Yollanan mailleri sakladığı YollananMailler tablosu


<h3></h3>
Tablolar arasındaki ilişkiler ve tablolardaki kolonlar şöyle;
Tablolar arasında KullanıcıMailAdresleri tablosu ile YollananMailler tablosu arasında many to many ilişki oluşturuldu. SirketMailAdresleri tablosu ile YollananMailler tablosu arasında ise one to many ilişki oluşturuldu. KullanıcıMailAdresleri tablosu ile YollananMailler tablosu arasında many to many bir ilişki oluşturmanın sebebi bir kullanıcıya birden çok mail yollanabilir ve aynı şekilde bir mail birden fazla kullanıcıya yollanabilmesi. SirketMailAdresleri tablosu ve YollananMailler tablosu arasındaki ilişkinin one to many olmasının sebebi mailler sadece bir şirket mail’inden yollanması.

<h3>Entity Framework</h3>

Entity, bir veri tabanındaki bir tabloyu temsil eden bir nesnedir. Tablolara karşılık gelen classlar oluşturulur. Classlar KullanıcıMailAdresi, SirketMailAdresi, YollananMail olarak adlandırılır. Bunun sebebi classlar tablodaki bir satıra karşılık gelmektedir. Yani tek bir satırı getirilmektedir.
Entity classları;

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/31800d82-cc65-4779-95de-e7d1030feabf)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/5fe732c8-e91a-4108-83b7-37e2841429a9)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/6922cacb-22a5-42d6-92bf-2941c5507248)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/08a5d3ba-8756-45db-a7c6-7b718b87e471)

KullaniciMailAdresi_YollananMail tablosu KullaniciMailAdresi tablosu ve YollananMail tablosu arasındaki many to many ilişkisi için.


Entity frameworkde EPostaGonderimAPIDbContext sınıfında tabloları, connction string ve tablolar arası ilişkileri tanımlanmaktadır. Dbcontext sınıfın ve entity sınıflarını oluşturduktan sonra veri tabanını sunucuda oluşturmak için add-migration mig-1 komutunu kullanıldı. Bu komut ile Migration oluşturuldu. Daha sonra update-database komutu ile migrate ederek sunucu tarafında da veri tabanını oluşturuldu.


<h3>Web API</h3>
HTTP protokolü üzerinden istek doğrultusunda veri gönderme ve veri alma işlemlerini gerçekleştirilir. KullaniciMailAdresleri, SirketMailAdresleri ve YollananMail tablolarına veri gönderme ve veri alma işlemlerini KullaniciMailAdresiController, SirketMailAdresiController ve YollananMailController sınıfı üzerinden gerçekleştirildi. Sınıflar içerisinde get, post, delete ve put işlemleri yapıldı. Controller’a gelen istekleri karşılamak için kullanılan fonksiyonlar Get(), GetWhere(), Post(), Put() ve Delete(). Get() fonksiyonu tablolardaki tüm verileri getirmek için kullanılır. GetWhere() fonksiyonunda ise kullanıcının girdiği parametrelere göre filtreleme işlemi gerçekleştirmek için kullanılır. Post() fonksiyonu dışarıdan gelen verileri veri tabanına eklemek için kullanılır. Put() fonksiyonu veri tabanındaki verileri güncellemek için kullanılır. Delete() fonksiyonu ise veri tabanındaki verileri silmek için kullanılır.

<h3></h3>
<h3>Onion Architecture</h3>
Bağımlılıkları azaltmak için onion architecture ile geliştirildi. Böylece kod kısmında yapılacak değişiklikleri daha rahat yapabiliriz. Domain katmanı, Repository(Service/Interface) katmanı, Infrastructure katmanı, Persistence katmanı ve Presentation katmanından oluşmaktadır. 

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/a51dedf7-8350-4b8e-a364-87df47832826)

Domain katmanı diğer adı core katmanıdır. onion architecture’ın merkezinde bulunmaktadır. Bu katmanda domain ile ilgili çalışmalar yapılmaktadır. Bu domain katmanında Entities bulunmaktadır. 

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/9b2c2b91-7ce1-4d26-821d-5ad654bce014)

Repository(Service/Interface) katmanı diğer adı core katmanıdır. Domain katmanı ile Infrastructure/ Persistence katmanı arasında soyutlama yapar. Böylece bağımlılıkları azaltır. Bu katmanda Features(CQRS Pattern), IRepository ve IMailService bulunmaktadır.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/a378293c-f290-4c38-94ac-45dacbd84d86)

Persistence katmanı veri tabanı işlemlerini gerçekleştirdiğimiz katmandır. 

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/f3285489-e093-4b53-9cd2-e91c9a10fa49)

Infrastructure katmanında veri tabanı işlemleri dışında kalan işlemleri bu katmanda gerçekleştiririz. Mail yollama işlemini gerçekleştirdiğimiz MailService bulunmaktadır.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/23c0ef7d-5f54-43d0-b7f0-78e3fa3e1a75)

Presentation katmanı kullanıcını uygulama ile iletişime geçtiği katmandır. Bu katmanda Web API bulunmaktadır. 


<h3>CQRS ve Mediator Pattern</h3>
Command’leri ve Query’leri ayırmak için CQRS pattern kullanıldı. Insert, Update, Delete gibi komutlara Command’de, Select sorgularını da Query’de yapılmaktadır. Sorgu işlemlerinin yoğunluğu nedeniyle gelecekte performansı optimize etmek için NoSQL veritabanı kullanarak Command ve Query işlemlerini ayırabiliriz.
Command ve Query’a gelen request’ler handler’larda işlem gördükten sonra response dönecektir. 
CQRS’de gelen request’i hangi handler’da işlem göreceğini ve hangi respose’u döneceğini belirlemek için Mediator Pattern kullanıldı.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/8d06cf12-516b-44ed-9587-e22115b2e0bd)

<h4></h4>
<h3>Angular 17</h3>
<h3>Componentler</h3>
SPA(Single page Application) mimarisinden dolayı app.component sayfası anasayfa olmaktadır. Tüm işlemler bu app.component sayfasında gerçekleşmektedir.
 app.component’te yapılacak işlemleri parçalı ve düzenli bir şekilde yapmak için navigation ve main-content componentleri oluşuyor. Navigation componenti nav bar üzerindeki işlemlerle sorumlu, main-content compoent ise Web API den gelen verileri tablolarını oluşturmakta sorumludur. 
main-content componenti’de sidebar, kma-tablosu, sma-tablosu ve ym-tablosu componentten oluşmaktadır. Sidebar tablolar arasındaki yönlendirme işlemleri için kullanılıyor. kma-tablosu, sma-tablosu ve ym-tablosu componentleri ise KullaniciMailAdresleri, SirketMailAdresleri ve YollananMail tablolarından gelen verileri karşılamak için kullanılıyor.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/8dc04589-18b2-4899-86d0-7bc47c86fc76)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/22d7d8e8-7ca9-4fe3-873e-32b033a654a3)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/ee749978-ff87-4931-ac4a-27d138e2e199)


<h3>Serviceler</h3>
<h4>Http Client Service</h4>
HttpClientService, genel olarak Get, Post, Delete ve Put gibi HTTP işlemlerini gerçekleştirmek üzere generic olarak tasarlanmış bir servistir. Bu servis sadece EPostaGonder projesi için özel olarak tasarlanmamıştır, diğer uygulamalar içinde kullanılabilir şekilde genel bir yapıya sahiptir.
EPostaGonder Web API’si için özel olarak tasarlanan serviceler KmaHttpClientService, SmaHttpClientService ve YmHttpClientService dir.


<h4>Kullanıcı Ekle Service</h4>
Kullanıcı tablosunda ekle butonuna basıldığında js dom kullanılarak kullanıcı ekle ekranı oluşturuluyor. Girilen değerleri KmaHttpClientService ile EPostaGonder Web API’sine gönderiyor.


![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/3772df6a-e1cf-458c-8a26-b373d5d4801c)


<h4>Mail Yollama Service</h4>
Şirket Mail tablosunda ekle butonuna basıldığında js dom kullanılarak Şirket Mail ekle ekranı oluşturuluyor. Girilen değerleri SmaHttpClientService ile EPostaGonder Web API’sine gönderiyor.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/953e9e92-35fc-4a48-ae9e-636e32615d05)

<h4>Şirket Mail Ekle Service</h4>
Yollanan Mailler tablosunda ekle butonuna basıldığında js dom kullanılarak Mail Yollama ekranı oluşturuluyor. Girilen değerleri YmHttpClientService ile EPostaGonder Web API’sine gönderiyor.

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/632df9e4-2ff0-4c26-99c4-1ea26bd4f09b)

<h3>Tablolarda Filtreleme İşlemi</h3>

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/151baa1f-5c44-4f83-b1f0-025df598b321)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/4292f4d3-d0cb-4ae4-8ddd-e87216596b50)

![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/658ff2f6-9e5d-493b-8953-c243ef9e1816)

KmaHttpClientService, SmaHttpClientService ve YmHttpClientService servicelerindeki getWhere() fonksiyonu buradaki değerleri parametrik olarak alıyor. Daha sonra query string olarak Controller’lar içindeki GetWhere() fonksiyona yolluyor. GetWhere() fonksiyonu filtreleme işlemini yaptıktan sonra response olarak sonucu dönüyor.

<h1>Uygulama İçi Görseller</h1>

<h4>Kullanici Ekleme İşlemi</h4>

![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/4294bb05-45d5-4e26-83c9-32a555c528b2)

<h4>Kullanici Tablosunda Filtreleme İşlemi</h4>

![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/016512fe-a3b4-4578-a40a-6b16b1506f87)

<h4>Kullanici Tablosunda Ekleme ve Filtreleme İşlemi Sonucu</h4>

![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/d651bc9b-ccce-46de-86fe-4aa63151dcb3)

<h2>Toplu Mail Atma İşlemi</h2>

![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/a2a59c3d-a251-4205-8f61-94710c452afd)

![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/d52cf395-a1e6-4b24-a83c-c7f374bd9dda)
![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/97dc902f-5432-4d6e-9ebe-0917cc39eda0)
![image](https://github.com/ogundogar/E-Posta_Gonderme_API/assets/92091170/a909a886-2679-4126-9eba-25bbc6a16832)




