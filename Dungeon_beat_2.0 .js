const Game_canvas = document.getElementById("Game_canvas")
let namn = document.getElementById("Spelnamn")
Game_canvas.width = window.innerWidth
Game_canvas.height = window.innerHeight

const ctx = Game_canvas.getContext("2d")
const Warrior_spelkaraktären_bild = document.getElementById("Warrior")
var Facing = "Downward"
var Health_bild = document.getElementById("Health")
var Rooms_explored_counter = 0
var Monster_defeated_counter = 0

var Player_animation_active = false
var player_attack_active = false
var Mimic_is_attacking = false
var Time_when_invincibility_frame_activated = null
var Time_when_enemy_invincibility_frame_activated = null
var Time_when_player_attacked = null
var Times_moved_counter = 0
var Times_attacked_counter = 0

var chest_status = "Unopened"
var invinciblity_frame_mode = "inactive"
var enemy_invinicbility_frame_mode = "inactive"
var God_mode = "inactive"

var Player_is_touching_door = false
var player_is_touching_chest = false
var End_scene_active = false

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
            if (enemy_invinicbility_frame_mode === "Active"  && Monster_death_active === false){  //ifall monstret inte är döende och har blivit träffad av spelaren blir monstret transparens under en kort period
                ctx.globalAlpha = 0.1
                ctx.drawImage(this.type,this.sx ,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
                ctx.globalAlpha = 1
            }
            else{ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)}
            if(player_attack_active === true){Player_attack.update_with_s()}
                
            Monster_projectile_asset.update()
            Monster_projectile_asset_2.update()
            Monster_projectile_asset_3.update()
            Check_health()
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
      Check_health()
    }
    this.update_with_s = function(){
      ctx.drawImage(this.type,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
      //if (type !== Health_bild){Current_room.update();Check_health()}
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

function is_player_hit(object){ // Ser ifall spelarens sprite rör på det nuvarande monstret. Ifall monstret är en vanlig kista, alltså (Mimic_is_attacking === false) kommer inte hit() starta
    if (object === Current_monster){
      if(Current_monster.x + Game_canvas.width*0.01 < Spelkaraktär.x + Game_canvas.width*0.05 && Current_monster.x + Game_canvas.width*0.2 >  Spelkaraktär.x + Game_canvas.width*0.125){
        if (Current_monster.y + Game_canvas.height*0.02 < Spelkaraktär.y + Game_canvas.height*0.11 && Current_monster.y + Game_canvas.height*0.4 >  Spelkaraktär.y + Game_canvas.height*0.28){
            if ((Current_monster.type === document.getElementById("Chest") && Mimic_is_attacking === true) || (Current_monster.type !== document.getElementById("Chest"))){hit()} // Alla monster förutom kistan som inte har blivit en mimic skadar spelaren
    }
    }
    }
    else{ //Fungerar som den ovan, fast den ser ifall en projektil har träffat spelaren
      if(object.x - Game_canvas.width*0.1 < Spelkaraktär.x + Game_canvas.width*0. && object.x - Game_canvas.width*0.03>  Spelkaraktär.x + Game_canvas.width*0.0){
        if (object.y - Game_canvas.height*0.08 < Spelkaraktär.y + Game_canvas.height*0.1 && object.y + Game_canvas.height*0.32 >  Spelkaraktär.y + Game_canvas.height*0.3){
            hit()
    }
    }
    }
    function hit(){ // Spelarens liv sänks med -1 health, om det var 1.7 sekunder sedan spelaren blev skadad. Under denna tid blir spelaren transparent (Vilket bestäms i Karaktär.update())
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

function is_enemy_hit(){ // Ser ifall slash sprite'n rör vid det nuvarande monstret
    if(Player_attack.x + Game_canvas.width*0.04 < Current_monster.x + Game_canvas.width*0.125 && Player_attack.x + Game_canvas.width*0.08 > Current_monster.x + Game_canvas.width*0.){
        if (Player_attack.y + Game_canvas.height*0.03 < Current_monster.y + Game_canvas.height*0.16 && Player_attack.y + Game_canvas.height*0.18 >   Current_monster.y + Game_canvas.height*0.07){
            if (Date.now() - Time_when_enemy_invincibility_frame_activated >= 500){ //Ifall det var 0.5 sekunder eller mer, som attacken skadade monstret, skadas monstret med -1 health
                Current_monster.health -= 1
                Time_when_invincibility_frame_activated = Date.now()
                enemy_invinicbility_frame_mode = "Active"
                setTimeout(Turn_of_invincibilty_frame,400)
                ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
                Current_monster.Monster_update()
                function Turn_of_invincibilty_frame(){
                  enemy_invinicbility_frame_mode = "Inactive"
                }
              }             
    }
}
}

function is_player_at_door(){ //Ser ifall Spelarens sprite rör vid en särskild illustration vid spelets bakgrund, nämligen en dörr.
    if (Spelkaraktär.x + Game_canvas.width*0.06 < Game_canvas.width*0.48 && Spelkaraktär.x + Game_canvas.width*0.2 > Game_canvas.width*0.55){
        if (Spelkaraktär.y + Game_canvas.height*0.06 < Game_canvas.height*0.34 && Spelkaraktär.y + Game_canvas.height*0.2 > Game_canvas.height*0.24){
            Player_is_touching_door = true
            if (Current_monster.type === document.getElementById("Empty_image") || (Current_monster.type === document.getElementById("Chest") && Mimic_is_attacking === false)){tutorial("Open_door")} //Eftersom dörren endast kan öppnas om monstret i rummet är besegrat eller ifall det är en vanlig kista i rummet
            else{tutorial("Locked_door")}
        }
        else{Player_is_touching_door = false;}
    }
    else{Player_is_touching_door = false;}
}

function is_player_at_chest(){ //Fungerar likt is_player_hit() men ser ifall spelaren rör vid en kista (Vilket är en icke farlig current_monster). Den ritar upp i text_canvas att spelaren rör i kistan
  if( Current_monster.type === document.getElementById("Chest"))
    if(Current_monster.x + Game_canvas.width*0.01 < Spelkaraktär.x + Game_canvas.width*0.05 && Current_monster.x + Game_canvas.width*0.2 >  Spelkaraktär.x + Game_canvas.width*0.125){
        if (Current_monster.y + Game_canvas.height*0.04 < Spelkaraktär.y + Game_canvas.height*0.1 && Current_monster.y + Game_canvas.height*0.45 >  Spelkaraktär.y + Game_canvas.height*0.28){
            if (Mimic_is_attacking === false && chest_status === "Unopened"){
                player_is_touching_chest = true
                tutorial("Open_chest")
            }
            else if (Mimic_is_attacking === false && chest_status === "Opened"){
                player_is_touching_chest = true
                tutorial("What_is_in_chest")
            }
        }
        else{player_is_touching_chest = false}
    }
    else{player_is_touching_chest = false}
}

function Check_health(){ //Uppdaterar bilden av objektet som visar spelarens liv
        if (Spelkaraktär.health >= 5){Health_bar.sy = -50}
        if (Spelkaraktär.health === 4){Health_bar.sy = 837}
        if (Spelkaraktär.health === 3){Health_bar.sy = 1717}
        if (Spelkaraktär.health === 2){Health_bar.sy = 2597}
        if (Spelkaraktär.health === 1){Health_bar.sy = 3477}
        if (Spelkaraktär.health === 0){Player_death()}
       Health_bar.sx = 0
       Health_bar.update_with_s()
}

function Player_death(){ //Aktiveras när spelarens liv är 0 ifrån check_health(), den blir av med alla objekt och gör dem till toma bilder och byter ut bakgrunden emot en svart backgrund. Den kallar text_canvas funktionen som skapar en game_over scen
    clearInterval(Monster_walking_interval)
    Current_monster = new Karaktär(document.getElementById("Empty_image"),0,0,-500,-200,0,0,0,0,0)  //För att monstret inte ska radera delar av game over scenen
    Spelkaraktär = new Karaktär(document.getElementById("Empty_image"),0,0,0,0,0,0,0,0,0) //För att inte spelarens sprite ska radera delar av game over scenen
    Current_room = new Room(document.getElementById("Empty_image"),0,0,0,0,0)
    Health_bar = new Assets(document.getElementById("Empty_image"),0,0,0,0,0)
    ctx.clearRect(0,0,Game_canvas.width,Game_canvas.height)
    Game_canvas.style.backgroundImage = "";
    Game_canvas.style.backgroundColor = "black";
    tutorial("Game_over")
}

function End_scene(){ //Gör i princip samma sak som player_death(), fast anger end_scene_active till true som ser till att spelaren kan starta om spelet
    End_scene_active = true
    Current_monster = new Karaktär(document.getElementById("Empty_image"),0,0,0,0,0,0,0,0,0)  //För att monstret inte ska radera delar av slut skärm scenen
    Spelkaraktär = new Karaktär(document.getElementById("Empty_image"),0,0,0,0,0,0,0,0,5) //För att inte spelarens sprite ska radera delar av slut skärm scenen
    Current_room = new Room(document.getElementById("Empty_image"),0,0,0,0,0)
    Health_bar = new Assets(document.getElementById("Empty_image"),0,0,0,0,0)
    ctx.clearRect(0,0,Game_canvas.width,Game_canvas.height)
    Game_canvas.style.backgroundImage = "";
    Game_canvas.style.backgroundColor = "black";
    tutorial("End_scene")
}

// Spelare Input 

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
            if (Date.now() - Time_when_player_attacked >= 700){
              Time_when_player_attacked = Date.now()
              player_attack_active = true
              Player_animation("Attack")
            }
    }
    switch (e.key){ //Spelaren försöker att öppna, tillgänglig när spelaren rör en dörr eller en kista
        case "e":
         if(Player_is_touching_door === true && (Current_monster.type === document.getElementById("Empty_image")) || (Player_is_touching_door === true && Current_monster.type === document.getElementById("Chest") && Mimic_is_attacking === false)){ //Dörr öppnas endast ifall spelaren rör dören och det inte finns något monster i rummet allstå current_monster.type är en tom bild. Det andra vilkoret är ifall monstret är en vanlig kista
            if (Rooms_explored_counter < 7){ 
                Current_monster = new Karaktär(document.getElementById("Empty_image"),0,0,0,0,0,0,0,0,0) 
                ctx.clearRect(0,0,Game_canvas.width,Game_canvas.height)
                Spelkaraktär.y = Game_canvas.height*0.8
                  var randomized_room = Math.ceil(Math.random()*2)
                  if (randomized_room === 1){Current_room = new Room("Bilder/Rooms/library_background.png",document.getElementById("Library_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86)}
                  if (randomized_room === 2){Current_room = new Room("Bilder/Rooms/Vine_room.png",document.getElementById("Vines_room_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86)}
                  Current_monster.Monster_update()
                  Current_room.update_entire_room()
                  assign_monster(Math.ceil((Math.random()*3))) //Slumpar vad nästa rum kommer att beröra
                  Monster_encounter()
                  chest_status = "Unopened"
                  Rooms_explored_counter ++
            }
            else if (Rooms_explored_counter === 7){  //Spelaren har nått spelets sista rum och möter spelets slutboss, Nekromantikern
               ctx.clearRect(0,0,Game_canvas.width,Game_canvas.height)
               Spelkaraktär.y = Game_canvas.height*0.8
               Current_room = Current_room = new Room("Bilder/Rooms/Throne_room_background.png",document.getElementById("Throne_room_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86)
               Current_monster.Monster_update()
               Current_room.update_entire_room()
               assign_monster(4)
               Monster_encounter()
               Rooms_explored_counter++
            }
        }
         if (player_is_touching_chest === true && chest_status === "Unopened"){
            let Chest_result = Math.ceil((Math.random()*2))
            ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
            if (Chest_result === 1){
                chest_status = "Opened"
                Current_monster.sx = 616
                Current_monster.Monster_update()
                Spelkaraktär.health += 3
                if (Spelkaraktär.health > 5 && God_mode === "inactive"){Spelkaraktär.health = 5} //Ser till att spelaren inte kan ha mer än 5 liv, så länge inte gud läge är aktiverat

            }
            else{chest_status = "Opened";Mimic_is_attacking = true;Current_monster.health = 12; Monster_encounter()} // Strid påbörjas, mimic attackerar spelaren
         }
    }
    switch (e.key){
        case "Enter":
            if (Spelkaraktär.health <= 0 || End_scene_active === true){Reload_game()} //När spelaren har förlorat eller vunnit spelet kan spelaren starta om sidan genomn att trycka på enter
    }

    switch (e.key){  //Ifall g trycks och spelaren inte är död, aktiveras gud läge, vilket gör dig praktiskt sätt odödlig
        case "g":
            God_mode = "Active"
            if (Spelkaraktär.health > 0){ Spelkaraktär.health = 100}
    }

    ctx.clearRect(Spelkaraktär.x,Spelkaraktär.y,Spelkaraktär.width,Spelkaraktär.height)
    Spelkaraktär.update()
    Current_monster.Monster_update()
    if (player_attack_active === true){Player_attack.update_with_s()} //Ifall spelaren slår, kommer den att ritas upp annars gör den inte detta

    if(Times_moved_counter <= 8){tutorial("Walking")}  //Anger hur länge som det ska stå i text_canvas, hur spelaren går
    else if(Times_attacked_counter <= 6){tutorial("Fighting")} //Anger hur länge som det ska stå i text_canvas, hur spelaren slår
    else{tutorial("Empty canvas")} //Ifall båda av dessa är avklarade, är text_canvas tom

    //Vid varje tryck av en knapp, vart spelarens position är, relativt med andra objekt
    is_player_at_door() 
    is_player_at_chest()
    is_player_hit(Current_monster)
    is_player_hit(Monster_projectile_asset)
    is_player_hit(Monster_projectile_asset_2)
    is_player_hit(Monster_projectile_asset_3)

    Current_room.update()
    Check_health()
} 

//Spelare Animation 

function Player_animation(Character_action){
    if (Player_animation_active) return; // Ser till att animationen inte kan bli kallad när den redan är i gång
    if (Character_action === "Walking"){
        Times_moved_counter++
        var Current_frame = 0
        var Frame_to_end_with = 3
        var Interval = setInterval(animate,200)
    }
    if (Character_action === "Attack"){
        Times_attacked_counter++
        var Current_frame = 3
        var Frame_to_end_with = 8
        Spelkaraktär.sx = 1540
        var slash_current_frame = -1
        var slash_frame_to_end_with = 5
        var Interval = setInterval(animate,79)
        var Slash_interval = setInterval(slash_animation,70)
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
        Check_health()
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
            Check_health()
            return
        }
    }
    function slash_animation(){ // Aktiveras när spelaren trycker på z och skapar ett objekt framför spelaren
        slash_current_frame++
        ctx.clearRect(Player_attack.x,Player_attack.y,Player_attack.width,Player_attack.height)
        Player_attack.sx += 350
        Spelkaraktär.update()
        Current_monster.Monster_update()
        Player_attack.update_with_s()
        Current_room.update()
        Check_health()
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
    var Timeoutid = setTimeout(Reload_game,35000)
    function reset_timer(){clearTimeout(Timeoutid);Timeoutid = setTimeout(Reload_game,35000)}
    document.addEventListener("mousemove",reset_timer)
    document.addEventListener("scroll",reset_timer)
    document.addEventListener("keydown",reset_timer)
    
     
    //Här definerar objekt som behöver vara definerade vid spelets början, dessa uttnytjar constructorerna längst upp i filen, den uppdatterar även objekt för att de ska vara ritande vid spelets början

    var Spelkaraktär = new Karaktär(Warrior_spelkaraktären_bild, 760, 760, Game_canvas.width*0.4, Game_canvas.height*0.4, Game_canvas.width*0.2, Game_canvas.height*0.35,0,0,5);
    var Current_monster = new Karaktär(document.getElementById("Empty_image"),0,0,0,0,0,0,0,0,0)
    var Health_bar = new Assets(Health_bild,Game_canvas.width *0.74,-Game_canvas.height*0.02,Game_canvas.width*0.26,Game_canvas.height*0.34, Health_bild.width,Health_bild.height / 4.5)
    var Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Monster_projectile_asset_2 = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Monster_projectile_asset_3 = new Assets(document.getElementById("Empty_image",0,0,0,0))
    var Player_attack = new Assets(document.getElementById("Slash"), 700, 100, Game_canvas.width*0.3/1.7, Game_canvas.height*0.3,350,480,50,-15)
    var Current_room = new Room("Bilder/Rooms/Main_Dungeon_background.png",document.getElementById("Main_Dungeon_walls"),Game_canvas.height*0.24,Game_canvas.height*0.78,-35,Game_canvas.width*0.86) //Game_canvas.height = 559 och .width = 1280


    Current_room.update_entire_room()
    Check_health()
    Spelkaraktär.update()