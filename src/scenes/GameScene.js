import 'phaser';

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
    }

    create() {
        console.log('Game', 'create');

        const view = new View(this);

        this.children.add(view);

        // TODO
        setTimeout(() => {
            this.events.emit('onSceneEvent', 'Game', 'transition');
            this.scene.start(Math.random() - 0.5 > 0 ? 'Success' : 'Fail');
        }, 2000);
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
    }
}