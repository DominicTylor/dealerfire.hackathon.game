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

        this.scene.start('Game');
    }

    sceneEventHandler(sceneName, event, data) {
        console.log('sceneEventHandler', sceneName, event, data);
    }
}