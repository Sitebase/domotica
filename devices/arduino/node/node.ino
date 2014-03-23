/*
 Basic MQTT example 

  - connects to an MQTT server
  - publishes "hello world" to the topic "outTopic"
  - subscribes to the topic "inTopic"
  
  @todo mmake client dynamic based on mac address
  
*/

/**
 * Node Stack MQTT node
 * This node will check it's inputs in a loop and based on a delta it will determine
 * if the input has changed or not. 
 * If one of the inputs changes it will publish an event on the network with the new values
 *
 * @todo make client dynamic based on internal serial number or something so that you can upload the same build to every arduino node
 * -> this is not possible but use triple dipswitch on digital port to configure unique ID (010 for example)
 * @todo use kind of mapping array to configure what is input and what output
 */
#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
byte server[] = { 192, 168, 1, 102 };
byte ip[]     = { 192, 168, 1, 176 };

int INPUT_PINS[] = {2, 3, 4, 5, 6, 7};
int OUTPUT_PINS[] = {8, 9, 10, 11, 12, 13};


const int buttonPin = 2;
int prevButtonState = 0;
int buttonState = 0;
int LDR_Pin = A0; //analog pin 0

int SENSOR1_PIN = A0;
int SENSOR2_PIN = A1;
int SENSOR3_PIN = A2;
int SENSOR4_PIN = A3;
    

/*
// constants won't change. They're used here to 
// set pin numbers:


void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);      
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);     
}

void loop(){
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {     
    // turn LED on:    
    digitalWrite(ledPin, HIGH);  
  } 
  else {
    // turn LED off:
    digitalWrite(ledPin, LOW); 
  }
}
*/

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.println("Message arrived:  topic: " + String(topic));
  Serial.println("Length: " + String(length,DEC));

  
  //convert byte to char
  payload[length] = '\0';
  String strPayload = String((char*)payload);

  Serial.println(strPayload);
  //int valoc = strPayload.lastIndexOf(',');
  //String val = strPayload.substring(valoc+1);
  //Serial.println(val);


}

EthernetClient ethClient;
PubSubClient client(server, 1883, callback, ethClient);

void setup()
{
  Serial.begin(19200);
  Serial.println("==STARTING==");
     
  pinMode(buttonPin, INPUT);     
  
  int thisPin;
  
  // Define input pins
  for (int thisPin = 0; thisPin < sizeof(INPUT_PINS); thisPin++)  {
    pinMode(INPUT_PINS[thisPin], INPUT);     
  }
  
   // Define output pins
   for (int thisPin = 0; thisPin < sizeof(OUTPUT_PINS); thisPin++)  {
     pinMode(INPUT_PINS[thisPin], OUTPUT);     
   }


  // start the Ethernet connection:
  // @todo we don't need this, just always use a fixed ip
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("connecting...");

  // @todo we don't need this
  for (byte thisByte = 0; thisByte < 4; thisByte++) {
    // print the value of each byte of the IP address:
    Serial.print(Ethernet.localIP()[thisByte], DEC);
    Serial.print("."); 
  }

  // @todo mqtt server should be based on config.json
  // @todo mqtt client name should be based on config setting
  boolean con = client.connect("mqtt_arduino_client", "3snzzon5dyade:abc", "OBSCURED_FOR_SEC");
  while(con != 1){
    Serial.println("no con-while");
     con = client.connect("mqtt_arduino_client", "3snzzon5dyade:abc", "OBSCURED_FOR_SEC");
  }
  //Serial.println(con);
  if(con){
    Serial.println("got con");
    client.publish("testq","{\"status\":\"ok\"}");
    client.subscribe("testq");
  }else Serial.println("no con");

}

void loop()
{
  client.loop();
  
   // @todo does it auto reconnect, if not check if connection is active, if not try reconnect
  
   // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed.
  // if it is, the buttonState is HIGH:
  if (buttonState == HIGH) {     
    // turn LED on:    

   if( prevButtonState != buttonState) {
        Serial.println("click"); 
     client.publish("button","click");
    }
  } 
  else {
    // turn LED off:
    //       Serial.println("low");
  }
   prevButtonState = buttonState;
   

  int LDRReading = analogRead(LDR_Pin); 
  
  char response[] = "{\"status\":\"ok\",\"data\":\"\"}";
  String test = "{\"status\":\"ok\",\"data\":{";
  String closer = "}}";

// read analogue values.
 // The arduno uses a multiplexor for analog in with all inputs using
 // a commons ADC. This means that the multiplexor needs to switch
 // between inputs and time is required for the voltage to stabilise.
 // Multiple reads with a delay can help
 // @todo do this using a loop and implement a delta so that 
 // the event only gets published when values are changed more then X
  String read0 = "\"val_a0\":" + String(analogRead(A0)) + ",";
  delay(20);
  String read1 = "\"val_a1\":" + String(analogRead(A1)) + ",";
  delay(20);
  String read2 = "\"val_a2\":" + String(analogRead(A2)) + ",";
  delay(20);
  String read3 = "\"val_a3\":" + String(analogRead(A3)) + ",";
  delay(20);
  String read4 = "\"val_a4\":" + String(analogRead(A4)) + ",";
  delay(20);
  String read5 = "\"val_a5\":" + String(analogRead(A5)) + "";
  
  String stringresp = test + read0 + read1 + read2 + read3 + read4 + read5 + closer;

int length = (stringresp.length() + 1);
char charBuf[length];
stringresp.toCharArray(charBuf, length) ;
  
  Serial.println(stringresp);
  client.publish("ldr", charBuf);
  Serial.println(LDRReading);
  delay(5000); //just here to slow down the output for easier reading
}
