import Phaser from "phaser";

import InteractiveText from "~/interfaces/UI/InteractiveText";
import InteractiveUI from "~/interfaces/UI/InteractiveUI";
import PhaserObject from "~/interfaces/PhaserObject";

// Contains interaction definitions for each mouse state
export default class ButtonText implements InteractiveText, InteractiveUI, PhaserObject {
    text: string;
    offset: Phaser.Math.Vector2;
    normalStyle: Phaser.Types.GameObjects.Text.TextStyle;
    hoverStyle: Phaser.Types.GameObjects.Text.TextStyle;
    clickedStyle: Phaser.Types.GameObjects.Text.TextStyle;

    constructor(properties: InteractiveText) {
        this.text = properties.text;
        this.offset = properties.offset;
        this.normalStyle = properties.normalStyle;
        this.hoverStyle = properties.hoverStyle;
        this.clickedStyle = properties.clickedStyle;
    }
    
    // Add the text to the screen
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene) {
        console.log(this.normalStyle);
        return (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.normalStyle).setOrigin(0.5));
    }

    pointerDown(text: Phaser.GameObjects.Text) {

    }

    pointerUp(text: Phaser.GameObjects.Text) {

    }

    pointerMove(text: Phaser.GameObjects.Text) {

    }

    // Hover Start
    pointerOver(text: Phaser.GameObjects.Text) {
        text.setStyle(this.hoverStyle);
    }

    // Hover End
    pointerOut(text: Phaser.GameObjects.Text) {
        text.setStyle(this.normalStyle);
    }
}