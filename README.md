# Clothes Bin SSDL
## Description
The Clothes Bin SSDL system enable any user to creates clothes bin and manage their content.
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
   
![alt text](https://github.com/Lupo00/ClothesBinSSDL/blob/master/README/system.png?raw=true)
