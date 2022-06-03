import Phaser from "phaser";

export default class StartMenu extends Phaser.Scene {
    constructor() {
        super("StartMenu");
    }

    // Load in all necessary assets
    // (buttons, backgrounds, etc.)
    preload() {
        const loader = this.load.image("play_btn", "./src/assets/menu/play.png");
    }

    create() {
        const particleManager: Phaser.GameObjects.Particles.ParticleEmitterManager = this.add.particles("play_btn");

        const emitter: Phaser.GameObjects.Particles.ParticleEmitter = particleManager.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0},
            blendMode: "ADD"
        });
        
        const playBtn: Phaser.GameObjects.Image = this.add.image(this.scale.width / 2, this.scale.height / 2, "play_btn");
        playBtn.setInteractive();

        emitter.start();
    }
}