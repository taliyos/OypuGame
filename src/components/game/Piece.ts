import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";
import Board from "./Board";
import { PieceScale } from "../../constants/GameOptions";

// A single piece
// This is not connected to anything else and operates individually
export default class Piece {
    texture: string;
    frame: integer;
    gravity: boolean = false;
    position: VectorPos = { x : 0, y: 0 };
    linkedBoard?: Board;
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

    // Adds the piece to the screen at the specified coordinate in board space
    add(coord: VectorPos, linkedBoard: Board, scene: Phaser.Scene): Phaser.GameObjects.Image {
        this.linkedBoard = linkedBoard;
        let position: VectorPos = linkedBoard.boardToWorldSpace(coord);
        this.position.x += position.x;
        this.position.y += position.y;
        this.sceneImage = scene.add.image(this.position.x, this.position.y, this.texture, this.frame).setOrigin(0.5);
        this.sceneImage.setScale(PieceScale.x, PieceScale.y)
        return this.sceneImage;
    }

    update(delta: number) {
        if (!this.gravity) {
            console.warn("update() should not be called when not affected by gravity!");
            return;
        }
        
        this.applyGravity(delta);
        this.checkForCollision(); 
    }

    // Applies gravity to the piece, updating the internal position in the process
    // This only utilizes the world's cooridnate system and doesn't care about the
    // board.
    private applyGravity(delta: number) {
        this.position.y += 1 * delta;
        this.sceneImage?.setPosition(this.position.x, this.position.y);  
    }

    private checkForCollision() {
        // Check bottom of the board
        if (this.linkedBoard == undefined) return;
        let boardPos = this.linkedBoard.worldSpaceToBoard(this.position);
        if (boardPos.y >= this.linkedBoard.y - 1) {
            this.gravity = false;
        }
    }
}