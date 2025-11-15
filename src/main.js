import Phaser from "phaser";
import scene1 from "./scenes/scene1";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1d1d1d",
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
