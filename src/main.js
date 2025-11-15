import Phaser from "phaser";
import scene1 from "./scenes/scene1";

const config = {
  type: Phaser.AUTO,
  width: 1250,
  height: 650,
  backgroundColor: "#ffffff",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {y: 0, x: 0},
    },
  },
  scene: [scene1],
};

new Phaser.Game(config);
