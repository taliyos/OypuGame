import { GapSize, PieceScale, TileSize } from "../../constants/GameOptions";
import VectorPos from "~/interfaces/universal/VectorPos";
import ActivePiece from "../game/ActivePiece";
import UISprite from "./UISprite";

export default class PiecePreview {
    position: VectorPos = { x: 0, y: 0 };

    background: UISprite;
    backgroundImage: Phaser.GameObjects.Rectangle | undefined;

    nextPieceScene : Phaser.GameObjects.Image[] = [];
    futurePieceScene : Phaser.GameObjects.Image[] = [];

    width: number = 216;
    height: number = 232;

    previewScale: number = 0.25;

    nextPiecePos : VectorPos = { x: 0, y: 0 };
    futurePiecePos : VectorPos = { x: 0, y: 0 };

    constructor(bgTexture: string) {
        this.background = this.createBackground(bgTexture);
    }

    setPosition(position: VectorPos) {
        this.position = position;

        this.nextPiecePos = { x: position.x, y: position.y };
        this.nextPiecePos.x -= this.width / 4;

        this.futurePiecePos = { x: position.x, y: position.y };
        this.futurePiecePos.x -= this.width / 4 - GapSize.x;
    }

    add(scene: Phaser.Scene) {
        this.backgroundImage = scene.add.rectangle(this.position.x, this.position.y, this.width, this.height, Phaser.Display.Color.GetColor(255, 80, 80)).setOrigin(0.5);
        // this.backgroundImage = this.background.add({ x: 0, y: 0 }, scene);
    }

    update(scene: Phaser.Scene, nextPiece : ActivePiece, futurePiece : ActivePiece) {
        // Remove previous scene images
        this.removePreviews();
        
        this.nextPieceScene = this.addPreview(scene, nextPiece, this.nextPiecePos);
        this.futurePieceScene = this.addPreview(scene, futurePiece, this.futurePiecePos);
    }

    // Adds a preview of the given active piece to the scene
    private addPreview(scene: Phaser.Scene, activePiece: ActivePiece, position: VectorPos) : Phaser.GameObjects.Image[] {
        let images : Phaser.GameObjects.Image[] = [];

        images.push(scene.add.image(position.x, position.y, activePiece.topPiece.texture, activePiece.topPiece.frame).setScale(this.previewScale));
        images.push(scene.add.image(position.x, position.y - ((0.28*TileSize.y)/PieceScale.y), activePiece.bottomPiece.texture, activePiece.bottomPiece.frame).setScale(this.previewScale));

        return images;
    }

    private removePreviews() {
        for (let i = 0; i < this.nextPieceScene.length; i++) {
            this.nextPieceScene[i].destroy();
        }
        for (let i = 0; i < this.futurePieceScene.length; i++) {
            this.futurePieceScene[i].destroy();
        }

        this.nextPieceScene = [];
        this.futurePieceScene = [];
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