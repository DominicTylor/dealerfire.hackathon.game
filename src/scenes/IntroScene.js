import 'phaser';
import config from '../config';

const {Image, Text} = Phaser.GameObjects;

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
        console.log('Intro', 'preload');
    }

    create() {
        console.log('Intro', 'create');

        const view = new View(this);

        this.children.add(view);

        setTimeout(() => {
            this.events.emit('onSceneEvent', 'Intro', 'transition');
            this.scene.start('Start');
        }, 2000);
    }
}

class View extends Phaser.GameObjects.Container {
    constructor() {
        super(...arguments);

        const text = new Phaser.GameObjects.Text(
            this.scene,
            0, 0,
            'Intro',
            {
                fontSize: 40,
                fill: '#ff0000'
            }
        );
        this.add(text);

        text.setOrigin(0.5);
        text.setPosition(
            this.scene.game.config.width >> 1,
            this.scene.game.config.height >> 1
        );
    }
}