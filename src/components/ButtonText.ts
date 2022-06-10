import Phaser from "phaser";

import Text from "~/interfaces/UI/Text";
import InteractiveText from "~/interfaces/UI/InteractiveText";
import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";

// Contains interaction definitions for each mouse state
export default class ButtonText implements Text, InteractiveText, PhaserObject {
    text: string;
    offset: VectorPos = { x: 0, y: 0 };
    origin: VectorPos = { x: 0, y: 0 };
    normalStyle: Phaser.Types.GameObjects.Text.TextStyle;
    hoverStyle: Phaser.Types.GameObjects.Text.TextStyle;
    clickedStyle: Phaser.Types.GameObjects.Text.TextStyle;

    constructor(properties: Text) {
        this.text = properties.text;
        if (properties.offset != null)
            this.offset = properties.offset;
        if (properties.origin != null)
            this.origin = properties.origin;
        this.normalStyle = properties.normalStyle;
        this.hoverStyle = properties.hoverStyle;
        this.clickedStyle = properties.clickedStyle;
    }
    
    // Add the text to the screen
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene) {
        return (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.normalStyle)).setOrigin(this.origin.x, this.origin.y);
    }

    linkInteractivity(text: Phaser.GameObjects.Text) {
        // Modify to include hitbox
        text.setInteractive().on("pointerdown", () => {this.pointerDown(text)})            // pointer click down
                                       .on("pointerup",   () => {this.pointerUp(text)})   // pointer click release
                                       .on("pointermove", () => {this.pointerMove(text)}) // not used
                                       .on("pointerover", () => {this.pointerOver(text)}) // hover in
                                       .on("pointerout",  () => {this.pointerOut(text)}); // pointer no longer in text box
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