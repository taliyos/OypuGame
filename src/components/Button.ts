import Phaser from "phaser";
import InteractiveText from "~/interfaces/InteractiveText";
import DefaultImage from "~/interfaces/DefaultImage";

export default class Button {
    position: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0);
    text:InteractiveText;
    image:DefaultImage;

    constructor(x: integer, y: integer, text: InteractiveText, image: DefaultImage) {
        this.position.x = x;
        this.position.y = y;

        this.text = text;
        this.image = image;

        this.generateHitbox();
    }

    // Automatically creates the interactive hitbox based on
    // the image and text offset
    generateHitbox() {

    }

    // Links interactivity of the button to the game
    linkInteractivity() {

    }

    // Adds the button to the Phaser Game
    add(scene: Phaser.Scene) {
        // Add the text to the scene
        const text = scene.add.text(this.position.x + this.text.offset.x, this.position.y + this.text.offset.y, 
            this.text.text, this.text.textStyle)
            .setOrigin(0.5);

        // Add the button to the scene
        const image = scene.add.image(this.position.x + this.image.offset.x, this.position.y + this.image.offset.y, this.image.texture, this.image.frame)
            .setOrigin(0.5).setScale(this.image.scale.x, this.image.scale.y);
    }
}