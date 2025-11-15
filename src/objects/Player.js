import Phaser from "phaser";

export default class Player {
    constructor(scene, x, y, texture) {
        this.scene = scene;
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setCollideWorldBounds(true);
        this.speed = 110;
        this.createAnimations();
    }

    createAnimations() {
        if (this.scene.anims.get("walk-up")) return;
        this.scene.anims.create({
          key: "walk-up",
          frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 0, end: 8 }),
          frameRate: 10,
          repeat: -1
        });

        this.scene.anims.create({
          key: "walk-left",
          frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 9, end: 17 }),
          frameRate: 10,
          repeat: -1
        });

        this.scene.anims.create({
          key: "walk-down",
          frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 18, end: 26 }),
          frameRate: 10,
          repeat: -1
        });

        this.scene.anims.create({
          key: "walk-right",
          frames: this.scene.anims.generateFrameNumbers(this.texture, { start: 27, end: 35 }),
          frameRate: 10,
          repeat: -1
        });
    }

    update(cursors) {
    // stop moving first
    this.sprite.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.anims.play("walk-left", true);
    }
    else if (cursors.right.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play("walk-right", true);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      this.sprite.setVelocityY(-160);
      this.sprite.anims.play("walk-up", true);
    }
    else if (cursors.down.isDown) {
      this.sprite.setVelocityY(160);
      this.sprite.anims.play("walk-down", true);
    }

    // Idle
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      this.sprite.anims.stop();
    }
  }
}