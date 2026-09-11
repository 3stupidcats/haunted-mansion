#include <Keyboard.h>

const int buttonPin = 2;
bool lastButtonState = HIGH;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Keyboard.begin();
  delay(1000);
}

void loop() {
  bool buttonState = digitalRead(buttonPin);
  
  // Only act on button press (falling edge)
  if (buttonState == LOW && lastButtonState == HIGH) {
    delay(50);  // Debounce
    
    if (digitalRead(buttonPin) == LOW) {
      // Send Alt+Q as a proper keyboard shortcut
      Keyboard.press(KEY_LEFT_ALT);  // Hold Alt
      Keyboard.press('q');            // Press Q while Alt is held
      
      delay(300);  // CRITICAL: Hold both keys down for 300ms
      
      Keyboard.releaseAll();  // Release both together
      
      delay(500);  // Wait for Zoom's End Meeting dialog
      
      // Confirm the dialog
      Keyboard.press(KEY_RETURN);
      delay(100);
      Keyboard.releaseAll();
    }
  }
  
  lastButtonState = buttonState;
  delay(50);
}