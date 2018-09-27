import 'phaser';
import Worker from '../actors/worker';
import Table from '../actors/table';

const {
    Text,
    Image,
    Container
} = Phaser.GameObjects;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('bg', 'assets/office.png');

        this.load.image('table1', 'assets/office/table1.png');
        this.load.image('table2', 'assets/office/table2.png');
        this.load.image('table3', 'assets/office/table3.png');
        this.load.image('table4', 'assets/office/table4.png');

        this.load.image('worker1', 'assets/workers/worker1.png');
        this.load.image('worker2', 'assets/workers/worker2.png');
        this.load.image('worker3', 'assets/workers/worker3.png');
        this.load.image('worker4', 'assets/workers/worker4.png');
    }

    create() {
        console.log('Game', 'create');

        const view = new View(this);

        this.children.add(view);

        // TODO
        // setTimeout(() => {
        //     this.events.emit('onSceneEvent', 'Game', 'transition');
        //     this.scene.start(Math.random() - 0.5 > 0 ? 'Success' : 'Fail');
        // }, 2000);
    }
}

class View extends Container {
    constructor() {
        super(...arguments);

        const bg = new Image(this.scene, 0, 0, 'bg');
        bg.setOrigin(0);
        this.add(bg);

        const text = new Text(
            this.scene,
            0, 0,
            'Game',
            {
                fontSize: 40,
                fill: '#ff0000'
            }
        );
        text.setOrigin(0.5);
        text.setPosition(
            this.scene.game.config.width >> 1,
            this.scene.game.config.height >> 1
        );
        this.add(text);

        this.createWorkers();
        this.createTables();
    }

    createWorkers() {
        const scene = this.scene;

        this.add(new Worker(scene, {
            x: 135,
            y: 250,
            spriteName: 'worker1',
            width: 70,
            height: 160,
            characteristics: {
                foodLossRate: 700,
                energyLossRate: 400
            }
        }));

        this.add(new Worker(scene, {
            x: 465,
            y: 250,
            spriteName: 'worker2',
            width: 70,
            height: 160,
            characteristics: {
                foodLossRate: 500,
                energyLossRate: 600
            }
        }));

        this.add(new Worker(scene, {
            x: 135,
            y: 450,
            spriteName: 'worker3',
            width: 70,
            height: 160,
            characteristics: {
                foodLossRate: 300,
                energyLossRate: 800
            }
        }));

        this.add(new Worker(scene, {
            x: 465,
            y: 450,
            spriteName: 'worker4',
            width: 70,
            height: 160,
            characteristics: {
                foodLossRate: 900,
                energyLossRate: 200
            }
        }));
    }

    createTables() {
        const scene = this.scene;

        this.add(new Table(scene, {
            x: 135,
            y: 280,
            spriteName: 'table1'
        }));

        this.add(new Table(scene, {
            x: 465,
            y: 280,
            spriteName: 'table2'
        }));

        this.add(new Table(scene, {
            x: 135,
            y: 480,
            spriteName: 'table3'
        }));

        this.add(new Table(scene, {
            x: 465,
            y: 480,
            spriteName: 'table4'
        }));
    }
}