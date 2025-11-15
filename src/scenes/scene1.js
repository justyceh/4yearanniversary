import Phaser from "phaser";
import walk from "../assets/walk.png";
import Player from "../objects/Player";

export default class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.spritesheet("player", walk, {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, 400, 300, "player");

  }

    update() {
      this.player.update(this.cursors);
     }
}
