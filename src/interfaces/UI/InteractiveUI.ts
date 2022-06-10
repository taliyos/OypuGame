export default interface InteractiveUI {
    pointerDown(text: Phaser.GameObjects.Text): void;
    pointerUp(text: Phaser.GameObjects.Text): void;
    pointerMove(text: Phaser.GameObjects.Text): void;
    pointerOver(text: Phaser.GameObjects.Text): void;
    pointerOut(text: Phaser.GameObjects.Text): void;
}