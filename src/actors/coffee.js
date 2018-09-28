import Stuff from './stuff';
import Config from '../config';

export default class Coffee extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'coffee';
		this.value = Config.COFFEE_VALUE;
		this.sprite = scene.physics.add.sprite(x, y, 'coffee');
		this.sprite.body.immovable = true;
	}
}
