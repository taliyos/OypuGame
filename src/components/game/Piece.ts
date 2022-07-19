import PhaserObject from "~/interfaces/PhaserObject";
import VectorPos from "~/interfaces/universal/VectorPos";
import Board from "./Board";
import { PieceScale } from "../../constants/GameOptions";
import { PieceType } from "../../enums/PieceType";
import BoardTile from "~/interfaces/game/BoardTile";

// A single piece
// This is not connected to anything else and operates individually
export default class Piece {
    texture: string;
    frame: integer;
    gravity: boolean = false;
    position: VectorPos = { x : 0, y: 0 };
    boardPos: VectorPos | undefined;
    type: PieceType = PieceType.Red;
    linkedBoard?: Board;
    sceneImage?: Phaser.GameObjects.Image;

    constructor(texture: string, frame: integer, type?: PieceType, position?: VectorPos) {
        this.texture = texture;
        this.frame = frame;
        if (type) this.type = type;
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
        // Add Piece to thef board
        this.linkedBoard.addPieceToBoard(this, this.boardPos);
        this.gravity = false;

        // "Snap" position to boardPos
        this.position = this.linkedBoard.boardToWorldSpace(this.boardPos);
        this.updatePosition();
    }

    // Attempts to remove the piece from the board
    // If the piece is not on the board, nothing happens
    removeFromBoard() {
        if (this.linkedBoard == undefined || this.boardPos == undefined) return;

        this.linkedBoard.removePieceFromBoard(this.boardPos);
    }

    // Used when the active piece enters the buffer period where the piece
    // can still be moved and rotating, but is no longer actively falling
    bufferStop() {
        this.gravity = false;

        if (this.linkedBoard == undefined || this.boardPos == undefined) return;

        // "Snap" position to boardPos
        this.position = this.linkedBoard.boardToWorldSpace(this.boardPos);
        this.updatePosition();
    }

    update(delta: number, active: boolean = false) : boolean {
        if (!this.gravity && !active) {
            console.warn("update() should not be called when not affected by gravity!");
            return false;
        }
        
        this.applyGravity(delta);
        return this.checkForCollision(active); 
    }

    // Applies gravity to the piece, updating the internal position in the process
    // This only utilizes the world's cooridnate system and doesn't care about the
    // board.
    private applyGravity(delta: number) {
        if (!this.gravity) return;
        this.position.y += 0.5 * delta;
        this.updatePosition(); 
    }

    // Checks for collision with other pieces and the bottom of the board
    // If a collision is found, gravity is stopped and the piece is added
    // to the board.
    private checkForCollision(active: boolean = false) : boolean {
        // Check bottom of the board
        if (this.linkedBoard == undefined) return false;
        this.boardPos = this.linkedBoard.worldSpaceToBoard(this.position);
        if (this.linkedBoard.checkPieceDownCollision(this.boardPos)) {
            this.gravity = false;
            if (!active) this.addToBoard();
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

    // GRAPHICS

    // Updates the sprite to "sync" with nearby pieces in the same chain
    updateSprite() {
        if (this.linkedBoard == undefined || this.boardPos == undefined) return;

        // Get the adjacent tiles
        let down : integer | undefined = this.linkedBoard.getPiece({ x: this.boardPos.x, y: this.boardPos.y - 1 })?.type;
        let left : integer | undefined = this.linkedBoard.getPiece({ x: this.boardPos.x - 1, y: this.boardPos.y })?.type;
        let right : integer | undefined  = this.linkedBoard.getPiece({ x: this.boardPos.x + 1, y: this.boardPos.y })?.type;
        let up : integer | undefined = this.linkedBoard.getPiece({ x: this.boardPos.x, y: this.boardPos.y + 1 })?.type;
    
        let sprite = 0;
        if (down == this.type) sprite += 2;
        if (left == this.type) sprite += 8;
        if (right == this.type) sprite += 4;
        if (up == this.type) sprite += 1;

        this.frame = sprite;
        this.sceneImage?.setFrame(this.frame);


    }

}