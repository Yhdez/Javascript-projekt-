const canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

namn.innerHTML ="Dungeon Beat 2.0"
const ctx = canvas.getContext("2d")
const spelkaraktären_bild = document.getElementById("Spelkaraktär")
let Facing = "upward"

function Karaktär(type,sy,sx,swidth,sheight,x,y,width,height) {
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.sy = sy;
    this.sx = sx;
    this.swidth = swidth;
    this.sheight = sheight;
    this.update = function (){
        if (Facing === "upward"){
          ctx.drawImage(this.type,this.sy,this.sx,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
          console.log("Updatterar")
        }
    }
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)   
            Spelkaraktär.y -= 10
            let Facing = "upward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "s":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.y += 10
            let Facing = "downward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "d":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.x += 10
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
    }
    switch (e.key){
        case "a":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.x -= 10
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
    }
}


var Spelkaraktär = new Karaktär(spelkaraktären_bild, 120, 100, 650, 650, 300, 200, 100, 100);
Spelkaraktär.update()