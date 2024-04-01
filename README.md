VERİ TABANI
Database’e bağlanmak için ORM aracı olan entity framework kullanıldı. Entity framework’ün code first yaklaşımı kullanılarak veri tabanı oluşturuldu. Code first yaklaşımı ile geliştirilmesi hem Microsoft.Entity.FrameworkCore kütüphanesinden türetilen DbContext sınıfı içerisindeki connection string ve provider’ı değiştirerek diğer veri tabanlarında da kullanmamız gerektiğinde veri tabanını hızlı bir şekilde oluşturulabilir hem de veri tabanındaki değişiklikleri kod kısmında yapılabilir. Veri tabanı 3 tablo ile oluşturuldu. 
![image](https://github.com/ogundogar/E-Posta_Gonderme_Client/assets/92091170/28df4aa9-7427-42eb-ae90-7b5817349684)
Bu tablolar;
-Kullanıcı bilgilerinin sakladığı KullanıcıMailAdresleri tablosu
-Şirket mail adreslerinin saklandığı SirketMailAdresleri tablosu
-Yollanan mailleri sakladığı YollananMailler tablosu



Tablolar arasındaki ilişkiler ve tablolardaki kolonlar şöyle;
Tablolar arasında KullanıcıMailAdresleri tablosu ile YollananMailler tablosu arasında many to many ilişki oluşturuldu. SirketMailAdresleri tablosu ile YollananMailler tablosu arasında ise one to many ilişki oluşturuldu. KullanıcıMailAdresleri tablosu ile YollananMailler tablosu arasında many to many bir ilişki oluşturmanın sebebi bir kullanıcıya birden çok mail yollanabilir ve aynı şekilde bir mail birden fazla kullanıcıya yollanabilmesi. SirketMailAdresleri tablosu ve YollananMailler tablosu arasındaki ilişkinin one to many olmasının sebebi mailler sadece bir şirket mail’inden yollanması.

