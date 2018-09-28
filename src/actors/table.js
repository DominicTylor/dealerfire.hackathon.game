import Phaser from 'phaser';

export default class Table extends Phaser.GameObjects.Sprite {
	constructor(scene, { x = 0, y = 0, spriteName }) {
		super(scene, x, y);

		this.setTexture(spriteName);
		this.setPosition(x, y);
		this.setDisplaySize(150, 90);

        scene.physics.add.existing(this);
        this.body.immovable = true;
	}
}
