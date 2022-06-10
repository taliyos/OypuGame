import Phaser from "phaser";

import Text from "~/interfaces/UI/Text";
import InteractiveText from "~/interfaces/UI/InteractiveText";
import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";

// Contains interaction definitions for each mouse state
export default class ButtonText implements Text, InteractiveText, PhaserObject {
    text: string;
    offset: VectorPos;
    origin: VectorPos;
    normalStyle: Phaser.Types.GameObjects.Text.TextStyle;
    hoverStyle: Phaser.Types.GameObjects.Text.TextStyle;
    clickedStyle: Phaser.Types.GameObjects.Text.TextStyle;

    constructor(properties: Text) {
        this.text = properties.text;
        this.offset = properties.offset;
        this.origin = properties.origin;
        this.normalStyle = properties.normalStyle;
        this.hoverStyle = properties.hoverStyle;
        this.clickedStyle = properties.clickedStyle;
    }
    
    // Add the text to the screen
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene) {
        return (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.normalStyle)).setOrigin(this.origin.x, this.origin.y);
    }

    // Event for when the pointer is held down
    // Text style is swapped to the clicked style
    pointerDown(text: Phaser.GameObjects.Text) {
        text.setStyle(this.clickedStyle);
    }

    // Event for when the pointer is released after being held down
    // Text style is swapped to the hover style
    pointerUp(text: Phaser.GameObjects.Text) {
        text.setStyle(this.hoverStyle);
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
    }
}