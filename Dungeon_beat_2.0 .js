const Game_canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
Game_canvas.width = window.innerWidth
Game_canvas.height = window.innerHeight
namn.innerHTML ="Dungeon Beat 2.0"
const ctx = Game_canvas.getContext("2d")
const Warrior_spelkaraktären_bild = document.getElementById("Warrior")
const Health_bild = document.getElementById("Health")
var Facing = "Downward"
var Player_animation_active = false

function Karaktär(type,swidth,sheight,x,y,width,height,sx,sy) {
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.swidth = swidth;
    this.sheight = sheight;
    this.sx = sx
    this.sy = sy
    this.update = function (){
        if (Facing === "Downward"){
          this.sy = 0;
          ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
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
    this.Monster_update = function(){
        ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
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

function Monster_encounter(type){
  if (type = 1){ //Devil
    var Monster_health = 5
    var Devil = new Karaktär(document.getElementById("Devil"), 600, 600, 800, 200, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0)
    Devil.Monster_update()
    console.log(document.getElementById("Devil").height)
    requestAnimationFrame(Monster_animation.bind(null,"idle",Devil))
  }
}

function Update_and_Assign_Room(){
    if (Room.type = "Main_Dungeon_walls"){Main_dungeon.update(); return Main_dungeon}
}

function Check_health(){
    if (health === 5){ ctx.drawImage(Health_bild,sx = 0, sy = 0, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 400, width = 200)}
    if (health === 4){ ctx.drawImage(Health_bild,sx = 0, sy = 850, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Upward"
            Spelkaraktär.update()
            if (Spelkaraktär.y >= Update_and_Assign_Room().Top_border){
                Player_animation("Walking")
                Spelkaraktär.y -= 6
            }
    }
    switch (e.key){
        case "s":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Downward"
            Spelkaraktär.update()
            if (Spelkaraktär.y <= Update_and_Assign_Room().Bottom_border ){
                Player_animation("Walking")
                Spelkaraktär.y += 6
            }
    }
    switch (e.key){
        case "d":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Right"
            Spelkaraktär.update()
            if (Spelkaraktär.x <= Update_and_Assign_Room().right_border ){
                Player_animation("Walking")
                Spelkaraktär.x += 6
            }
    }
    switch (e.key){
        case "a":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Left"
            Spelkaraktär.update()
            if (Spelkaraktär.x >= Update_and_Assign_Room().Left_border ){
                Player_animation("Walking")
                Spelkaraktär.x -= 6
            }
    }
    switch (e.key) {
        case "z":
            Player_animation("Attack")
    }
}

function Player_animation(Character_action){
    if (Player_animation_active) return;
    if (Character_action === "Walking"){
        var Current_frame = 0
        var Frame_to_end_with = 3
        var Time_To_animate = 200
    }
    if (Character_action === "Attack"){
        var Current_frame = 0
        var Frame_to_end_with = 5
        Spelkaraktär.sx = 2295
        var Time_To_animate = 89
    }
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
            Player_animation_active = false
            Update_and_Assign_Room()
            return
        }
    }
    Player_animation_active = true
    var Interval = setInterval(animate,Time_To_animate)

}

function Monster_animation(monster_action,monster_type){
    if (monster_action === "idle"){
        var Current_frame = 0
        var Frame_to_end_with = 3
        var Time_To_animate = 200
    }
    if (monster_action === "Attack"){
        var Current_frame = 0
        var Frame_to_end_with = 5
        monster_type.sx = 2295
        var Time_To_animate = 89
    }
    function animate(){
        Current_frame++
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        monster_type.sx += 773
        Spelkaraktär.update()
        console.log("körd")
        if (Current_frame === Frame_to_end_with){
            clearInterval(Interval)
            ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
            monster_type.sx = 0
            monster_type.update()
            return
        }
    }
    var Interval = setInterval(animate,Time_To_animate)
}

var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, 300, 200, Game_canvas.width*0.2, Game_canvas.height*0.35,0,0);
    Spelkaraktär.update()
    health = 4
    Check_health()
    var Main_dungeon = new Room("Bilder/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),140,430,0,1090)
    Main_dungeon.update()
    Monster_encounter(1)



