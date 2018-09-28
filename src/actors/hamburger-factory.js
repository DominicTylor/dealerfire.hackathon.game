import Factory from '../actors/factory';
import Hamburger from '../actors/hamburger';

export default class HamburgerFactory extends Factory {
	produce(scene) {
		return new Hamburger(scene);
	}
}
