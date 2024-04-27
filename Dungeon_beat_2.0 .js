const Game_canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
Game_canvas.width = window.innerWidth
Game_canvas.height = window.innerHeight

const ctx = Game_canvas.getContext("2d")
const Warrior_spelkaraktären_bild = document.getElementById("Warrior")
const Health_bild = document.getElementById("Health")
var Facing = "Downward"
//var Current_room = "Main_Dungeon"

var Player_animation_active = false
var player_attack_active = false

var Monster_Current_frame = undefined
var Monster_Frame_to_end_with = undefined
var Monster_interval = undefined
var Monster_walking_interval = undefined
var Monster_animation_times_repeated = undefined
var Asssigned_x_position = undefined
var Assigned_y_position = undefined
var Time_when_invincibility_frame_activated = null
var Time_when_enemy_invincibility_frame_activated = null

var Current_monster = undefined
var invinciblity_frame_mode = "inactive"
var enemy_invinicbility_frame_mode = "inactive"

var Player_is_touching_door = false

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
          Player_attack.sy = 340
          Player_attack.x = Spelkaraktär.x - Game_canvas.width*0.02
          Player_attack.y = Spelkaraktär.y + Game_canvas.height*0.11

        }
        else if (Facing === "Upward"){
            this.sy = 700
            Player_attack.sy = -20          
            Player_attack.x = Spelkaraktär.x - Game_canvas.width*0.02
            Player_attack.y = Spelkaraktär.y - Game_canvas.height*0.08
        }
        else if (Facing === "Right"){
            this.sy = 1360
            Player_attack.sy = 680
            Player_attack.x = Spelkaraktär.x + Game_canvas.width*0.07
            Player_attack.y = Spelkaraktär.y - Game_canvas.height*0.06
        }
        else if (Facing === "Left"){
            this.sy = 2160
            Player_attack.sy = 1100
            Player_attack.x = Spelkaraktär.x - Game_canvas.width*0.085
            Player_attack.y = Spelkaraktär.y - Game_canvas.height*0.06
        }
        if (invinciblity_frame_mode === "Active"){
            ctx.globalAlpha = 0.22
            ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            ctx.globalAlpha = 1
            
        }
        else{ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)}
    }
    this.Monster_update = function(){
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.update()
        if (enemy_invinicbility_frame_mode === "Active"){
            ctx.globalAlpha = 0.1
            ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
            ctx.globalAlpha = 1
        }
        else{ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)}
        if(player_attack_active === true){Player_attack.update_with_s()}
        Monster_projectile_asset.update()
        Monster_projectile_asset_2.update()
        Monster_projectile_asset_3.update()
    }
}

function Assets(type,x,y,width,height,swidth,sheight,sx,sy){
    this.type = type
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.swidth = swidth
    this.sheight = sheight
    this.sx = sx
    this.sy = sy
    this.update = function (){;
    ctx.drawImage(this.type,this.x,this.y,this.width,this.height)
    Current_room.update()
    }
    this.update_with_s = function(){
    ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
    Current_room.update()
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
        ctx.drawImage(wall_type,0,0,Game_canvas.width,Game_canvas.height)
   }
   this.update_entire_room = function(){
    Game_canvas.style.backgroundImage = "url(" + type + ")";
    ctx.drawImage(wall_type,0,0,Game_canvas.width,Game_canvas.height)
   }
}

