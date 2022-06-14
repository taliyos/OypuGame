import Phaser from "phaser";

export default class OfflineGame extends Phaser.Scene {

    constructor() {
        super("OfflineGame");
    }

    preload() {

    }

    create() {
        this.add.text(200, 200, "hello");
    }

    update() {

    }

}