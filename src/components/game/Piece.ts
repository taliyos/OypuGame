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
    boardPos: VectorPos | undefined;
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
        this.position.y += 0.5 * delta;
        this.updatePosition(); 
    }

    // Checks for collision with other pieces and the bottom of the board
    // If a collision is found, gravity is stopped and the piece is added
    // to the board.
    private checkForCollision() {
        // Check bottom of the board
        if (this.linkedBoard == undefined) return;
        this.boardPos = this.linkedBoard.worldSpaceToBoard(this.position);
        if (this.linkedBoard.checkPieceDownCollision(this.boardPos)) {
            // Add Piece to the board
            this.linkedBoard.addPieceToBoard(this, this.boardPos);
            this.gravity = false;

            // "Snap" position to boardPos
            this.position = this.linkedBoard.boardToWorldSpace(this.boardPos);
            this.updatePosition();
        }
    }

    // Player Input Interactions

    // Moves the piece along the x-axis, as long as the new position is valid
    // Will run without errors no matter the input
    move(dir: integer) {
        if (this.linkedBoard == undefined || this.boardPos == undefined) return;
        if (dir == 0 || dir == undefined) return;
        else if (!this.linkedBoard.checkPieceXCollision(this.position, dir)) {
            // Only update the x position
            // Otherwise there will be a noticeable "jump" to lock into a board
            // space y position.
            this.boardPos.x += dir;
            this.position.x = this.linkedBoard.boardToWorldSpace(this.boardPos).x;
            this.updatePosition();
        }
    }

    // Updates the position of the piece image based on the internally stored
    // position variable.
    // Modifies the sceneImage position
    private updatePosition() {
        this.sceneImage?.setPosition(this.position.x, this.position.y); 
    }
}