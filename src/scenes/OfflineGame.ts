import Phaser from "phaser";
import GameManager from "../components/game/GameManager";

import ColorCycleText from "../components/UI/ColorCycleText";
import pieceSpriteSheet from "../static/pieces/full-sheet.png";

import {
    playButtonText, playButtonImage, statsButtonText, statsButtonImage,
    settingsButtonText, settingsButtonImage, titleTextStyleA, titleTextStyleB, titleTextStyleC
} from "../constants/StartMenuUI";

export default class OfflineGame extends Phaser.Scene {
    gameManager: GameManager;
    sampleText: ColorCycleText | undefined;

    constructor() {
        super("OfflineGame");
        this.gameManager = new GameManager("piece_sheet");
    }

    preload() {
        // Loads the piece sprite sheet into memory
        this.load.spritesheet("piece_sheet", pieceSpriteSheet, {
            frameWidth: 256,
            frameHeight: 256,
            endFrame: 79
        });
    }

    create() {
        this.gameManager.create(this);
        this.gameManager.test(this);

        this.sampleText = new ColorCycleText({
            text: "game",
            normalStyle: titleTextStyleA,
            hoverStyle: titleTextStyleB,
            clickedStyle: titleTextStyleC,
            origin: { x: 0.5, y: 0.5 },
            offset: { x: this.scale.width - 400, y: this.scale.height - 200 },
        },
            ["#000000",
            "#ffffff",
            "#ffff88",
            "#ff8800", 
            "#880000"],
            0.5,
        {
            repeat: true,
            bounce: true
        });
        this.sampleText.add({x: 0, y: 0}, this);

        // Player Input Setup
        this.input.keyboard.on("keydown-A", () => {this.gameManager.moveLeft()}, this);
        this.input.keyboard.on("keydown-D", () => {this.gameManager.moveRight()}, this);
        this.input.keyboard.on("keydown-LEFT", () => {this.gameManager.rotLeft()}, this);
        this.input.keyboard.on("keydown-RIGHT", () => {this.gameManager.rotRight()}, this);
    }

    update(time: number, delta:number) {
        this.sampleText?.update(delta);
        this.gameManager.update(delta, this);
    }

}