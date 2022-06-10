// A basic interface to easily identify classes
// as addable to the Phaser Scene
export default interface PhaserObject {
    add(position: Phaser.Math.Vector2, scene: Phaser.Scene): void;
}