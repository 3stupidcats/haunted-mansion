# This method bypasses the Keyboard.h library entirely and uses code designed for your board. A key advantage is that the code runs directly from a file on the board, so no compiling or uploading is needed.

#     Set up the board for CircuitPython: If you haven't already, follow Adafruit's guide to install the latest version of CircuitPython on your Trinket M0. The board will appear as a drive named CIRCUITPY on your computer .

#     Install the required library: Download the Adafruit CircuitPython library bundle and copy the adafruit_hid folder into a new folder named lib on the CIRCUITPY drive .

#     Create the code file: Create a new text file named code.py on the CIRCUITPY drive and paste the following code into it.
##############

import time
import board
from digitalio import DigitalInOut, Direction, Pull
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode

# Set up the button on pin D2
button = DigitalInOut(board.D2)
button.direction = Direction.INPUT
button.pull = Pull.UP
button_state = True

# Set up the keyboard device
kbd = Keyboard(usb_hid.devices)

while True:
    # The button is active-low, so it reads False when pressed
    if not button.value and button_state:
        # Debounce
        time.sleep(0.05)
        if not button.value:
            # Press Alt+Q to end the meeting
            kbd.press(Keycode.ALT, Keycode.Q)
            time.sleep(0.2)  # Hold the keys for a moment
            kbd.release_all()
            
            # Wait for the dialog to appear and confirm with Enter
            time.sleep(0.7)
            kbd.press(Keycode.ENTER)
            time.sleep(0.1)
            kbd.release_all()
            
            button_state = False

    # Reset the state when the button is released
    if button.value:
        button_state = True
        
    time.sleep(0.01)  # Small delay to be kind to the processor