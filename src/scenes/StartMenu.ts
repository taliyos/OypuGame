import Phaser from "phaser";

import playButtonImage from "../static/menu/play.png";
import pieceSpriteSheet from "../static/pieces/full-sheet.png";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    // Load in all necessary assets
    // (buttons, backgrounds, etc.)
    preload() {
        this.load.image("play_btn", playButtonImage);

        this.load.spritesheet("piece_sheet", pieceSpriteSheet, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 79
        });
    }

    create() {
        // const playBtn: Phaser.GameObjects.Image = this.add.image(this.scale.width / 2, this.scale.height / 2, "play_btn");
        // playBtn.setInteractive();

        // Title Text
        const titleText = this.add.text(this.scale.width / 2, this.scale.height / 10, "oypu!", {
            fontFamily: "MavenPro",
            fontSize: "132px"
        });

        titleText.setOrigin(0.5);

        // Red Puyo/Play Button
        const redPuyoNormal = this.add.image(this.scale.width / 3, 400, "piece_sheet", 0);
        redPuyoNormal.setScale(0.5, 0.5);
        redPuyoNormal.setOrigin(0.5);
        const playText = this.add.text(this.scale.width / 3 + 150, 400, "Play", {
            fontFamily: "MavenPro",
            fontSize: "64px",
            color: "#FF625A"
        });
        playText.setOrigin(0.5);

        redPuyoNormal.setInteractive().on("pointerover", function(pointer, localX, localY, event) {
            console.log(pointer);
            console.log(localX);
            console.log(localY);
            console.log(event);

            // Change text color
            playText.setColor("#ffff00");
        });

        redPuyoNormal.setInteractive().on("pointerout", function(pointer, localX, localY, event) {
            playText.setColor("#FF625A");
        });
    }
}