import 'phaser';
import Config from './config';
import Controller from './scenes/Controller';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import SuccessScene from './scenes/SuccessScene';
import FailScene from './scenes/FailScene';
import ManagerScene from './scenes/ManagerScene';
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
             debug: true
        }
    },
    scene: [
        Controller,
		ManagerScene,
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

function preload () {
	this.load.image('table1', 'assets/office/table1.png');
	this.load.image('table2', 'assets/office/table2.png');
	this.load.image('table3', 'assets/office/table3.png');
	this.load.image('table4', 'assets/office/table4.png');
    this.load.image('worker1', 'assets/workers/worker1.png');
	this.load.image('worker2', 'assets/workers/worker2.png');
	this.load.image('worker3', 'assets/workers/worker3.png');
	this.load.image('worker4', 'assets/workers/worker4.png');
}

function create () {
    addWorkers.call(this);
	addTables.call(this);
}

function addWorkers() {
	this.add.existing(new Worker(this, {
		x: 128,
		y: 250,
		spriteName: 'worker1',
		width: 60,
		height: 160,
		characteristics: {
			foodLossRate: 700,
			energyLossRate: 400
		}
	}));
	this.add.existing(new Worker(this, {
		x: 465,
		y: 250,
		spriteName: 'worker2',
		width: 60,
		height: 160,
		characteristics: {
			foodLossRate: 500,
			energyLossRate: 600
		}
	}));
	this.add.existing(new Worker(this, {
		x: 135,
		y: 455,
		spriteName: 'worker3',
		width: 50,
		height: 150,
		characteristics: {
			foodLossRate: 300,
			energyLossRate: 800
		}
	}));
	this.add.existing(new Worker(this, {
		x: 478,
		y: 446,
		spriteName: 'worker4',
		width: 60,
		height: 160,
		characteristics: {
			foodLossRate: 900,
			energyLossRate: 200
		}
	}));
}

function addTables() {
	this.add.existing(new Table(this, {
		x: 135,
		y: 280,
		spriteName: 'table1'
	}));
	this.add.existing(new Table(this, {
		x: 465,
		y: 280,
		spriteName: 'table2'
	}));
	this.add.existing(new Table(this, {
		x: 135,
		y: 480,
		spriteName: 'table3'
	}));
	this.add.existing(new Table(this, {
		x: 465,
		y: 480,
		spriteName: 'table4'
	}));
}
