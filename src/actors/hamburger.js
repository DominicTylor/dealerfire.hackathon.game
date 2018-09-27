import Stuff from './stuff';

export default class Hamburger extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'food';
		this.value = 30;
		this.sprite = scene.physics.add.sprite(x, y, 'hamburger');
		this.sprite.body.immovable = true;
		this.sprite.setScale(0.1, 0.1);
	}
}
