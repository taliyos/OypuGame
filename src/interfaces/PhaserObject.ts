import VectorPos from "./universal/VectorPos";

// A basic interface to easily identify classes
// as addable to the Phaser Scene
export default interface PhaserObject {
    add(position: VectorPos, scene: Phaser.Scene): void;
}