import './style.css'
import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import {Vector2} from "./src/Vector2.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");


const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})  

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})  

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32),

})



const heroPos = new Vector2(16 * 5, 16 * 5);

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    // Center hero pos in cell
    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroPos.x+heroOffset.x;
    const heroPosY = heroPos.y+1+heroOffset.y;

    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}




//======================================= Here we are drawing things on the screen (frames!)
setInterval(() => {
    draw()
}, 300)

