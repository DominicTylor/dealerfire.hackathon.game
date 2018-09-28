import 'phaser';
import Worker from './worker';
import Table from './table';
import Message from './message';
import Rip from './rip';

export default class WorkPlace extends Phaser.GameObjects.Container {
	constructor(scene, {
		worker: workerConfig,
		table: tableConfig,
		message: messageConfig,
		rip: ripConfig,
		x,
		y
	}) {
		super(scene);

		this.worker = new Worker(scene, workerConfig);
		this.table = new Table(scene, tableConfig);
		this.message = new Message(scene, messageConfig);
		this.rip = new Rip(scene, ripConfig);

		this.add(this.worker);
		this.add(this.rip);
		this.add(this.table);
		this.add(this.message);

		this.setPosition(x, y);
	}

	showMessage(message) {
		this.message.showMessage(message);
	}

	workerDead() {
		this.rip.showRip();
		this.worker.hideRip();
	}

	update() {
		this.message.hideMessage();
		this.worker.update();
	}

	consume(params) {
		return this.worker.consume(params);
	}
}
