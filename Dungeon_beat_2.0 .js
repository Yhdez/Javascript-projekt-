const canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

namn.innerHTML ="Dungeon Beat 2.0"
const ctx = canvas.getContext("2d")
const spelkaraktären_bild = document.getElementById("Spelkaraktär")
var Facing = "Downward"


function Karaktär(type,swidth,sheight,x,y,width,height) {
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.swidth = swidth;
    this.sheight = sheight;
    this.update = function (){
        if (Facing === "Downward"){
          this.sy = 0;
          this.sx = 0;
          ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Upward"){
            this.sy = 800
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Right"){
            this.sy = 1645
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Left"){
            this.sy = 2615
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
    }
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)   
            Spelkaraktär.y -= 10
            Facing = "Upward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "s":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.y += 10
            Facing = "Downward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "d":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.x += 10
            Facing = "Right"
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "a":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.x -= 10
            Facing = "Left"
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
    }
}

var Spelkaraktär = new Karaktär(spelkaraktären_bild, 780, 780, 300, 200, 150, 150);
Spelkaraktär.update()