import Phaser from "phaser";

import Text from "~/interfaces/UI/Text/Text";
import InteractiveText from "~/interfaces/UI/Text/InteractiveText";
import UIText from "./UIText";

// Contains interaction definitions for each mouse state
export default class ButtonText extends UIText implements InteractiveText {
    clickedAction: Function;
    clicked: boolean = false;
    
    constructor(properties: Text, clickedAction: Function) {
        super(properties);
        this.clickedAction = clickedAction;
    }

    // Event for when the pointer is held down
    // Text style is swapped to the clicked style
    pointerDown(text: Phaser.GameObjects.Text) {
        text.setStyle(this.clickedStyle);
        this.clicked = true;
    }

    // Event for when the pointer is released after being held down
    // Text style is swapped to the hover style
    pointerUp(text: Phaser.GameObjects.Text) {
        text.setStyle(this.hoverStyle);
        
        // Perform action if clicked
        if (this.clicked) this.clickedAction(this, text);
        this.clicked = false;
    }

    // Event for when the pointer is moved while over the text
    // Currently, nothing happens
    pointerMove(text: Phaser.GameObjects.Text) {

    }

    // Event for when the pointer is hovering over the text
    // Text style is swapped to the hover style
    pointerOver(text: Phaser.GameObjects.Text) {
        text.setStyle(this.hoverStyle);
    }

    // Event for when the pointer leaves the text
    // Text style is swapped to the normal style
    pointerOut(text: Phaser.GameObjects.Text) {
        text.setStyle(this.normalStyle);

        this.clicked = false;
    }
}