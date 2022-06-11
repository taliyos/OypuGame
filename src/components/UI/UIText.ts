import Phaser from "phaser";

import Text from "~/interfaces/UI/Text/Text";
import InteractiveText from "~/interfaces/UI/Text/InteractiveText";
import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";

// Contains interaction definitions for each mouse state
export default class UIText implements Text, PhaserObject {
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
    add(position: VectorPos, scene: Phaser.Scene) {
        return (scene.add.text(position.x + this.offset.x, position.y + this.offset.y, this.text, this.normalStyle)).setOrigin(this.origin.x, this.origin.y);
    }
}