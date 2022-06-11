import Phaser from "phaser";

import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";
import BasicUISprite from "~/interfaces/UI/Sprite/BasicUISprite";
import InteractiveUISprite from "~/interfaces/UI/Sprite/InteractiveUISprite";

export default class UISprite implements BasicUISprite, PhaserObject {
    texture: string;
    frame: string | number | undefined = 0;
    offset: VectorPos;
    scale: VectorPos;

    constructor(properties: BasicUISprite) {
        this.texture = properties.texture;
        if (this.frame != undefined) this.frame = properties.frame;
        this.offset = properties.offset;
        this.scale = properties.scale;
    }

    add(position: VectorPos, scene: Phaser.Scene) {
        return scene.add.image(position.x + this.offset.x, position.y + this.offset.y, this.texture, this.frame).setOrigin(0.5).setScale(this.scale.x, this.scale.y);
    }

}