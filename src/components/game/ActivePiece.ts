import Piece from "./Piece";
import Board from "./Board";

// Holds two active pieces
export default class ActivePiece {
    bottomPiece: Piece;
    topPiece: Piece;

    linkedBoard: Board;

    rotation: number = 0;

    constructor(bottomPiece: Piece, topPiece: Piece, linkedBoard: Board) {
        this.bottomPiece = bottomPiece;
        this.topPiece = topPiece;

        this.linkedBoard = linkedBoard;
    }

    
    // Moves the pieces as a group
    // In order to move the pieces, the collision needs to be valid for
    // both the bottom and top piece.
    // The game does not allow for overhangs, so only the piece on the bottom
    // needs to be checked. (Though the piece to check can change depending on the rotation)
    // dir must be -1, 0, or 1
    move(dir: number) {
        if (this.bottomPiece.boardPos == undefined || this.topPiece.boardPos == undefined) return;
        if (dir == 0) return;
        let piece: Piece;

        if (this.rotation == 0) {
            piece = this.bottomPiece;
        }
        else if (this.rotation == 1) {
            if(dir == 1) piece = this.topPiece;
            piece = this.bottomPiece;
        }
        else if (this.rotation == 2) {
            piece = this.topPiece;
        }
        else if (this.rotation == 3) {
            if (dir == 1) piece = this.bottomPiece;
            else piece = this.topPiece;
        }
        else {
            console.warn("Rotation: " + this.rotation + " is not being handled by activePiece's move().");
            return;
        }

        if (!this.linkedBoard.checkPieceXCollision(piece.position, dir)) {
            this.bottomPiece.boardPos.x += dir;
            this.bottomPiece.position.x = this.linkedBoard.boardToWorldSpace(this.bottomPiece.boardPos).x;

            this.topPiece.boardPos.x += dir;
            this.topPiece.position.x = this.linkedBoard.boardToWorldSpace(this.topPiece.boardPos).x;

            this.bottomPiece.updatePosition();
            this.topPiece.updatePosition();
        }
    }

    // Rotates the pieces as a group
    // dir must be -1, 0, or 1
    rotate(dir: number) {
        // [T] 
        // [B]
        if (this.rotation == 0) {

        }
        // [B][T]
        else if (this.rotation == 1) {
            
        } 
        // [B]
        // [T]
        else if (this.rotation == 2) {

        } 
        // [T][B]
        else if (this.rotation == 3) {

        }
    }

    // Adds the pieces to the screen
    start(scene: Phaser.Scene) {
        this.bottomPiece.add(this.linkedBoard.startCoord, this.linkedBoard, scene);
        this.topPiece.add({
            x: this.linkedBoard.startCoord.x,
            y: this.linkedBoard.startCoord.y - 1
        }, this.linkedBoard, scene);

        this.bottomPiece.startGravity();
        this.topPiece.startGravity();
    }

    // Updates both pieces, performing additional checks for collision
    // and allowing rotation and movement to take place.
    update(delta: number, moveDir: number, rotDir: number) {
        // Update each piece
        this.bottomPiece.update(delta);
        this.topPiece.update(delta);

        // Move the pieces
        this.move(moveDir);

    }

}