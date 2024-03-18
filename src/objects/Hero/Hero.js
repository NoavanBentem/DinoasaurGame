import { Animations } from "../../Animations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { LEFT, RIGHT, UP, DOWN } from "../../Input";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { walls } from "../../levels/lvl1";
import { WALK_UP, WALK_DOWN, WALK_RIGHT, WALK_LEFT, STAND_UP, STAND_DOWN, STAND_RIGHT, STAND_LEFT } from "./heroAnimations";

export class Hero extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -19)
        })
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -20),
            animations: new Animations({
                walkUp: new FrameIndexPattern(WALK_UP),
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standUp: new FrameIndexPattern(STAND_UP),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
            })
        })
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
    }

    step(delta, root) {

        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;
        // Attempt to move again if hero is at its position
        if (hasArrived) {
            this.tryMove(root)
        }
    }

    tryMove = (root) => {
        const {input} = root;

        if (!input.direction) {
            if (this.facingDirection === LEFT) { this.body.animations.play("standLeft")};
            if (this.facingDirection === RIGHT) { this.body.animations.play("standRight")};
            if (this.facingDirection === UP) { this.body.animations.play("standUp")};
            if (this.facingDirection === DOWN) { this.body.animations.play("standDown")};
    
            return;
        }
    
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
    
        if (input.direction === LEFT) {
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        }
    
        if (input.direction === RIGHT) {
            nextX += gridSize;
            this.body.animations.play("walkRight");
        }
    
        if (input.direction === UP) {
            nextY -= gridSize;
            this.body.animations.play("walkUp");
        }
    
        if (input.direction === DOWN) {
            nextY += gridSize;
            this.body.animations.play("walkDown");
        }
        this.facingDirection = input.direction ?? this.facingDirection;
    
        // Validating that next grid cell is free
        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        }
    }
}