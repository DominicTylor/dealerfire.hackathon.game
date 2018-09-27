export default class Stuff {
	constructor(scene, x, y) {
		this.sprite = scene.physics.add.sprite(x, y, 'hamburger');
		this.value = 50;
		this.sprite.body.immovable = true;
		this.sprite.setScale(0.1, 0.1);
	}

	destroy() {
		this.sprite.destroy();
		this.value = 0;
	}
}