function is_player_hit(object){
    //Ifall träffad av monster
    if (object === Current_monster){
      if(Current_monster.x + Game_canvas.width*0.01 < Spelkaraktär.x + Game_canvas.width*0.05 && Current_monster.x + Game_canvas.width*0.2 >  Spelkaraktär.x + Game_canvas.width*0.125){
        if (Current_monster.y + Game_canvas.height*0.02 < Spelkaraktär.y + Game_canvas.height*0.11 && Current_monster.y + Game_canvas.height*0.4 >  Spelkaraktär.y + Game_canvas.height*0.28){
            hit()
    }
    }
    }
    else{ //för projektiler
      if(object.x - Game_canvas.width*0.1 < Spelkaraktär.x + Game_canvas.width*0. && object.x - Game_canvas.width*0.03>  Spelkaraktär.x + Game_canvas.width*0.0){
        if (object.y - Game_canvas.height*0.08 < Spelkaraktär.y + Game_canvas.height*0.1 && object.y + Game_canvas.height*0.32 >  Spelkaraktär.y + Game_canvas.height*0.3){
            hit()
    }
    }
    }
    function hit(){
        if (Date.now() - Time_when_invincibility_frame_activated >= 1700){
            Spelkaraktär.health -= 1
            Check_health()
            Time_when_invincibility_frame_activated = Date.now()
            invinciblity_frame_mode = "Active"
            setTimeout(Turn_of_invincibilty_frame,1600)
            function Turn_of_invincibilty_frame(){
              invinciblity_frame_mode = "Inactive"
            }
          }

    }
    return
}

function is_enemy_hit(){
    if(Player_attack.x + Game_canvas.width*0.04 < Current_monster.x + Game_canvas.width*0.125 && Player_attack.x + Game_canvas.width*0.08 > Current_monster.x + Game_canvas.width*0.){
        if (Player_attack.y + Game_canvas.height*0.03 < Current_monster.y + Game_canvas.height*0.16 && Player_attack.y + Game_canvas.height*0.15 >   Current_monster.y + Game_canvas.height*0.07){
            if (Date.now() - Time_when_enemy_invincibility_frame_activated >= 500){
                ("monster verkligen träffat")
                Current_monster.health -= 1
                Time_when_invincibility_frame_activated = Date.now()
                enemy_invinicbility_frame_mode = "Active"
                setTimeout(Turn_of_invincibilty_frame,400)
                function Turn_of_invincibilty_frame(){
                  enemy_invinicbility_frame_mode = "Inactive"
                }
              }             
    }
}
}

