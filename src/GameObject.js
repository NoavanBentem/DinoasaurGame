import { Vector2 } from "./Vector2"

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];

    }

    stepEntry(delta, root) {
        // Call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        // Call any implemented Step code
        this.step(delta, root);
    }

    // Called once every frame 
    step(_delta) {

    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);

        // Pass to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(ctx, drawPosX, drawPosY) {
        //
    }
    
    // Other gameObjects are nestable in this one
    addChild(gameObject) {
        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        this.children = thischildren.filter(g => {
            return gameObject !== g;
        })
    }
}
