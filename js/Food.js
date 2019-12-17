class Food {
    position = { x: 0, y: 0 }

    height = 15;
    width = 15;

    color = "#ed3737";

    constructor() {
        this.position = this.getRandomLocation();
    }

    //Generating random location based on grid
    getRandomLocation(){
        let position = {x: 0, y: 0};

        do{
            position.x = Math.round(Math.random() * (gameArea.width - 14));
        }while(position.x % 15 != 0)

        do{
            position.y = Math.round(Math.random() * (gameArea.height - 14));
        }while(position.y % 15 != 0)
        
        return position;
    }

    draw() {
        gameArea.ctx.fillStyle = this.color;
        gameArea.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}