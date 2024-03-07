import {Vector2} from "./Vector2.js";

export class Sprite {
    constructor({
        resource,  // image we want to draw 
        frameSize,  // crop resource
        hFrames,    // height of the crop
        vFrames,    // width of the crop ... MY CABBAGES!
        frame,      // which frame to show
        scale,      // resize it for pixel movement?
        position,   // where to draw it 
    }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0,0);
    this.buildFrameMap();
    }


    buildFrameMap() {
        let frameCount = 0;
        for(let v=0; v<this.vFrames; v++) {
            for(let h=0; h<this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                )
                frameCount++;
            }
        }
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }

        // Find correct sprite frame to use
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX, 
            frameCoordY,
            frameSizeX,                 // How much crop from sprite sheet
            frameSizeY,
            x,                          // Where to place on this canvas
            y,
            frameSizeX * this.scale,    // How large to scale 
            frameSizeY * this.scale,
        );
    }

}

