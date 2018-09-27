import 'phaser';
import WorkPlace from '../actors/work-place';
import Worker from '../actors/worker';
import Table from '../actors/table';
import Manager from '../actors/manager';
import Hamburger from '../actors/hamburger';

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
        this.load.image('hamburger', 'assets/hamburger.png');

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
        const stuff = new Hamburger(this.scene, 200, 400);

        this.add(manager.sprite);
        this.add(stuff.sprite);

        this.createWorkPlaces();
        // this.createWorkers();
        // this.createTables();

        this.scene.physics.add.collider(manager.sprite, stuff.sprite, () => {
            let burger = new Hamburger(this.scene, manager.sprite.x, manager.sprite.y);

            if (!manager.pickup(manager, burger)) {
                burger.destroy();
            }
        });

        manager.sprite.body.setCollideWorldBounds(true);
    }

    update() {
        this.manager.update();
        this.list.forEach(item => {
            item.update();
        });
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
