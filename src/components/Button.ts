import Phaser from "phaser";
import ButtonText from "./ButtonText";
import DefaultImage from "~/interfaces/UI/DefaultImage";

export default class Button {
    position: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
    text:ButtonText;
    image:DefaultImage;

    private sceneText?: Phaser.GameObjects.Text;
    private sceneImage?: Phaser.GameObjects.Image; 

    constructor(x: integer, y: integer, text: ButtonText, image: DefaultImage) {
        this.position.x = x;
        this.position.y = y;

        this.text = text;
        this.image = image;

        this.generateHitbox();
    }

    // Automatically creates the interactive hitbox based on
    // the image and text offset
    private generateHitbox() {

    }

    // Links interactivity of the button to the game
    private linkInteractivity() {
        // Text interactivity is only possible if there is text on the button
        // Temporary return while testing text feedback
        if (this.sceneText == null) return;
        let sceneText : Phaser.GameObjects.Text = this.sceneText;

        // Modify to include hitbox
        this.sceneText.setInteractive().on("pointerdown", () => {this.text.pointerDown(sceneText)}) // pointer click down
                                       .on("pointerup", () => {this.text.pointerUp(sceneText)})     // pointer click release
                                       .on("pointermove", () => {this.text.pointerMove(sceneText)}) // ...
                                       .on("pointerover", () => {this.text.pointerOver(sceneText)}) // hover in
                                       .on("pointerout", () => {this.text.pointerOut(sceneText)});  // hover out

    }

    // Adds the button to the Phaser Game
    add(scene: Phaser.Scene) {
        // Add the text to the scene
        if (this.text != null) {
            this.sceneText = this.text.add(this.position, scene);
        }

        // Add the button to the scene
        if (this.image != null) {
            this.sceneImage = scene.add.image(this.position.x + this.image.offset.x, this.position.y + this.image.offset.y, this.image.texture, this.image.frame)
                .setOrigin(0.5).setScale(this.image.scale.x, this.image.scale.y);
        }

        // Button now "exists" in scene, so make it interactive
        this.linkInteractivity();
    }
}