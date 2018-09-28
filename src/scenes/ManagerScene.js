import Manager from '../actors/manager';
import Stuff from '../actors/stuff';

let manager;
let slave;
let cursors;

export default class ManagerScene extends Phaser.Scene {
	preload () {
		this.load.image('logo', 'assets/logo.png');
		this.load.image('stone', 'assets/stone.png');
		this.load.image('hamburger', 'assets/hamburger.png');
		//this.load.spritesheet('manager', 'assets/manager/manager.png', {frameWidth: 800, frameHeight: 1742});
		this.load.atlas({
			key: 'manager',
			textureURL: 'assets/manager/manager.png',
			atlasURL: 'assets/manager/manager.json'
		});
	}

	create () {
		manager = new Manager(this, 100, 100);
		slave = new Manager(this, 200, 200);

		let me = this;
		let stuff = new Stuff(this, 300, 300);
		let logo = this.add.image(400, 150, 'logo');

		this.physics.add.collider(manager.sprite, slave.sprite, () => manager.interact(manager, slave));
		this.physics.add.collider(manager.sprite, stuff.sprite, () => {
			let burger = new Stuff(me, manager.sprite.x, manager.sprite.y);

			if (!manager.pickup(manager, burger)) {
				burger.destroy();
			};
		});

		slave.sprite.body.immovable = true;

		manager.sprite.body.setCollideWorldBounds(true);
	}

	update() {
		manager.update();
	}
}
