import Stuff from './stuff';
import Task from './task';

export default class Manager {
	constructor(scene, x, y) {
		this._speed = 200;
		this.sprite = scene.physics.add.sprite(x, y, 'manager');
		this.keys = scene.input.keyboard.createCursorKeys();
		this.backpack = null;
		this.moving = false;

		scene.anims.create({
			key: 'walk_left',
			frames: [{
				key: 'manager',
				frame: 'left',
				duration: 5
			}],
			frameRate: 5,
			repeat: -1
		});
		scene.anims.create({
			key: 'walk_up',
			frames: [{
				key: 'manager',
				frame: 'back',
				duration: 5
			}, {
				key: 'manager',
				frame: 'back_with_face',
				duration: 5
			}],
			frameRate: 5,
			repeat: -1
		});
		scene.anims.create({
			key: 'walk_right',
			frames: [{
				key: 'manager',
				frame: 'right',
				duration: 5
			}],
			frameRate: 5,
			repeat: -1
		});
		scene.anims.create({
			key: 'walk_down',
			frames: [{
				key: 'manager',
				frame: 'front',
				duration: 5
			}, {
				key: 'manager',
				frame: 'smile',
				duration: 5
			}, {
				key: 'manager',
				frame: 'front',
				duration: 5
			}, {
				key: 'manager',
				frame: 'smile_2',
				duration: 5
			}],
			frameRate: 5,
			repeat: -1
		});

		this.sprite.setScale(0.3, 0.3);
		this.sprite.anims.play('walk_down');

		this.sprite.body.setOffset(15, 400);
		this.sprite.body.setSize(150, 100, false);
	}

	set speed(speed) {
		this._speed = speed;
	}

	get speed() {
		return this._speed;
	}

	pickup(me, stuff) {
		if (this.backpack === null) {
			this.backpack = stuff;

			return true;
		}

		return false;
	}

	interact(me, slave) {
		if (this.backpack !== null && slave.consume(this.backpack)) {
			if (this.backpack instanceof Task) {
				this.backpack.hide();
			} else {
				this.backpack.destroy();
			}

			this.backpack = null;
		}

		if (slave instanceof Manager) {
			console.log('touch me and then just push me, to get my satisfaction');
		}
	}

	consume(stuff) {
		stuff.destroy();

		return true;
	}

	destroyBackpackItem() {
		if (this.backpack && this.backpack instanceof Stuff) {
			this.backpack.destroy();
			this.backpack = null;
		}
	}

	update() {
		this.sprite.body.setVelocity(0);
		this.moving = false;

		if (this.keys.up.isDown) {
			this.sprite.body.setVelocityY(-this.speed);
			this.sprite.anims.play('walk_up', true);
			this.moving = true;
		} else if (this.keys.down.isDown) {
			this.sprite.body.setVelocityY(this.speed);
			this.sprite.anims.play('walk_down', true);
			this.moving = true;
		}

		if (this.keys.left.isDown) {
			this.sprite.body.setVelocityX(-this.speed);
			this.sprite.anims.play('walk_left', true);
			this.moving = true;
		} else if (this.keys.right.isDown) {
			this.sprite.body.setVelocityX(this.speed);
			this.sprite.anims.play('walk_right', true);
			this.moving = true;
		}

		if (!this.moving) {
			this.sprite.anims.stop();
		}

		if (this.keys.space.isDown) {
			this.destroyBackpackItem();
		}

		if (this.backpack !== null) {
			this.backpack.sprite.x = this.sprite.x;
			this.backpack.sprite.y = this.sprite.y;
		}
	}
}

// Actor.Scene.Game