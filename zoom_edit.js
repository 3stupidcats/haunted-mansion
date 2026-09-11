#include <Keyboard.h>

const int buttonPin = 2;
bool buttonWasPressed = false;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  Keyboard.begin();
  delay(1000);  // Let the host recognize the board
}

void loop() {
  bool buttonPressed = (digitalRead(buttonPin) == LOW);

  if (buttonPressed && !buttonWasPressed) {
    delay(50);  // Debounce
    if (digitalRead(buttonPin) == LOW) {
      endMeeting();
    }
  }

  buttonWasPressed = buttonPressed;
  delay(10);
}

void endMeeting() {
  // Alt + Q to trigger End Meeting
  Keyboard.press(KEY_LEFT_ALT);
  delay(50);              // Let Alt register before Q
  Keyboard.press('q');
  delay(100);             // Hold combo long enough to register
  Keyboard.releaseAll();
  delay(500);             // Wait for Zoom's "End Meeting" dialog

  // Confirm the dialog with Return
  Keyboard.press(KEY_RETURN);
  delay(100);
  Keyboard.releaseAll();
  delay(200);             // Cool-down
}