import 'phaser';
import Config from './config';
import Controller from './scenes/Controller';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import SuccessScene from './scenes/SuccessScene';
import FailScene from './scenes/FailScene';
import './scss/style.scss';

const wrapper = document.querySelector('.wrapper');
const config = {
    type: Phaser.AUTO,
    parent: wrapper,
    width: Config.WIDTH,
    height: Config.HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [
        Controller,
        IntroScene,
        StartScene,
        GameScene,
        SuccessScene,
        FailScene
    ],
	fps: {
		target: 30
	}
};

const game = new Phaser.Game(config);
