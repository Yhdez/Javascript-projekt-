const Game_canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
Game_canvas.width = window.innerWidth
Game_canvas.height = window.innerHeight
namn.innerHTML ="Dungeon Beat 2.0"
const ctx = Game_canvas.getContext("2d")
const Warrior_spelkaraktären_bild = document.getElementById("Spelkaraktär")
var Current_room = "Main_Dungeon"
var Facing = "Downward"
var animation_active = false

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
          ctx.drawImage(type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Upward"){
            this.sy = 700
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Right"){
            this.sy = 1360
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
        if (Facing === "Left"){
            this.sy = 2160
            ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        }
    }
}

function Room(type,wall_type,Top_border,Bottom_border,Left_border,right_border){
   this.type = type
   this.wall_type = wall_type
   this.Top_border = Top_border
   this.Bottom_border = Bottom_border
   this.Left_border = Left_border
   this.right_border = right_border
   this.update = function (){
        Game_canvas.style.backgroundImage = "url(" + type + ")";
        ctx.drawImage(wall_type,0,0,Game_canvas.width,Game_canvas.height)
   }
}

function Update_and_Assign_Room(){
    if (Current_room = "Main Dungeon"){Main_dungeon.update(); return Main_dungeon}
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Upward"
            Spelkaraktär.update()
            Player_animation("Walking")
            if (Spelkaraktär.y >= Update_and_Assign_Room().Top_border){
                Spelkaraktär.y -= 6
            }
    }
    switch (e.key){
        case "s":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Downward"
            Spelkaraktär.update()
            Player_animation("Walking")
            if (Spelkaraktär.y <= Update_and_Assign_Room().Bottom_border ){
                Spelkaraktär.y += 6
            }
    }
    switch (e.key){
        case "d":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Right"
            Spelkaraktär.update()
            Player_animation("Walking")
            if (Spelkaraktär.x <= Update_and_Assign_Room().right_border ){
                Spelkaraktär.x += 6
            }
    }
    switch (e.key){
        case "a":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Left"
            Spelkaraktär.update()
            Player_animation("Walking")
            if (Spelkaraktär.x >= Update_and_Assign_Room().Left_border ){
                Spelkaraktär.x -= 6
            }
    }
    switch (e.key) {
        case "z":
            Player_animation("Attack")
    }
}

function Player_animation(Character_action){
    if (animation_active) return;

    if (Character_action === "Walking"){
        var Current_frame = 0
        var Frame_to_end_with = 3
        var Time_To_animate = 250
    }
    if (Character_action === "Attack"){
        var Current_frame = 0
        var Frame_to_end_with = 5
        Spelkaraktär.sx = 2295
        var Time_To_animate = 89
    }

    animation_active = true
    var Interval = setInterval(animate,Time_To_animate)
    function animate(){
            Current_frame++
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.sx += 773
            Spelkaraktär.update()
            Update_and_Assign_Room()
            if (Current_frame === Frame_to_end_with){
                clearInterval(Interval)
                ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
                Spelkaraktär.sx = 0
                Spelkaraktär.update()
                animation_active = false
                Update_and_Assign_Room()
                return
            }
     }
}


var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, 300, 200, 220, 190,0);
    Spelkaraktär.update()
    var Main_dungeon = new Room("Bilder/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),140,430,0,1090)
    Main_dungeon.update()


