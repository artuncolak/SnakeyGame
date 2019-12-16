const START_LENGTH = 3;
const HEIGHT = 15;
const WIDTH = 15;
const STEP = 15;

class Part {
    position = {
        x: 0,
        y: 0
    }
    height = HEIGHT;
    width = WIDTH;
    heading = "right";

    constructor(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
}

class Snake {
    parts = [];
    position = {
        x: STEP * (START_LENGTH - 1) + 15,
        y: 15
    }
    length = START_LENGTH;
    color = "#45c467";
    headPosition;
    heading;

    constructor() {
        let x = this.position.x;
        let y = this.position.y;
        for (let i = 0; i < this.length; i++) {
            this.parts.push(new Part(x, y));
            x -= STEP;
        }
    }

    draw() {
        for (let i = 0; i < this.parts.length; i++) {
            gameArea.ctx.fillStyle = this.color;
            gameArea.ctx.fillRect(this.parts[i].position.x, this.parts[i].position.y, this.parts[i].width, this.parts[i].height);
        }
    }

    eat(){
        food = null;
        this.length++;
        this.parts.push(new Part());
    }

    

    move() {
        let headPosition = { x: this.parts[0].position.x, y: this.parts[0].position.y };
        let nextPosition = { x: 0, y: 0 };

        //Pass through walls if walls disabled
        if (!wall){
            if (headPosition.x >= gameArea.width - STEP && this.heading == "right") {
                nextPosition = { x: -STEP, y: this.parts[0].position.y }

            } else if (headPosition.x <= 0 && this.heading == "left"){
                nextPosition = { x: gameArea.width, y: this.parts[0].position.y }

            } else if (headPosition.y <= 0 && this.heading == "up"){
                nextPosition = { x: this.parts[0].position.x, y: gameArea.height }

            }else if (headPosition.y >= gameArea.height - STEP && this.heading == "down"){
                nextPosition = { x: this.parts[0].position.x, y: -STEP }

            }
            else {
                nextPosition = headPosition;
            }
        }else{
            nextPosition = headPosition;
        }

        //Removes the last part of the snake and add it to the front
        switch (this.heading) {
            case "up":
                this.parts.pop();
                this.parts.unshift(new Part(nextPosition.x, nextPosition.y - STEP));
                break;
            case "down":
                this.parts.pop();
                this.parts.unshift(new Part(nextPosition.x, nextPosition.y + STEP));
                break;
            case "right":
                this.parts.pop();
                this.parts.unshift(new Part(nextPosition.x + STEP, nextPosition.y));
                break;
            case "left":
                this.parts.pop();
                this.parts.unshift(new Part(nextPosition.x - STEP, nextPosition.y));
                break;
        }

        this.headPosition = this.parts[0].position;
    }
}