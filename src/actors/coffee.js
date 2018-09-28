import Stuff from './stuff';

export default class Coffee extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'coffee';
		this.value = 25;
		this.sprite = scene.physics.add.sprite(x, y, 'coffee');
		this.sprite.body.immovable = true;
	}
}
