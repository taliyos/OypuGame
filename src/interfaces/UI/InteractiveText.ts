import Phaser from "phaser";

// Interface for Text
// It has separate styles
// for each state: normal, hover, and clicked
export default interface Text {
    text: string;                                           // Contents of the text
    offset: Phaser.Math.Vector2;                            // Offset of the text, applied on add
    origin: Phaser.Math.Vector2;                            // The origin of the text (useful for centering/alignment)
    normalStyle: Phaser.Types.GameObjects.Text.TextStyle;   // Style used when not being interacted with
    hoverStyle: Phaser.Types.GameObjects.Text.TextStyle;    // Style used when pointer hovers over the text
    clickedStyle: Phaser.Types.GameObjects.Text.TextStyle;  // Style used when pointer is held down over text
}