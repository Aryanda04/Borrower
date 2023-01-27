#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <SPI.h>
#include <MFRC522.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "WAT"
#define WIFI_PASSWORD "passwordnya"
// Insert Firebase project API Key
#define API_KEY "AIzaSyDgBs3O1SS2JhQHE8X0PX_y6hwns35g644"
// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL "https://esp-firebase-project-67a6e-default-rtdb.asia-southeast1.firebasedatabase.app"
// Insert Authorized Username and Corresponding Password
#define USER_EMAIL "admin2@uper.ac.id"
#define USER_PASSWORD "admin12345"

// Define Firebase objects
FirebaseData streamData;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;

// Variables to save database paths
String projectPath = "/";

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

// Declare Pins
// RFID Pins
#define SS_PIN 4    //D2
#define RST_PIN 5   //D1

// Output Pins
#define LED_PIN 2
#define BUZZ_PIN 15

MFRC522 rfid(SS_PIN, RST_PIN);  // Create MFRC522 instance

void setup(){
  Serial.begin(115200);
  initWiFi();         // Initiate Wifi Connection
  initFirebase();     // Initiate Firebase

  SPI.begin();        // Initiate  SPI bus
  rfid.PCD_Init();    // Initiate MFRC522

  // Initialize a NTPClient to get time
  timeClient.begin();
  timeClient.setTimeOffset(3600 * 7); //GMT +7 = WIB

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZ_PIN, OUTPUT);

  delay(500);
}

void loop(){
  /// check if Firebase Connection is still running
  /// if failed, it will restart ESP
  if (!Firebase.ready()){
    ESP.reset();
  }
  
  if ( ! rfid.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! rfid.PICC_ReadCardSerial()) 
  {
    return;
  }
  
  Serial.print(F("The Card ID Is: "));
  String uidCard = UIDDec(rfid.uid.uidByte, rfid.uid.size);
  Serial.println(uidCard);
  Serial.println();

  sendData(uidCard);
  digitalWrite(LED_PIN, HIGH);
  tone(BUZZ_PIN, 298);
  delay(400);
  digitalWrite(LED_PIN, LOW);
  noTone(BUZZ_PIN);

  // Halt PICC
  rfid.PICC_HaltA();

  Serial.println("==================================================================");
}

// Initialize WiFi
void initWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println("\nESP8266 Wifi Connection Success.");
  Serial.println(WiFi.localIP());
  Serial.println();
}

void initFirebase() {
  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Streaming (whenever data changes on a path)
  // Begin stream on a database path --> root
  if (!Firebase.RTDB.beginStream(&streamData, projectPath.c_str()))
    Serial.printf("stream begin error, %s\n\n", streamData.errorReason().c_str());

  delay(750);
}

String UIDDec(byte *buffer, byte bufferSize) {
  String temp = "";
  for (byte i = 0; i < bufferSize; i++) {
    temp += buffer[i];
  }

  return temp;
}

void getCurrentDateArray(String *arrData) {
  timeClient.update();
  time_t epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime((time_t *)&epochTime);

  arrData[0] = String(ptm->tm_mday);
  arrData[1] = String(ptm->tm_mon+1);
  arrData[2] = String(ptm->tm_year+1900);
}

void sendData(String uid) {
  String currentDate[3];
  getCurrentDateArray(currentDate);

  json.clear();
  json.set("uid", uid);
  json.set("date", currentDate[0]+"-"+currentDate[1]+"-"+currentDate[2]);
  Firebase.RTDB.setJSON(&streamData, projectPath+"userNow/", &json);

  Serial.println("Input Data into "+projectPath+"userNow/"+" Success");
  Serial.println("Data:");
  json.toString(Serial, true);
  Serial.println("\n");

  if( ! Firebase.RTDB.getJSON(&streamData, projectPath+"userList/"+uid)) {
    Serial.println("New User In System Is Detected.");

    json.clear();
    json.set("nama", "-");
    json.set("nim", "-");
    json.set("uid", uid);
    Firebase.RTDB.setJSON(&streamData, projectPath+"userList/"+uid+"/", &json);

    Serial.println("Input Data into "+projectPath+"userList/"+uid+"/"+" Success");
    Serial.println("Data:");
    json.toString(Serial, true);
    Serial.println("\n");
  } else {
    Serial.println("Existing User Is Detected");
  }
}

