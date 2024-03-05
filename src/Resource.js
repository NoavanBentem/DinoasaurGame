class Resources {
    constructor() {
        // Download
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png"
        };

        // Keeping all the images warm
        this.images = {};
        
        // Put images in oven
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
            image: img,
            isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

// Make one instance for app to use
export const resources = new Resources();