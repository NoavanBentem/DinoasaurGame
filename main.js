import './style.css'
import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import {Vector2} from "./src/Vector2.js";
import {GameLoop} from "./src/GameLoop.js";
import {Input} from "./src/Input.js";
import {gridCells} from './src/helpers/grid.js';
import { GameObject } from './src/GameObject.js';
import { Hero } from './src/objects/Hero/Hero.js';


// Canvas to draw in
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Be god
const mainScene = new GameObject({
    position: new Vector2(0, 0)
})

// Build up scene by adding in avant-art
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})  
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})  
mainScene.addChild(groundSprite);



const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

// Add input class to main scene
mainScene.input = new Input();

// Making update and draw loops
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene)
};



const draw = () => {

    mainScene.draw(ctx, 0, 0);
}

// Starting the machine 
const gameLoop = new GameLoop(update, draw);
gameLoop.start();