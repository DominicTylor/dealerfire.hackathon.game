import 'phaser';

export default class Controller extends Phaser.Scene {
    constructor() {
        super('Controller');
    }

    create() {
        [
            'Intro',
            'Start',
            'Game',
            'Success',
            'Fail'
        ].forEach((sceneName) => {
            this.scene.get(sceneName).events.on('onSceneEvent', this.sceneEventHandler.bind(this));
        });

        this.scene.start('Start');
    }

    sceneEventHandler(event, data) {
        console.log('sceneEventHandler', event, data);

        switch (event) {
            case 'gameSuccess': {
                this.scene.start('Success');
                break;
            }

            case 'gameFail': {
                // this.scene.start('Fail');
                break;
            }

            case 'gameStart': {
                this.scene.start('Game');
                break;
            }

            case 'gameRetry': {
                this.scene.start('Start');
                break;
            }

            default:
                console.warn('Unknown event');
        }
    }
}