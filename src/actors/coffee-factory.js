import Factory from '../actors/factory';
import Coffee from '../actors/coffee';

export default class CoffeeFactory extends Factory {
	produce(scene) {
		return new Coffee(scene);
	}
}
