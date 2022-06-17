import Board from "~/components/game/Board";
import VectorPos from "./universal/VectorPos";

// A basic interface to easily identify classes
// as addable to the Phaser Scene
export default interface PhaserObject {
    add(coord: VectorPos, linkedBoard: Board, scene: Phaser.Scene): any;
}