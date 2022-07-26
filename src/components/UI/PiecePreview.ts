import VectorPos from "~/interfaces/universal/VectorPos";
import UISprite from "./UISprite";

export default class PiecePreview {
    position: VectorPos = { x: 0, y: 0 };

    background: UISprite;
    backgroundImage: Phaser.GameObjects.Rectangle | undefined;

    constructor(bgTexture: string) {
        this.background = this.createBackground(bgTexture);
    }

    setPosition(position: VectorPos) {
        this.position = position;
    }

    add(scene: Phaser.Scene) {
        this.backgroundImage = scene.add.rectangle(this.position.x, this.position.y, 216, 232, Phaser.Display.Color.GetColor(255, 80, 80)).setOrigin(0.5);
        // this.backgroundImage = this.background.add({ x: 0, y: 0 }, scene);
    }

    update() {

    }

    private createBackground(bgTexture: string) : UISprite {
        let sprite = new UISprite({
            texture: bgTexture,
            frame: 0,
            offset: this.position,
            scale: { x: 1, y: 1 }
        });

        return sprite;
    }


}