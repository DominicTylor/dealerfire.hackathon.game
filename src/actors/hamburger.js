import Stuff from './stuff';
import Config from '../config';

export default class Hamburger extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'food';
		this.value = Config.HAMBURGER_VALUE;
		this.sprite = scene.physics.add.sprite(x, y, 'hamburger');
		this.sprite.body.immovable = true;
	}
}
