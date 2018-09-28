import 'phaser';
import Worker from '../actors/worker';
import Table from '../actors/table';
import Manager from '../actors/manager';
import HamburgerFactory from '../actors/hamburger-factory';
import EnergyDrinkFactory from '../actors/energy-drink-factory';
import CoffeeFactory from '../actors/coffee-factory';

const {
    Text,
    Image,
    Container
} = Phaser.GameObjects;

const geoData = [
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],[10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
    [0, 5], [5, 5], [9, 5], [14, 5],
    [0, 6], [14, 6],
    [0, 7], [14, 7],
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [9, 8], [10, 8], [11, 8], [12, 8],[13, 8], [14, 8],
    [0, 9], [1, 9], [13, 9], [14, 9],
    [0, 10], [1, 10], [2, 10], [3, 10], [11, 10], [12, 10],[13, 10], [14, 10],
    [0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [9, 11], [10, 11], [11, 11], [12, 11],[13, 11], [14, 11],
    [0, 12], [14, 12],
    [0, 13], [14, 13],
    [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [9, 14], [10, 14], [11, 14], [12, 14],[13, 14], [14, 14],
    [0, 15], [1, 15], [2, 15], [3, 15], [4, 15], [5, 15], [9, 15], [10, 15], [11, 15], [12, 15],[13, 15], [14, 15],
    [0, 16], [1, 16], [2, 16], [3, 16], [4, 16], [5, 16], [6, 16], [7, 16], [8, 16], [9, 16], [10, 16], [11, 16], [12, 16],[13, 16], [14, 16],
];

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('bg', 'assets/office.png');
        this.load.image('hamburger', 'assets/hamburger.png');
        this.load.image('coffee', 'assets/coffee.png');
        this.load.image('energy-drink', 'assets/energy.png');
        this.load.image('transparent', 'assets/transparent_tile.png');

        this.load.image('table4', 'assets/office/table1.png');
        this.load.image('table2', 'assets/office/table2.png');
        this.load.image('table3', 'assets/office/table3.png');
        this.load.image('table1', 'assets/office/table4.png');

        this.load.image('worker1', 'assets/workers/worker1.png');
        this.load.image('worker2', 'assets/workers/worker2.png');
        this.load.image('worker3', 'assets/workers/worker3.png');
        this.load.image('worker4', 'assets/workers/worker4.png');

        this.load.atlas({
            key: 'manager',
            textureURL: 'assets/manager/manager.png',
            atlasURL: 'assets/manager/manager.json'
        });
    }

    create() {
        console.log('Game', 'create');

        this.view = new View(this);
        this.children.add(this.view);

        // TODO
        // setTimeout(() => {
        //     this.events.emit('onSceneEvent', 'Game', 'transition');
        //     this.scene.start(Math.random() - 0.5 > 0 ? 'Success' : 'Fail');
        // }, 2000);
    }

    update(){
	    this.view.update();
    }
}

class View extends Container {
    constructor() {
        super(...arguments);

        const bg = new Image(this.scene, 0, 0, 'bg');
        bg.setOrigin(0);
        this.add(bg);

        const manager = this.manager = new Manager(this.scene, 300, 400);
        const hFactory = new HamburgerFactory(this.scene, 65, 190);
        const eFactory = new EnergyDrinkFactory(this.scene, 245, 190);
        const cFactory = new CoffeeFactory(this.scene, 425, 190);

        this.add(manager.sprite);

        this.createWorkers();
        this.createTables();

        this.scene.physics.add.collider(manager.sprite, hFactory.sprite, () => this.collideFactory(manager, hFactory));
        this.scene.physics.add.collider(manager.sprite, eFactory.sprite, () => this.collideFactory(manager, eFactory));
        this.scene.physics.add.collider(manager.sprite, cFactory.sprite, () => this.collideFactory(manager, cFactory));

        let map = this.scene.make.tilemap({
            tileWidth: 40,
            tileHeight: 40,
            width: 600,
            height: 800
        });

        let tileset = map.addTilesetImage('transparent', null, 40, 40, 1, 1);
        let layer = map.createBlankDynamicLayer('Layer 1', tileset);

        geoData.forEach((tile) => {
            layer.putTileAt(0, tile[0], tile[1]);
        });

        layer.setCollision(0);
        layer.setActive(true);
        map.setLayer(layer);

        this.scene.physics.add.collider(manager.sprite, layer, () => console.log(1));

        manager.sprite.body.setCollideWorldBounds(true);
    }

    update() {
        this.manager.update();
        this.list.forEach(item => {
            item.update();
        });
    }

    collideFactory(manager, factory) {
        let product = factory.produce(this.scene);

        if (!manager.pickup(manager, product)) {
            product.destroy();
        }
    }

    createWorkers() {
        const scene = this.scene;
        const manager = this.manager;

        let workers = [
            {
                x: 100,
                y: 250,
                spriteName: 'worker1',
                width: 50,
                height: 130,
                characteristics: {
                    foodLossRate: 700,
                    energyLossRate: 400
                }
            },
            {
                x: 465,
                y: 250,
                spriteName: 'worker2',
                width: 50,
                height: 130,
                characteristics: {
                    foodLossRate: 500,
                    energyLossRate: 600
                }
            },
            {
                x: 100,
                y: 390,
                spriteName: 'worker3',
                width: 50,
                height: 130,
                characteristics: {
                    foodLossRate: 300,
                    energyLossRate: 800
                }
            },
            {
                x: 465,
                y: 372,
                spriteName: 'worker4',
                width: 50,
                height: 130,
                characteristics: {
                    foodLossRate: 900,
                    energyLossRate: 200
                }
            }
        ];

        workers.forEach((config) => {
            config.y += 90;

            const worker = new Worker(scene, config);

            this.add(worker);

            scene.physics.add.collider(manager.sprite, worker, () => {
                manager.interact(manager, worker);
            });
        });
    }

    createTables() {
        const scene = this.scene;
        const manager = this.manager;
        const tables = [
            {
                x: 100,
                y: 274,
                spriteName: 'table1'
            },
            {
                x: 500,
                y: 280,
                spriteName: 'table2'
            },
            {
                x: 100,
                y: 404,
                spriteName: 'table3'
            },
            {
                x: 480,
                y: 404,
                spriteName: 'table4'
            }
        ];


        tables.forEach((config) => {
            config.y += 90;

            const table = new Table(scene, config);

            this.add(table);

            scene.physics.add.collider(manager.sprite, table, () => {
                manager.interact(manager, table);
            });
        });
    }
}
