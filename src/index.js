import 'phaser';
import Config from './config';
import Controller from './scenes/Controller';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import SuccessScene from './scenes/SuccessScene';
import FailScene from './scenes/FailScene';

const config = {
    type: Phaser.AUTO,
    parent: Config.APP_ID,
    width: Config.WIDTH,
    height: Config.HEIGHT,
    scene: [
        Controller,
        IntroScene,
        StartScene,
        GameScene,
        SuccessScene,
        FailScene
    ]
};

const game = new Phaser.Game(config);