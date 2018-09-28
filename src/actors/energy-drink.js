import Stuff from './stuff';
import Config from '../config';

export default class EnergyDrink extends Stuff {
	constructor(scene, x, y) {
		super(scene, x, y);

		this.type = 'energyDrink';
		this.value = Config.ENERGY_DRINK_VALUE;
		this.sprite = scene.physics.add.sprite(x, y, 'energy-drink');
		this.sprite.body.immovable = true;
	}
}
