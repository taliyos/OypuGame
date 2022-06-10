import Phaser from "phaser";

export default interface InteractiveText {
    text: string;
    offset: Phaser.Math.Vector2;
    normalStyle: Phaser.Types.GameObjects.Text.TextStyle;
    hoverStyle: Phaser.Types.GameObjects.Text.TextStyle;
    clickedStyle: Phaser.Types.GameObjects.Text.TextStyle;
}