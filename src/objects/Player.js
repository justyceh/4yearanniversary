import Phaser from "phaser";

export default class Player {
  constructor(scene, x, y, texture) {

    this.sprite = scene.physics.add.sprite(x, y, texture);

    this.sprite.setCollideWorldBounds(true);
    this.speed = 200;
    this.sprite.body.setSize(64,64);

    this.createAnimations(scene);


  }

  createAnimations(scene) {
    // Prevent duplicate creation if scene restarts
    if (scene.anims.get("walk-up")) return;

    scene.anims.create({
      key: "walk-up",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "walk-left",
      frames: scene.anims.generateFrameNumbers("player", { start: 9, end: 17 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "walk-down",
      frames: scene.anims.generateFrameNumbers("player", { start: 18, end: 26 }),
      frameRate: 10,
      repeat: -1
    });

    scene.anims.create({
      key: "walk-right",
      frames: scene.anims.generateFrameNumbers("player", { start: 27, end: 35 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update(cursors) {
    const sprite = this.sprite;

    let vx = 0;
    let vy = 0;

    if (cursors.left.isDown) vx = -this.speed;
    else if (cursors.right.isDown) vx = this.speed;

    if (cursors.up.isDown) vy = -this.speed;
    else if (cursors.down.isDown) vy = this.speed;

    sprite.setVelocity(vx, vy);

    if (vx < 0) sprite.anims.play("walk-left", true);
    else if (vx > 0) sprite.anims.play("walk-right", true);
    else if (vy < 0) sprite.anims.play("walk-up", true);
    else if (vy > 0) sprite.anims.play("walk-down", true);
    else sprite.anims.stop();
  }
}
