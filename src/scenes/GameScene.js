import 'phaser';
import WorkPlace from '../actors/work-place';
import Worker from '../actors/worker';
import Table from '../actors/table';
import Manager from '../actors/manager';
import HamburgerFactory from '../actors/hamburger-factory';
import EnergyDrinkFactory from '../actors/energy-drink-factory';
import CoffeeFactory from '../actors/coffee-factory';
import Timer from '../actors/timer';

const {
    Text,
    Image,
    Container
} = Phaser.GameObjects;

const geoData = [
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2],[10, 2], [11, 2], [12, 2], [13, 2], [14, 2],
    [0, 4], [1, 4], [4, 4], [5, 4], [9, 4], [10, 4], [13, 4], [14, 4],
    [0, 5], [1, 5], [13, 5], [14, 5],
    [0, 6], [1, 6], [13, 6], [14, 6],
    [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
    [0, 8], [1, 8], [13, 8], [14, 8],
    [0, 9], [1, 9], [2, 9], [3, 9], [11, 9], [12, 9], [13, 9], [14, 9],
    [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [9, 10], [10, 10], [11, 10], [12, 10], [13, 10], [14, 10],
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

    update() {
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
        const hFactory = new HamburgerFactory(this.scene, 65, 125);
        const eFactory = new EnergyDrinkFactory(this.scene, 245, 125);
        const cFactory = new CoffeeFactory(this.scene, 425, 125);

        this.shellContainer = new Phaser.GameObjects.Container(this.scene, 0, 640);

        this.add(manager.sprite);
        this.add(this.shellContainer);

        this.createWorkPlaces();
        // this.createWorkers();
        // this.createTables();

        this.scene.physics.add.collider(manager.sprite, hFactory.sprite, () => this.collideFactory(manager, hFactory));
        this.scene.physics.add.collider(manager.sprite, eFactory.sprite, () => this.collideFactory(manager, eFactory));
        this.scene.physics.add.collider(manager.sprite, cFactory.sprite, () => this.collideFactory(manager, cFactory));

        let {map, layer} = this.addMapGeo(this.scene);

        layer.setCollision(0);
        this.scene.physics.add.collider(manager.sprite, layer);

        manager.sprite.body.setCollideWorldBounds(true);

        this.timer = new Timer({ticksInDay: 300});
        this.dayText = this.scene.make.text(0, 0, 'ads');

        this.shellContainer.add(this.dayText);
    }

    update() {
        this.manager.update();
        this.list.forEach(item => {
            item.update();
        });
        this.timer.update();

        this.dayText.setText(`Day ${this.timer.day} / 10`);

        if (this.timer.fullDays >= 10) {
            // game over
        }
    }

    addMapGeo(scene) {
        let map = scene.make.tilemap({
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

        layer.setActive(true);

        map.setLayer(layer);

        return {
            map,
            layer
        };
    }

    collideFactory(manager, factory) {
        let product = factory.produce(this.scene);

        if (!manager.pickup(manager, product)) {
            product.destroy();
        }
    }

    createWorkPlaces() {
        const scene = this.scene;
        const manager = this.manager;
        const configs = [
            {
                x: 100,
                y: 248,
                worker: {
                    x: 10,
                    y: -30,
                    spriteName: 'worker1',
                    width: 50,
                    height: 130,
                    characteristics: {
                        foodLossRate: 700,
                        energyLossRate: 400
                    }
                },

                table: {
                    spriteName: 'table1'
                }
            },
            {
                x: 500,
                y: 252,
                worker: {
                    x: 6,
                    y: -30,
                    spriteName: 'worker2',
                    width: 50,
                    height: 130,
                    characteristics: {
                        foodLossRate: 500,
                        energyLossRate: 600
                    }
                },

                table: {
                    spriteName: 'table2'
                }
            },
            {
                x: 100,
                y: 420,
                worker: {
                    x: 10,
                    y: -20,
                    spriteName: 'worker3',
                    width: 50,
                    height: 110,
                    characteristics: {
                        foodLossRate: 300,
                        energyLossRate: 800
                    }
                },

                table: {
                    spriteName: 'table3'
                }
            },
            {
                x: 500,
                y: 416,
                worker: {
                    y: -30,
                    spriteName: 'worker4',
                    width: 50,
                    height: 130,
                    characteristics: {
                        foodLossRate: 900,
                        energyLossRate: 200
                    }
                },

                table: {
                    spriteName: 'table4'
                }
            }
        ];

        configs.forEach((config) => {
            config.y += 90;

            const workPlace = new WorkPlace(scene, config);

            this.add(workPlace);

            scene.physics.add.collider(manager.sprite, workPlace.table, () => {
                manager.interact(manager, workPlace);
            });
        });
    }

    createWorkers() {
        const scene = this.scene;
        const manager = this.manager;

        let workers = [
            {
                x: 110,
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
                x: 500,
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
                x: 110,
                y: 400,
                spriteName: 'worker3',
                width: 50,
                height: 110,
                characteristics: {
                    foodLossRate: 300,
                    energyLossRate: 800
                }
            },
            {
                x: 500,
                y: 390,
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
                y: 279,
                spriteName: 'table1'
            },
            {
                x: 500,
                y: 282,
                spriteName: 'table2'
            },
            {
                x: 100,
                y: 430,
                spriteName: 'table3'
            },
            {
                x: 500,
                y: 425,
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
