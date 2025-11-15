import Phaser from "phaser";
import walk from "../assets/walk.png";

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

    this.player = this.physics.add.sprite(400, 300, "player");
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 17 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 18, end: 26 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 27, end: 35 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    // stop moving first
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("walk-left", true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("walk-right", true);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("walk-up", true);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("walk-down", true);
    }

    // Idle
    if (
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown
    ) {
      this.player.anims.stop();
    }
  }
}
