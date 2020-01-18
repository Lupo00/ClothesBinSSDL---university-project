#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <ArduinoJson.h>
#include "EMailSender.h"
// Set these to run example.
#define echoPin D3
#define trigPin D4
#define FIREBASE_HOST "FIREBASE_HOST"
#define FIREBASE_AUTH "FIREBASE_AUTH"
#define WIFI_SSID "WIFI_NAME"
#define WIFI_PASSWORD "WIFI_PASSWORD"



enum BIN_STATE {
  UNDER_THE_LIMIT,
  ABOVE_THE_LIMIT
};

WiFiClient espClient;

String BIN_NAME = "Bin10";
int BIN_NUMBER = 10;
long duration, distance; // Duration used to calculate distance
BIN_STATE state = UNDER_THE_LIMIT;
int above_the_limit = 0;


void setup() {
  Serial.begin(9600);
  
  initializeUltraSonicPins();
  connectToTheWiFi();
  int height = Firebase.getInt(BIN_NAME+"/Height");
  if (Firebase.failed()) {
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  }
  insertTotalHeight(BIN_NUMBER);
  
}

void loop()
{
  insertCurrentHeight();
  delay(500);
}

void sendMail(){
  char mail[50];
  char owner[50];
  char location[100];
  Firebase.getString(BIN_NAME+"/Mail").toCharArray(mail, 50);;
  Firebase.getString(BIN_NAME+"/Owner").toCharArray(owner, 50);;
  Firebase.getString(BIN_NAME+"/Location").toCharArray(location, 100);;

  EMailSender::EMailMessage message;
  message.subject = "Hi ";
  message.subject += owner;
  message.subject += ", You should empty your bin";

  message.message = "Hi ";
  message.message += owner;
  message.message += ",<br> The bin which located in ";
  message.message += location;
  message.message += " has reached your limit <br> You should go empty your bin<br><br> Have a nice day,<br>Bin Admin"; 
  EMailSender emailSend("BinMasterSSDL@gmail.com", "ssdl1990");
  EMailSender::Response resp = emailSend.send(mail, message);
  delay(5000);
}
void insertTotalHeight(int id){
  Serial.println("Initializing the height of the Bin");

  int totalHeight=0;
  for(int i=0 ; i<10 ; i++){
    totalHeight+=getDistance();
    delay(500);
  }

  Firebase.getInt(BIN_NAME+"/Height");

  if (Firebase.success()) {
    Firebase.setInt(BIN_NAME+"/Height",totalHeight/10+5);
    Firebase.setInt(BIN_NAME+"/curHeight",0);
    Firebase.setInt(BIN_NAME+"/Id",id);
  }else{
    Firebase.setInt(BIN_NAME+"/curHeight",0);
    Firebase.setInt(BIN_NAME+"/Id",10);
  }
  Serial.println("Finish initialization of the Bin height");
}

void insertCurrentHeight(){
  int height = Firebase.getInt(BIN_NAME+"/Height");
  int limit = Firebase.getInt(BIN_NAME+"/Limit");
  int curHeight = height-getDistance();
  Firebase.setInt(BIN_NAME+"/curHeight",curHeight);
  Serial.print("Current Distance: ");
  Serial.println(getDistance());

  if((height/curHeight)*100 > limit && state == UNDER_THE_LIMIT){
    above_the_limit++;
    if(above_the_limit > 3){
      state=ABOVE_THE_LIMIT;
      sendMail(); 
    }
  }else if((height/curHeight)*100 < limit && state == ABOVE_THE_LIMIT){
    state=UNDER_THE_LIMIT;
    above_the_limit=0;
  }
  
}

int getDistance(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(1000);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(1500);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration/58.2;
  delay(1000);
  return distance;
}

void connectToTheWiFi(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}



void initializeUltraSonicPins(){
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

