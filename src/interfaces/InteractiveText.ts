import Phaser from "phaser";

export default interface InteractiveText {
    text: string;
    offset: Phaser.Math.Vector2;
    textStyle: Phaser.Types.GameObjects.Text.TextStyle;
    normalColor: string;
    hoverColor: string;
    clickedColor:string;

    add(position: Phaser.Math.Vector2, scene: Phaser.Scene): void;

    pointerDown(): void;
    pointerUp(): void;
    pointerMove(): void;
    pointerOver(text: Phaser.GameObjects.Text): void;
    pointerOut(): void;
}