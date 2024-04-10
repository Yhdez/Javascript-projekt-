const canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

namn.innerHTML ="Dungeon Beat 2.0"
const ctx = canvas.getContext("2d")
const spelkaraktären_bild = document.getElementById("Spelkaraktär")
var Facing = "Downward"
var Character_action = "Idle"

function Karaktär(type,swidth,sheight,x,y,width,height,sx) {
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.swidth = swidth;
    this.sheight = sheight;
    this.sx = sx
    this.update = function (){
        if (Facing === "Downward"){
          this.sy = 0;
          ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Upward"){
            this.sy = 875
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Right"){
            this.sy = 1680
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Left"){
            this.sy = 2650
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
    }
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)   
            Facing = "Upward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
            if (Spelkaraktär.y >= -10){
                Spelkaraktär.y -= 10
            }
    }
    switch (e.key){
        case "s":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Downward"
            console.log(Spelkaraktär.y)
            Spelkaraktär.update()
            if (Spelkaraktär.y <= canvas.height - Spelkaraktär.height+55){
                Spelkaraktär.y += 10
                Character_action = "Walking"
                requestAnimationFrame(Player_animation)
            }
    }
    switch (e.key){
        case "d":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Right"
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
            if (Spelkaraktär.x <= canvas.width - Spelkaraktär.width + 55 ){
                Spelkaraktär.x += 10
            }
    }
    switch (e.key){
        case "a":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Left"
            console.log(Spelkaraktär.x)
            Spelkaraktär.update()
            if (Spelkaraktär.x >= -40){
                Spelkaraktär.x -= 10
            }
    }
}

function Player_animation(timestamp){
    if (Character_action = "Walking"){
        let latest_Timestamp = 0
        if (timestamp - latest_Timestamp < 1000){
            requestAnimationFrame(Player_animation)
            return
        }
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.sx += 900
        Spelkaraktär.update()
        latest_Timestamp = timestamp
        requestAnimationFrame(Player_animation)
    }
}

var Spelkaraktär = new Karaktär(spelkaraktären_bild, 780, 780, 300, 200, 150, 150,0);
Spelkaraktär.update()
console.log(canvas.width)