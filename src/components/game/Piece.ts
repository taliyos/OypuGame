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

    // Attempts to add the piece to the board
    // If the piece has already been added to the board, it will not add the piece
    addToBoard() {
        if (this.linkedBoard == undefined || this.boardPos == undefined) return;
        // Add Piece to the board
        this.linkedBoard.addPieceToBoard(this, this.boardPos);
        this.gravity = false;

        // "Snap" position to boardPos
        this.position = this.linkedBoard.boardToWorldSpace(this.boardPos);
        this.updatePosition();
    }

    // Attempts to remove the piece from the board
    // If the piece is not on the board, nothing happens
    removeFromBoard() {

    }

    update(delta: number) : boolean {
        if (!this.gravity) {
            console.warn("update() should not be called when not affected by gravity!");
            return false;
        }
        
        this.applyGravity(delta);
        return this.checkForCollision(); 
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
    private checkForCollision() : boolean {
        // Check bottom of the board
        if (this.linkedBoard == undefined) return false;
        this.boardPos = this.linkedBoard.worldSpaceToBoard(this.position);
        if (this.linkedBoard.checkPieceDownCollision(this.boardPos)) {
            this.addToBoard();
            return true;
        }
        return false;
    }

    // Updates the position of the piece image based on the internally stored
    // position variable.
    // Modifies the sceneImage position
    updatePosition() {
        this.sceneImage?.setPosition(this.position.x, this.position.y); 
    }
}