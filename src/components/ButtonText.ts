import Phaser from "phaser";

import InteractiveText from "~/interfaces/InteractiveText";

// Contains interaction definitions for each mouse state
export default class ButtonText implements InteractiveText {
    text: string;
    offset: Phaser.Math.Vector2;
    textStyle: Phaser.Types.GameObjects.Text.TextStyle;
    normalColor: string;
    hoverColor: string;
    clickedColor:string;

    constructor(properties: InteractiveText) {
        this.text = properties.text;
        this.offset = properties.offset;
        this.textStyle = properties.textStyle;
        this.normalColor = properties.normalColor;
        this.hoverColor = properties.hoverColor;
        this.clickedColor = properties.clickedColor;
    }
    
    // Add the text to the screen
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene) {
        return (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.textStyle).setOrigin(0.5));
    }

    pointerDown() {

    }

    pointerUp() {

    }

    pointerMove() {

    }

    // Hover Start
    pointerOver(text: Phaser.GameObjects.Text) {
        text.setColor(this.hoverColor);
    }

    // Hover End
    pointerOut(text: Phaser.GameObjects.Text) {
        text.setColor(this.normalColor);
    }
}