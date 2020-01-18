# Clothes Bin SSDL
## Description
The Clothes Bin SSDL system enable any user to creates clothes bins and manage their content.
The system contains 3 parts:
### 1. Website:
   Users could go to the website (locally or by the browser - depend on the deployment of the system),
   they could to create new bin by easy process which located on the tab "Create new bin",
   and to get the status of every bin in the system by its location.
### 2. IoT device:
   The device should to notify the Firebase database about the full height of the bin which measured in the first time
   the device plug to the electricity, and after that the device measure the currently height, if its over the limit which
   set by the user, the device will sent a mail to the owner of the bin.
   The IoT device include 2 parts:
* [ESP8266-Arduino](https://www.amazon.com/gp/product/B01D1D0EO4/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1)
* [Ultrasonic sensor](https://www.amazon.com/gp/product/B07RGB4W8V/ref=ppx_yo_dt_b_asin_title_o02_s01?ie=UTF8&psc=1)
* [(OPTIONAL) Case for Arduino](https://www.amazon.com/gp/product/B075SX6WYJ/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1)
### 3. Firebase "database":
   The firebase save every bin in the next format: <br>
   
   | Id  | Name | Height | curHeight | Limit | Owner | Location |      Mail      |
   | --- | ---- | ------ | --------- | ----- | ----- | -------- | -------------- |
   | 10  | Aviv |   60   |     21    |   44  |  Aviv | Tel Aviv | aviv@gmail.com |
   
   
   ## Diagram of the system
![alt text](https://github.com/Lupo00/ClothesBinSSDL/blob/master/README/system.png?raw=true)


# Let's start
If you like a defualt deployment,
when you get the application from locally website,
you should clone , change the next parameters:

### Change parameters:
- [DatabaseUtils](https://github.com/Lupo00/ClothesBinSSDL/blob/master/Website/js/DatabaseUtils.js) you should to change FIREBASE_URL parameter to the firebase url 
- [Arduino Code](https://github.com/Lupo00/ClothesBinSSDL/blob/master/Arduino/IoTDevice/IoTDevice.ino) you should change the next paramters:
   * define FIREBASE_HOST "FIREBASE_HOST" - Change to the firebase url 
   * define FIREBASE_AUTH "FIREBASE_AUTH" - Change to the [Auth parameter (secert key)](https://www.instructables.com/id/Firebase-Integrate-With-ESP8266/)
   * define WIFI_SSID "WIFI_NAME" - WiFi name as you see in your computer
   * define WIFI_PASSWORD "WIFI_PASSWORD" - WiFi password

### Firebase rules:
After you define project, you should to change the rules in the data store and enable to read and write.

### Allow to sent mails from Gmail  
- [Add Gmail account to SMTP](https://www.electronicshub.org/send-an-email-using-esp8266/)
- [Allow less secure apps to access your Gmail account](https://www.mischianti.org/2019/09/10/send-email-with-esp8266-and-arduino/)
- Change emailSend [parameter in line 66](https://github.com/Lupo00/ClothesBinSSDL/blob/master/Arduino/IoTDevice/IoTDevice.ino)
