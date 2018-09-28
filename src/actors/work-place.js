import 'phaser';
import Worker from './worker';
import Table from './table';

export default class WorkPlace extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);

        const worker = this.worker = new Worker(scene, config.worker);
        const table = this.table = new Table(scene, config.table);

        this.add(worker);
        this.add(table);

        this.setPosition(config.x, config.y);
    }

    update() {
        this.worker.update();
    }

    consume(params) {
        return this.worker.consume(params);
    }
}