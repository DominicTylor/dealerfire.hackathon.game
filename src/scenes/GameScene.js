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
	    this.load.image('message1', 'assets/messages/message1.png');
	    this.load.image('message2', 'assets/messages/message2.png');

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

	            message: {
		            x: -46,
		            y: -128,
		            spriteName: 'message1',
		            text: {
			            x: 0,
			            y: -11
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

	            message: {
		            x: 54,
		            y: -130,
		            spriteName: 'message2',
		            text: {
			            x: 2,
			            y: -11
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

	            message: {
		            x: -42,
		            y: -110,
		            spriteName: 'message1',
		            text: {
			            x: 0,
			            y: -11
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

                message: {
                    x: 55,
                    y: -128,
	                spriteName: 'message2',
                    text: {
                        x: 2,
                        y: -11
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
}
