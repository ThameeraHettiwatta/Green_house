#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include "PCF8591.h"
#include "DHT.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "index.h"

#define PCF8591_I2C_ADDRESS 0x48
#define RST_PIN 0     //D16        
#define SS_PIN 15     //D8
#define trigPin 2     //D4
#define echoPin 10    //SD3
#define DHTPIN 14     //D5
#define DHTTYPE DHT11   // DHT 11




const char* ssid = "AdaptREh";
const char* password = "bigbentop";

//const char* ssid = "Manesh's iPhone";
//const char* password = "1234554321";

//const char* ssid = "A2";
//const char* password = "asdfghjkl";
String results = "{non}";

//functions
//String convertToJSONconvertToJSON(
//  int tankLevel, int luxLevel,
//  int tempOutEnv, int tempInEnv,
//  int soilMoisture, int hiumidityOutEnv, int hiumidityInEnv, bool watering);

ESP8266WebServer server(80); //Server on port 80

  PCF8591 pcf8591(PCF8591_I2C_ADDRESS);
  LiquidCrystal_I2C lcd(0x27, 16, 2);
  DHT dht(DHTPIN, DHTTYPE);

  void setup() {
  Serial.begin(115200);
  
  lcd.begin();
  lcd.backlight();
  SPI.begin();
  // analog extend
  pcf8591.begin();
  // DHT
  dht.begin();
  // Ultrasonic
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  lcd.print("Connecting to the network... ");

//start Server
setupServer();


}

//--------------------------------------------------------------- Green House------------------------------
void loop() {
  server.handleClient();     
}

//----------------------------------------------  handleRoot
///

// ---------------------------------------  setupServer
void setupServer() {
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
  
  
  server.on("/", [](){
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send_P(200,"text/html", webpage);});      //Which routine to handle at root location. This is display page. No need to call this, since the react app handles the gauges page itself
  server.on("/getSensorsData", sendDataToClient); //This page is called by java Script AJAX
  server.begin();                  //Start server
  Serial.println("HTTP server started");
}


//---------------------------------------------- convertToJSON
String convertToJSON(
  int tankLevel, int luxLevel,
  int tempOutEnv, int tempInEnv,
  int soilMoisture, int hiumidityOutEnv, int hiumidityInEnv, bool watering) {

  String out = "";
  out.concat("{\"tankLevel\":");
  out.concat(tankLevel);
  out.concat(", \"luxLevel\":");
  out.concat(luxLevel);
  out.concat(", \"tempOutEnv\":");
  out.concat(tempOutEnv);
  //  out.concat(", \"tempInEnv\":");
  //  out.concat(tempInEnv);
  out.concat(", \"soilMoisture\":");
  out.concat(soilMoisture);
  //  out.concat(", \"hiumidityOutEnv\":");
  //  out.concat(hiumidityOutEnv);
  out.concat(", \"hiumidityInEnv\":");
  out.concat(hiumidityInEnv);
  //  out.concat(", \"watering\":");
  //  out.concat(watering);
  out.concat("}");

  Serial.println(out);
  return out;
}
// ------------------------------------------- sendDataToClient
void sendDataToClient() {
  long duration;
  float phValue;
  bool watering;
  int tankLevel, luxLevel,
      tempOutEnv, tempInEnv,
      soilMoisture,
      hiumidityOutEnv, hiumidityInEnv;

  //ultrasonic
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  tankLevel = duration * 0.034 / 2;
  tankLevel = map(tankLevel, 0, 30, 0, 100);
  
  
  

  int soilMoistureRaw = pcf8591.analogRead(AIN0);
  soilMoisture = map(soilMoistureRaw, 300, 100, 0, 100);

  int luxLevelRaw = pcf8591.analogRead(AIN1);
  luxLevel = map(luxLevelRaw, 15, 255, 0, 130000);

  float humidityOutRaw = dht.readHumidity();
  float temperatureOutRaw = dht.readTemperature();

  if (!isnan(humidityOutRaw) || !isnan(temperatureOutRaw)) {
    tempOutEnv = (int)temperatureOutRaw;
    hiumidityOutEnv = (int)humidityOutRaw;
  }

//  tankLevel = random(35, 95);           //generate random data  
//  soilMoisture = random(45, 100);
//  luxLevel = random(2500, 130000);
//  tempOutEnv = random(15, 40);
  
  results = convertToJSON(
              tankLevel, luxLevel,
              tempOutEnv, tempInEnv,
              soilMoisture, hiumidityOutEnv,
              hiumidityInEnv, watering);

  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", results); //Send ADC value only to client ajax request

}
