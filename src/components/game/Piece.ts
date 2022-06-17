import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";
import { PieceScale } from "../../constants/GameOptions";

// A single piece
// This is not connected to anything else and operates individually
export default class Piece implements PhaserObject {
    texture: string;
    frame: integer;
    gravity: boolean = false;
    position: VectorPos = { x : 0, y: 0 };
    sceneImage?: Phaser.GameObjects.Image;

    constructor(texture: string, frame: integer, position?: VectorPos) {
        this.texture = texture;
        this.frame = frame;
        if (position) {
            this.position = position;
        }
    }

    startGravity() {
        this.gravity = true;
    }

    add(position: VectorPos, scene: Phaser.Scene): Phaser.GameObjects.Image {
        this.sceneImage = scene.add.image(this.position.x + position.x, this.position.y + position.y, this.texture, this.frame).setOrigin(0.5);
        this.sceneImage.setScale(PieceScale.x, PieceScale.y)
        return this.sceneImage;
    }

    update(delta: number) {
        if (!this.gravity) {
            console.warn("update() should not be called when not affected by gravity!");
            return;
        }
        this.position.y += 1 * delta;
        this.sceneImage?.setPosition(this.position.x, this.position.y);   
    }
}