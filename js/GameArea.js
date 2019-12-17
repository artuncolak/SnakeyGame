class GameArea{
    backgroundColor = "#2f3236";

    constructor(borders){
        this.height = this.getWindowHeight();
        this.width = this.getWindowWidth();

        this.canvas = document.createElement("canvas");
        this.canvas.id = "gameArea";
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.style.backgroundColor = this.backgroundColor;

        this.canvas.style.border = "3px solid black"

        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);
    }

    //Generate canvas height and width based on grid
    getWindowHeight(){
        let dimension = window.innerHeight - 100;
        do{
            dimension--;
        }while(dimension % 15 != 0)
        return dimension;
    }

    getWindowWidth(){
        let dimension = window.innerWidth - 300;
        do{
            dimension--;
        }while(dimension % 15 != 0)
        return dimension;
    }

    clear(){
        this.ctx.clearRect(0,0,this.width,this.height);
    }

}