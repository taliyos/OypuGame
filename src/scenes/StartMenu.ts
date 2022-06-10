import Phaser from "phaser";
import ButtonText from "../components/ButtonText";

import Button from "../components/Button";

import pieceSpriteSheet from "../static/pieces/full-sheet.png";
import { playButtonText, playButtonImage } from "../constants/StartMenuUI";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    // Load in all necessary assets
    // (buttons, backgrounds, etc.)
    preload() {
        this.load.spritesheet("piece_sheet", pieceSpriteSheet, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 79
        });
    }

    create() {
        let b = new Button(this.scale.width / 2, 400, new ButtonText(playButtonText), playButtonImage);

            let b2 = new Button(this.scale.width / 2, 527, 
            new ButtonText({
                text: "stats",
                offset: new Phaser.Math.Vector2(50, 0),
                normalStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    fontStyle: "normal",
                    color: "#ffffff",
                },
                hoverStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    color: "#ffff00"
                },
                clickedStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    color: "#778877",
                },
                origin: new Phaser.Math.Vector2(0, 0.5),
            }), 
            {
                texture: "piece_sheet",
                frame: 3,
                offset: new Phaser.Math.Vector2(-50, 0),
                scale: new Phaser.Math.Vector2(0.5, 0.5),
            });

            let b3 = new Button(this.scale.width / 2, 650, 
            new ButtonText({
                text: "settings",
                offset: new Phaser.Math.Vector2(50, 0),
                normalStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    fontStyle: "normal",
                    color: "#ffffff",
                },
                hoverStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    color: "#ffff00"
                },
                clickedStyle: {
                    fontFamily: "MavenPro",
                    fontSize: "64px",
                    color: "#778877",
                },
                origin: new Phaser.Math.Vector2(0, 0.5),
            }), 
            {
                texture: "piece_sheet",
                frame: 2,
                offset: new Phaser.Math.Vector2(-50, 0),
                scale: new Phaser.Math.Vector2(0.5, 0.5),
            });

        b.add(Phaser.Math.Vector2.ZERO, this);
        b2.add(Phaser.Math.Vector2.ZERO, this);
        b3.add(Phaser.Math.Vector2.ZERO, this);



        // Title Text
        /*const titleText = this.add.text(this.scale.width / 2, this.scale.height / 10, "oypu!", {
            fontFamily: "MavenPro",
            fontSize: "132px"
        });

        titleText.setOrigin(0.5);*/
        /*
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

        redPuyoNormal.setInteractive().on("pointerover", function() {

            // Change text color
            playText.setColor("#ffff00");
        });

        redPuyoNormal.setInteractive().on("pointerout", function() {
            playText.setColor("#FF625A");
        });
        */
    }
}