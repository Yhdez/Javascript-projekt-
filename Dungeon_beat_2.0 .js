const Game_canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
Game_canvas.width = window.innerWidth
Game_canvas.height = window.innerHeight
namn.innerHTML ="Dungeon Beat 2.0"
const ctx = Game_canvas.getContext("2d")
const Warrior_spelkaraktären_bild = document.getElementById("Warrior")
const Health_bild = document.getElementById("Health")
var Facing = "Downward"
var Current_room = "Main_Dungeon"

var Player_animation_active = false
var Monster_Current_frame = undefined
var Monster_Frame_to_end_with = undefined
var Monster_interval = undefined
var Monster_walking_interval = undefined
var Monster_animation_times_repeated = undefined
var Asssigned_x_position = undefined
var Assigned_y_position = undefined
var Time_when_activated = null

var Current_monster = undefined
var invinciblity_frame_mode = "inactive"

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
        }
        else if (Facing === "Upward"){
            this.sy = 700
        }
        else if (Facing === "Right"){
            this.sy = 1360
        }
        else if (Facing === "Left"){
            this.sy = 2160
        }
        if (invinciblity_frame_mode === "Active"){
            ctx.globalAlpha = 0.25
            ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            ctx.globalAlpha = 1
            
        }
        else{ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)}
    }
    this.Monster_update = function(){
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.update()
        ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
        Battle_assets.update()
        Update_and_Assign_Room()
    }
}

