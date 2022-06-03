import Phaser from "phaser";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    create() {
        const particles = this.add.particles("red");

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0},
            blendMode: "ADD"
        });

        emitter.start();
    }
}