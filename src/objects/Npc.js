import Phaser from "phaser";

export default class Npc {
    constructor(scene, x, y, texture) {
        this.scene = scene;

        // Create a static (non-moving) NPC sprite
        this.sprite = scene.physics.add.staticSprite(x, y, texture);

        this.sprite.body.setSize(1,1);

        // ⭐ Set the frame of the spritesheet to the first frame
        this.sprite.setFrame(6);

        // Optional: NPC blocks the player
        this.sprite.setImmovable(true);
    }

    update() {
        // NPC does not move
    }
}
