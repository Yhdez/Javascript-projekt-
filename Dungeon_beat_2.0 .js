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
var Monster_Current_frame = undefined
var Monster_Frame_to_end_with = undefined
var Monster_interval = undefined
var Monster_walking_interval = undefined
var Monster_animation_times_repeated = undefined
var Asssigned_x_position = undefined
var Assigned_y_position = undefined

function Karaktär(type,swidth,sheight,x,y,width,height,sx,sy,health) {
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.swidth = swidth;
    this.sheight = sheight;
    this.sx = sx
    this.sy = sy
    this.health = health
    this.update = function (){
        if (Facing === "Downward"){
          this.sy = 0;
          ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
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

function Monster_encounter(monster_type){
    clearInterval(Monster_interval)
  if (monster_type.type === document.getElementById("Devil")){ 
      Idle()
      setTimeout(Run_and_swing,(Math.random() * 4000) + 2000)
      setTimeout(Projectile,9000)
      if (monster_type.health > 0){
        setTimeout(Monster_encounter.bind(null,monster_type),17000)
      }
 }
  function Monster_animation(){
    Monster_Current_frame++
    ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
    monster_type.sx = 625 * Monster_Current_frame
    monster_type.Monster_update()
    if (Monster_Current_frame === Monster_Frame_to_end_with){
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        if (Monster_animation_times_repeated === 1){
            clearInterval(Monster_interval)
            Idle()
        }
        monster_type.sx = 0
        monster_type.Monster_update()
        Monster_Current_frame = 0
    }
  }

  function Idle(){
    Monster_animation_times_repeated = "Indefinitely"
    monster_type.sy = 0
    Monster_Current_frame = -1
    Monster_Frame_to_end_with = 3
    Monster_interval = setInterval(Monster_animation,150)
  }

  function Run_and_swing(){
    Assigned_y_position = (Math.random() * 200) + 180
    Asssigned_x_position = (Math.random() * 901) +30
    Go_to_random_position()
    monster_type.sy = 600
    Monster_Current_frame = -1
    Monster_Frame_to_end_with = 7
    Monster_animation_times_repeated = 1
    clearInterval(Monster_interval)
    Monster_interval = setInterval(Monster_animation,200)
  }

  function Go_to_random_position(){
    if (monster_type.y <= Assigned_y_position){
        if (monster_type.x <= Asssigned_x_position){Monster_walking_interval = setInterval(if_both_bigger_than_monster,100)}
        else{Monster_walking_interval = setInterval(if_x_smaller_than_monster ,200)}
    }
    else{
        if(monster_type <= Asssigned_x_position){Monster_walking_interval = setInterval(if_y_smaller_than_monster ,100)}
        else{Monster_walking_interval = setInterval(if_both_smaller_than_monster ,150)}
    }

    function if_y_smaller_than_monster(){
        if (monster_type.x >= Asssigned_x_position && monster_type.y <= Assigned_y_position){
            clearInterval(Monster_walking_interval)
            return
        }
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        if(monster_type.x < Asssigned_x_position){monster_type.x += 15}
        if (monster_type.y > Assigned_y_position){monster_type.y -= 15}
        monster_type.Monster_update()
    }
    function if_x_smaller_than_monster(){
        if (monster_type.x <= Asssigned_x_position && monster_type.y >= Assigned_y_position){
            clearInterval(Monster_walking_interval)
            return
        }
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        if(monster_type.x > Asssigned_x_position){monster_type.x -= 15}
        if (monster_type.y < Assigned_y_position){monster_type.y += 15}
        monster_type.Monster_update()
    }
    function if_both_smaller_than_monster(){
        if (monster_type.x <= Asssigned_x_position && monster_type.y <= Assigned_y_position){
            clearInterval(Monster_walking_interval)
            return
        }
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        if(monster_type.x > Asssigned_x_position){monster_type.x -= 15}
        if (monster_type.y > Assigned_y_position){monster_type.y -= 15}
        monster_type.Monster_update()
    }
    function if_both_bigger_than_monster(){
        if (monster_type.x >= Asssigned_x_position && monster_type.y >= Assigned_y_position){
           clearInterval(Monster_walking_interval)
           return
    }
        ctx.clearRect(monster_type.x,monster_type.y,monster_type.width,monster_type.height)
        if(monster_type.x < Asssigned_x_position){monster_type.x += 15}
        if (monster_type.y < Assigned_y_position){monster_type.y += 15}
        monster_type.Monster_update()
    }
  }

  function Projectile(shots){
    monster_type.sy = 1320
    monster_type.sx = 0
    Monster_Current_frame = -1
    Monster_Frame_to_end_with = 7
    Monster_animation_times_repeated = 1
    clearInterval(Monster_interval)
    Monster_interval = setInterval(Monster_animation,120)
  }
}

function Update_and_Assign_Room(){
    if (Room.type = "Main_Dungeon_walls"){Main_dungeon.update();return Main_dungeon}
}

function assign_monster(type){
   if (type === 1){
    var Devil = new Karaktär(document.getElementById("Devil"), 600, 600, 600, 400, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0,5)
    return Devil
   }
}

function Check_health(){
    if (Spelkaraktär.health === 5){ ctx.drawImage(Health_bild,sx = 0, sy = 0, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 4){ ctx.drawImage(Health_bild,sx = 0, sy = 880, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 3){ ctx.drawImage(Health_bild,sx = 0, sy = 1760, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
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
        var Frame_to_end_with = 6
        Spelkaraktär.sx = 1540
        var Time_To_animate = 89
    }
    function animate(){
        Current_frame++
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.sx += 770
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

var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, 300, 200, Game_canvas.width*0.2, Game_canvas.height*0.35,0,0,5);
    Spelkaraktär.update()
    health = 3
    Check_health()
    var Main_dungeon = new Room("Bilder/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),140,430,-35,1090)
    Main_dungeon.update()
    Monster_encounter(assign_monster(1))

    ctx.drawImage(Warrior_spelkaraktären_bild, 760, 760, 300, 200, Game_canvas.width*0.2, Game_canvas.height*0.35,1550,0,5)


