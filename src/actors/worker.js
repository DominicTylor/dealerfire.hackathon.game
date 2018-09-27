import Phaser from 'phaser';

export default class Worker extends Phaser.GameObjects.Sprite {
	constructor(scene, { x, y, width, height, spriteName }) {
		super(scene, x, y);

		this.setTexture(spriteName);
		this.setPosition(x, y);
		this.setDisplaySize(width, height);
		this.originY = y;
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
	}

	normalAnim() {
		this.y = this.y === this.originY ? this.y + 2 : this.originY;
	}
}