function is_player_at_door(){
    if (Spelkaraktär.x + Game_canvas.width*0.06 < Game_canvas.width*0.48 && Spelkaraktär.x + Game_canvas.width*0.2 > Game_canvas.width*0.55){
        if (Spelkaraktär.y + Game_canvas.height*0.06 < Game_canvas.height*0.34 && Spelkaraktär.y + Game_canvas.height*0.2 > Game_canvas.height*0.24){
            Player_is_touching_door = true
        }
        else{Player_is_touching_door = false}
    }
    else{Player_is_touching_door = false}
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
        case "ArrowUp":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Upward"
            if (Spelkaraktär.y >= Current_room.Top_border){
                Player_animation("Walking")
                Spelkaraktär.y -= Game_canvas.height*0.01
            }
    }
    switch (e.key){
        case "s":
        case "ArrowDown":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Downward"
            if (Spelkaraktär.y <= Current_room.Bottom_border ){
                Player_animation("Walking")
                Spelkaraktär.y += Game_canvas.height*0.01
            }
    }
    switch (e.key){
        case "d":
        case "ArrowRight":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Right"
            if (Spelkaraktär.x <= Current_room.right_border ){
                Player_animation("Walking")
                Spelkaraktär.x += Game_canvas.width*0.0045
            }
    }
    switch (e.key){
        case "a":
        case "ArrowLeft":
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Facing = "Left"

            if (Spelkaraktär.x >= Current_room.Left_border ){
                Player_animation("Walking")
                Spelkaraktär.x -= Game_canvas.width*0.0045
            }
    }
    switch (e.key) {
        case "z":
            player_attack_active = true
            Player_animation("Attack")
    }
    switch (e.key){ //Spelaren försöker att öppna en dörr
        case "e":
            if(Player_is_touching_door === true){
                ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
                Spelkaraktär.y = Game_canvas.height*0.8
                Spelkaraktär.update()
                Current_room = new Room("Bilder/library_background.png",document.getElementById("Library_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86)
                Current_room.update_entire_room()
            }
    }
    ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
    Spelkaraktär.update()
    Current_monster.Monster_update()
    if (player_attack_active === true){Player_attack.update_with_s()}
    is_player_at_door() //438 x  134 y
    is_player_hit(Current_monster)
    is_player_hit(Monster_projectile_asset)
    is_player_hit(Monster_projectile_asset_2)
    is_player_hit(Monster_projectile_asset_3)
    Current_room.update()
}

function Player_animation(Character_action){
    if (Player_animation_active) return;
    if (Character_action === "Walking"){
        var Current_frame = 0
        var Frame_to_end_with = 3
        var Interval = setInterval(animate,200)
    }
    if (Character_action === "Attack"){
        var Current_frame = 3
        var Frame_to_end_with = 8
        Spelkaraktär.sx = 1540
        var slash_current_frame = -1
        var slash_frame_to_end_with = 5
        var Interval = setInterval(animate,89)
        var Slash_interval = setInterval(slash_animation,80)
        Player_attack.sx = 50

    }
    function animate(){
        Current_frame++
        ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
        Spelkaraktär.sx = 770*Current_frame
        Spelkaraktär.update()
        Current_monster.Monster_update()
        if (player_attack_active === true){Player_attack.update_with_s()}
        Monster_projectile_asset.update()
        Monster_projectile_asset_2.update()
        Monster_projectile_asset_3.update()
        Current_room.update()
        if (Current_frame === Frame_to_end_with){
            clearInterval(Interval)
            ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
            Spelkaraktär.sx = 0
            Spelkaraktär.update()
            Current_monster.Monster_update()
            if (player_attack_active === true){Player_attack.update_with_s()}
            Monster_projectile_asset.update()
            Monster_projectile_asset_2.update()
            Monster_projectile_asset_3.update()
            Player_animation_active = false
            Current_room.update()
            return
        }
    }
    function slash_animation(){ //Attack för warrior classen
        slash_current_frame++
        ctx.clearRect(Player_attack.x,Player_attack.y,Player_attack.width,Player_attack.height)
        Player_attack.sx += 350
        Spelkaraktär.update()
        Current_monster.Monster_update()
        Player_attack.update_with_s()
        if (slash_current_frame === slash_frame_to_end_with){
        clearInterval(Slash_interval)
        player_attack_active = false
        is_enemy_hit()
        return
        }

    }
    Player_animation_active = true

}
    // Del som startar om sidan ifall den är inaktiv för länge, för att kompensera för liten användning av requestanimationframe()
    function Reload_game(){location.reload()}
    function reset_timer(){clearTimeout(Timeoutid);Timeoutid = setTimeout(Reload_game,30000)}
    var Timeoutid = setTimeout(Reload_game,25000)
    document.addEventListener("mousemove",reset_timer)
    document.addEventListener("scroll",reset_timer)
    document.addEventListener("keydown",reset_timer)

     
    var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, Game_canvas.width*0.4, Game_canvas.height*0.4, Game_canvas.width*0.2, Game_canvas.height*0.35,0,0,5);
    var Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Monster_projectile_asset_2 = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Monster_projectile_asset_3 = new Assets(document.getElementById("Empty_image",0,0,0,0))
    
    var Player_attack = new Assets(document.getElementById("Slash"), 700, 100, Game_canvas.width*0.3/1.7, Game_canvas.height*0.3,350,480,50,-15)
    var Current_room = new Room("Bilder/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86) //Game_canvas.height = 559 och .width = 1280
    // Room("Bilder/library_background.png",document.getElementById("Library_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86)
    Current_room.update_entire_room()
    Check_health()
    Spelkaraktär.update()
    assign_monster(1)
    requestAnimationFrame(Monster_encounter)