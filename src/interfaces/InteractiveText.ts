import Phaser from "phaser";

export default interface InteractiveText {
    text: string;
    offset: Phaser.Math.Vector2;
    textStyle: Phaser.Types.GameObjects.Text.TextStyle;
    normalColor?: string;
    hoverColor?: string;
    clickedColor?:string;
}