function Assets(type,width,height,x,y){
    this.type = type
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function (){
        ctx.drawImage(this.type,this.x,this.y,this.width,this.height)
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

function is_player_hit(){
    if(Current_monster.x + Game_canvas.width*0.01 < Spelkaraktär.x + Game_canvas.width*0.05 && Current_monster.x + Game_canvas.width*0.2 >  Spelkaraktär.x + Game_canvas.width*0.125){
        if (Current_monster.y + Game_canvas.height*0.02 < Spelkaraktär.y + Game_canvas.height*0.11 && Current_monster.y + Game_canvas.height*0.4 >  Spelkaraktär.y + Game_canvas.height*0.28){
            if (Date.now() - Time_when_activated >= 1700){
              console.log("Träffad")
              Spelkaraktär.health -= 1
              Check_health()
              Time_when_activated = Date.now()
              invinciblity_frame_mode = "Active"
              setTimeout(Turn_of_invincibilty_frame,1600)
              function Turn_of_invincibilty_frame(){
                invinciblity_frame_mode = "Inactive"
              }
            }
        }
    }
    return
}

function Monster_encounter(monster_type){
    clearInterval(Monster_interval)
  if (monster_type.type === document.getElementById("Devil")){ 
      requestAnimationFrame(Idle)
      setTimeout(Run_and_swing,(Math.random() * 4000) + 2000)
      setTimeout(Devil_Projectile,9000)
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
            requestAnimationFrame(Idle)
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
    Monster_interval = setInterval(Monster_animation,150)
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
        is_player_hit()
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
        is_player_hit()
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
        is_player_hit()
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
        is_player_hit()
        monster_type.Monster_update()
    }
  }

  function Devil_Projectile(){
    monster_type.sy = 1320
    monster_type.sx = 0
    Monster_Current_frame = -1
    Monster_Frame_to_end_with = 7
    Monster_animation_times_repeated = 1
    clearInterval(Monster_interval)
    Monster_interval = setInterval(Monster_animation,120)
    var Devil_Projectile_1 = new Assets(document.getElementById("Devil_projectile"),30,22,monster_type.x +115,monster_type.y+100)
    var Devil_Projectile_2 = new Assets(document.getElementById("Devil_projectile"),30,22,monster_type.x+300,monster_type.y)
    var Devil_Projectile_3 = new Assets(document.getElementById("Devil_projectile"),30,22,monster_type.x-15,monster_type.y)
    Battle_assets = Devil_Projectile_1
    Battle_assets = Devil_Projectile_1
    Battle_assets = Devil_Projectile_1
    Monster_projectile_interval = setInterval(devil_assign_projectile,100)

    function devil_assign_projectile(){
        Fire_projectile(Devil_Projectile_1,0,14,-10,0,0,10)
        Fire_projectile(Devil_Projectile_2,14,0,0,-10,10,0)
        Fire_projectile(Devil_Projectile_3,-14,0,0,-10,10,0)
        console.log("skjut")

        if (Devil_Projectile_1.y > Game_canvas.height && Devil_Projectile_2.x > Game_canvas.width && Devil_Projectile_3.x < 0){
            clearInterval(Monster_projectile_interval)
            console.log("slut")
        }
    }

    }

    function Fire_projectile(type, speed_x, speed_y, y_space, x_space, width_space, height_space){ //space variablen är för att se till att clearrect() tar bort hela bilden
        ctx.clearRect(type.x +x_space,type.y + y_space,type.width+width_space,type.height+height_space)
        type.x += speed_x
        type.y += speed_y
        type.update()
}

}

function Update_and_Assign_Room(){
    if (Current_room === "Main_Dungeon"){Main_dungeon.update();;return Main_dungeon}
}

function assign_monster(type){
   if (type === 1){
    var Devil = new Karaktär(document.getElementById("Devil"), 600, 600, 600, 400, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0,5)
    Current_monster = Devil
    console.log("satt Djävul")
    return Devil
   }
}

function Check_health(){
    if (Spelkaraktär.health === 5){ ctx.drawImage(Health_bild,sx = 0, sy = 0, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 4){ ctx.drawImage(Health_bild,sx = 0, sy = 880, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 3){ ctx.drawImage(Health_bild,sx = 0, sy = 1760, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 2){ ctx.drawImage(Health_bild,sx = 0, sy = 2640, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
    if (Spelkaraktär.health === 1){ ctx.drawImage(Health_bild,sx = 0, sy = 3520, swidth = Health_bild.width, sheight = Health_bild.height / 4.5, x = 950, y= -10, height = 350, width = 200)}
}

document.onkeydown = function(e){
    switch (e.key){
        case "w":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Upward"
            Spelkaraktär.update()
            Current_monster.Monster_update()
            is_player_hit()
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
            Current_monster.Monster_update()
            is_player_hit()
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
            Current_monster.Monster_update()
            is_player_hit()
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
            Current_monster.Monster_update()
            is_player_hit()
            if (Spelkaraktär.x >= Update_and_Assign_Room().Left_border ){
                Player_animation("Walking")
                Spelkaraktär.x -= 6
            }
    }
    switch (e.key) {
        case "z":
            Player_animation("Attack")
            is_player_hit()
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
        var Current_frame = 3
        var Frame_to_end_with = 8
        Spelkaraktär.sx = 1540
        var Time_To_animate = 89
    }
    function animate(){
        Current_frame++
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.sx = 770*Current_frame
        Spelkaraktär.update()
        Current_monster.Monster_update()
        Update_and_Assign_Room()
        if (Current_frame === Frame_to_end_with){
            clearInterval(Interval)
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.sx = 0
            Spelkaraktär.update()
            Current_monster.Monster_update()
            Player_animation_active = false
            Update_and_Assign_Room()
            return
        }
    }

    var Interval = setInterval(animate,Time_To_animate)
    Player_animation_active = true

}
    // Del som startar om sidan ifall den är inaktiv för länge, för att kompensera för liten användning av requestanimationframe()
    function Reload_game(){location.reload()}
    function reset_timer(){clearTimeout(Timeoutid);Timeoutid = setTimeout(Reload_game,30000)}
    var Timeoutid = setTimeout(Reload_game,25000)
    document.addEventListener("mousemove",reset_timer)
    document.addEventListener("scroll",reset_timer)
    document.addEventListener("keydown",reset_timer)

    var Battle_assets = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, 300, 200, Game_canvas.width*0.2, Game_canvas.height*0.35,0,0,5);
    Spelkaraktär.update()
    Check_health()
    var Main_dungeon = new Room("Bilder/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),140,430,-35,1090)
    Main_dungeon.update()
    requestAnimationFrame(Monster_encounter.bind(null,assign_monster(1)))