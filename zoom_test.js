#include <Keyboard.h>

const int buttonPin = 2;
bool lastButtonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Keyboard.begin();
  delay(2000); // Longer startup delay for reliability
}

void loop() {
  bool buttonState = digitalRead(buttonPin);

  if (buttonState == LOW && lastButtonState == HIGH) {
    delay(50); // Debounce
    
    if (digitalRead(buttonPin) == LOW) {
      // Press Alt and 'q'
      Keyboard.press(KEY_LEFT_ALT);
      Keyboard.press('q');
      
      // CRITICAL: Hold keys down for 300ms
      delay(300); 
      
      // Release all keys
      Keyboard.releaseAll();
      
      // Long delay to prevent rapid re-triggering
      delay(1000);
    }
  }
  lastButtonState = buttonState;
  delay(10);
}