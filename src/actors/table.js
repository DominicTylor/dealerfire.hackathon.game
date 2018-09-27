import Phaser from 'phaser';

export default class Table extends Phaser.GameObjects.Sprite {
	constructor(scene, { x, y, spriteName }) {
		super(scene, x, y);

		this.setTexture(spriteName);
		this.setPosition(x, y);
		this.setDisplaySize(150, 90);
	}
}
