const HEIGHT_DIFFERENCE = {desktop: 100, mobile: 500};
const WIDTH_DIFFERENCE = {desktop: 300, mobile: 100};

class GameArea{
    backgroundColor = "#2f3236";
    heightDifference;
    widthDifference;

    constructor(borders){

        if (window.mobilecheck()){
            this.heightDifference = HEIGHT_DIFFERENCE.mobile;
            this.widthDifference = WIDTH_DIFFERENCE.mobile;
        }else{
            this.heightDifference = HEIGHT_DIFFERENCE.desktop;
            this.widthDifference = WIDTH_DIFFERENCE.desktop;
        }

        this.height = this.getWindowHeight();
        this.width = this.getWindowWidth();

        this.canvas = document.createElement("canvas");
        this.canvas.id = "gameArea";
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.style.backgroundColor = this.backgroundColor;

        if (window.mobilecheck()){
            this.canvas.style.top = 175;
            this.canvas.style.left = 0;
            this.canvas.style.bottom = window.innerHeight - this.height - 50;
        }

        this.canvas.style.border = "3px solid black"

        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);
    }

    //Generate canvas height and width based on grid
    getWindowHeight(){
        let dimension = window.innerHeight - this.heightDifference;
        do{
            dimension--;
        }while(dimension % 15 != 0)
        return dimension;
    }

    getWindowWidth(){
        let dimension = window.innerWidth - this.widthDifference;
        do{
            dimension--;
        }while(dimension % 15 != 0)
        return dimension;
    }

    clear(){
        this.ctx.clearRect(0,0,this.width,this.height);
    }

}