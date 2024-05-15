var Monster_Current_frame = undefined
var Monster_Frame_to_end_with = undefined
var Monster_interval = undefined
var Monster_walking_interval = undefined
var Monster_animation_times_repeated = undefined
var Asssigned_x_position = undefined
var Assigned_y_position = undefined
var Monster_death_active = false


function assign_monster(type){ //Specificerar monster_typen som spelaren kommer att bemöta, detta slumpas fram vid starten av varje rum, om rummet inte är det sjunde då det automatiskt är 4 alltså nekromantikern
    if (type === 1){
     var Devil = new Karaktär(document.getElementById("Devil"), 600, 600, Game_canvas.width*0.37, Game_canvas.height*0.3, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0,9)
     Current_monster = Devil
    }
    if (type === 2){
     var Phantom = new Karaktär(document.getElementById("Phantom"), 600, 600, Game_canvas.width*0.37, Game_canvas.height*0.3, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0,6)
     Current_monster = Phantom
    }
    if (type === 3){  // Mimic kommer inte starta sitt monster attack mönster i monster_encounter förrän spelaren har tryckt på kistan och kanske sätter Mimic_is_attacking till true
      var Mimic = new Karaktär(document.getElementById("Chest"), 600, 600, Game_canvas.width*0.37, Game_canvas.height*0.42, Game_canvas.width*0.2, Game_canvas.height*0.38,0,1200,12)
      Current_monster = Mimic
    }
    if (type === 4){ // Type är endast 4 om current_room === 8, alltså spelets sista rum
      var Necromancer = new Karaktär(document.getElementById("Necromancer"), 600, 600, Game_canvas.width*0.37, Game_canvas.height*0.3, Game_canvas.width*0.2, Game_canvas.height*0.38,0,0,20)
      Current_monster = Necromancer
    }
   }

function Monster_encounter(){
  if(Current_monster.health > 0){
       clearInterval(Monster_interval)
    if (Current_monster.type === document.getElementById("Devil")){  //Djävulens attack mönster
        Idle()
        setTimeout(Run_and_swing,(Math.random() * 1000) + 1500)
        setTimeout(Devil_Projectile,7500)
        setTimeout(Monster_encounter.bind(null,Current_monster),9500) //Återupprepar attack monstret, så länge inte Current_monster.health är 0 eller mindre

     }
    if (Current_monster.type === document.getElementById("Phantom")){ //Fantomens attack mönster
       Idle()
       Assigned_y_position = (Math.random() * Game_canvas.height*0.358) + Game_canvas.height*0.32
       Asssigned_x_position = (Math.random() * Game_canvas.width*0.7) + Game_canvas.width*0.0235
       setTimeout(Go_to_position(Current_monster,12),(Math.random() * 1000) + 1500)
       setTimeout(shoot_following_projectile.bind(null,"Phantom_projectile"),(Math.random() * 1000) + 4500)
       setTimeout(Monster_encounter.bind(null,Current_monster),11000)
     }

    if (Current_monster.type === document.getElementById("Chest") && Mimic_is_attacking === true){ //Mimics attack mönster
        Idle()
        Chase_player()
        setTimeout(Monster_encounter.bind(null,Current_monster),7000)
     }

    if (Current_monster.type === document.getElementById("Necromancer")){ //Nekromantikerns attack mönster
          Idle()
          setTimeout(shoot_following_projectile.bind(null,"Necromancer_projectile"),(Math.random() * 1000) + 2000)
          setTimeout(Teleport,7500)
          setTimeout(Necromancer_projectile,12000)
          setTimeout(Monster_encounter.bind(null,Current_monster),16500)
     }
   
    function Idle(){ // Sätter en animation som återupprepas till clearinterval(Monster_interval)
       Monster_animation_times_repeated = "Indefinitely"
       Current_monster.sy = 0
       Monster_Current_frame = -1
       Monster_Frame_to_end_with = 3
       Monster_interval = setInterval(Monster_animation,150)
      }
   
    function Run_and_swing(){ //Djävul förmåga, slumpar först positionen som monstret ska gå till, startar funktionen som går till den och till sist startar en animation
       Assigned_y_position = (Math.random() * Game_canvas.height*0.358) + Game_canvas.height*0.32
       Asssigned_x_position = (Math.random() * Game_canvas.width*0.7) + Game_canvas.width*0.0235
       Go_to_position(Current_monster,Game_canvas.width*0.022)
       Current_monster.sy = 600
       Monster_Current_frame = -1
       Monster_Frame_to_end_with = 7
       Monster_animation_times_repeated = 1
       clearInterval(Monster_interval)
       Monster_interval = setInterval(Monster_animation,150)
     }

    function Teleport(){ //Nekromantiker förmåga
      clearInterval(Monster_interval)
      Current_monster.sy = 1100
      Monster_Current_frame = -1
      Monster_Frame_to_end_with = 4
      Monster_animation_times_repeated = 1
      Monster_interval = setInterval(Monster_animation,200)
      setTimeout(switch_position,900)
      function switch_position(){ //Slumpar en position och sprite'n ritas där
        ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
        Current_monster.x = (Math.random() * Game_canvas.width*0.7) + Game_canvas.width*0.0235
        Current_monster.y = (Math.random() * Game_canvas.height*0.358) + Game_canvas.height*0.32
        Monster_Current_frame = 4
        Monster_Frame_to_end_with = 7
        Monster_animation_times_repeated = 1
        clearInterval(Monster_interval)
        Monster_interval = setInterval(Monster_animation,200)
      }
     }

    function Chase_player(){  //Mimic förmåga, Monstret går till spelarens tidigaste position
       Assigned_y_position = Spelkaraktär.y - Game_canvas.height*0.07
       Asssigned_x_position = Spelkaraktär.x - Game_canvas.width*0.01
       Go_to_position(Current_monster,Game_canvas.width*0.007)
       setTimeout(Stop_chasing_player,4500)
       function Stop_chasing_player(){ // Startar hans utmatad animation, samt avbryter Go_to_position() funktionnen 
        clearInterval(Monster_walking_interval)
        clearInterval(Monster_interval)
        Current_monster.sy = 580
        Monster_Current_frame = -1
        Monster_Frame_to_end_with = 4
        Monster_animation_times_repeated = "Indefinitive"
        Monster_interval = setInterval(Monster_animation,200)
      }
    }

    function Go_to_position(sprite_to_move,speed){ // Delar up positionen, sprite'n ska gå till inom en av 4 kvadranter, vilket har olika värden i x-led och y-led som den ska öka med varje 0.15 sekund
       if (sprite_to_move.y <= Assigned_y_position){
           if (sprite_to_move.x <= Asssigned_x_position){Monster_walking_interval = setInterval(if_both_bigger_than_monster,150)} //Current_monster.x och y är på motsatt sida ifrån de givna koordinaterna
           else{Monster_walking_interval = setInterval(if_x_smaller_than_monster ,150)}
       }
       else{
           if(Current_monster.x <= Asssigned_x_position){Monster_walking_interval = setInterval(if_y_smaller_than_monster ,150)}
           else{Monster_walking_interval = setInterval(if_both_smaller_than_monster ,150)}
       }
   
       function if_y_smaller_than_monster(){
           if (sprite_to_move.x > Asssigned_x_position && sprite_to_move.y < Assigned_y_position){ //när sprite'n har kommit till sin destination stannar den och försvinner genom att bli en tom bild
               clearInterval(Monster_walking_interval)
               ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
               Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
               return
           }
           ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
           if(sprite_to_move.x <= Asssigned_x_position){sprite_to_move.x += speed}
           if (sprite_to_move.y >= Assigned_y_position){sprite_to_move.y -= speed}

           is_player_hit(sprite_to_move)
           if (sprite_to_move === Current_monster){Current_monster.Monster_update()} //Då projektiler och current_monster har olika benämda .update namn, krävs det att den ser vilket typ av objekt som flyttas
           else{sprite_to_move.update()}
       }
       function if_x_smaller_than_monster(){
           if (sprite_to_move.x < Asssigned_x_position && sprite_to_move.y > Assigned_y_position){
               clearInterval(Monster_walking_interval)
               ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
               Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
               return
           }
           ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
           if(sprite_to_move.x >= Asssigned_x_position){sprite_to_move.x -= speed}
           if (sprite_to_move.y <= Assigned_y_position){sprite_to_move.y += speed}
           is_player_hit(sprite_to_move)
           if (sprite_to_move === Current_monster){Current_monster.Monster_update()}
           else{sprite_to_move.update()}
       }
       function if_both_smaller_than_monster(){
           if (sprite_to_move.x < Asssigned_x_position && sprite_to_move.y < Assigned_y_position){
               clearInterval(Monster_walking_interval)
               ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
               Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
               return
           }
           ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
           if(sprite_to_move.x >= Asssigned_x_position){sprite_to_move.x -= speed}
           if (sprite_to_move.y >= Assigned_y_position){sprite_to_move.y -= speed}

           is_player_hit(sprite_to_move)
           if (sprite_to_move === Current_monster){Current_monster.Monster_update()}
           else{sprite_to_move.update()}
           
       }
       function if_both_bigger_than_monster(){
           if (sprite_to_move.x > Asssigned_x_position && sprite_to_move.y > Assigned_y_position){
              clearInterval(Monster_walking_interval)
              ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
              Monster_projectile_asset = new Assets(document.getElementById("Empty_image",0,0,0,0))
              return
       }
       ctx.clearRect(sprite_to_move.x,sprite_to_move.y,sprite_to_move.width,sprite_to_move.height)
           if(sprite_to_move.x <= Asssigned_x_position){sprite_to_move.x += speed}
           if (sprite_to_move.y <= Assigned_y_position){sprite_to_move.y += speed}

           is_player_hit(sprite_to_move)
           if (sprite_to_move === Current_monster){Current_monster.Monster_update()}
           else{sprite_to_move.update()}
           
       }
   }
   

   
   
      function shoot_following_projectile(type_of_projectile){ //fantom och nekromantiker förmåga, fungerar som chase_player() fast monstret skapar en projektil som går till spelarens tidigaste position
        //Då Nekromantikern och Fantomen har olika animationer får de olika värden för Monster_animation()
         if (Current_monster.type === document.getElementById("Phantom")){
          Current_monster.sy = 600
          Monster_Current_frame = -1
          Monster_Frame_to_end_with = 6
          }
         if (Current_monster.type === document.getElementById("Necromancer")){
          Current_monster.sy = 550
          Monster_Current_frame = -1
          Monster_Frame_to_end_with = 5
          }
        Monster_animation_times_repeated = 1
        clearInterval(Monster_interval)
        Monster_interval = setInterval(Monster_animation,150)
        clearInterval(Monster_walking_interval)
        Assigned_y_position = Spelkaraktär.y + Game_canvas.height*0.1
        Asssigned_x_position = Spelkaraktär.x + Game_canvas.width*0.08
        Monster_projectile_asset = new Assets(document.getElementById(type_of_projectile),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y-Game_canvas.height*0.001,Game_canvas.width*0.023,Game_canvas.height*0.041)
        Go_to_position(Monster_projectile_asset,Game_canvas.width*0.02)
      }


     function Necromancer_projectile(){ //nekromantiker förmåga, skapar tre projektiler som skjuts i tre olika riktningar
      Current_monster.sy = 1640
      Current_monster.sx = 0
      Monster_Current_frame = -1
      Monster_Frame_to_end_with = 7
      Monster_animation_times_repeated = 1
      clearInterval(Monster_walking_interval)
      clearInterval(Monster_interval)
      Monster_interval = setInterval(Monster_animation,120)
      setTimeout(interval_has_started,500); //Detta gör att nekromantikerns projektiler skjuts efter 0.5sekunder efter det att hans animation har startat, för att det är mer estetiskt tilltalande
      function interval_has_started(){ 
        Monster_projectile_asset = new Assets(document.getElementById("Necromancer_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.13,Game_canvas.width*0.023,Game_canvas.height*0.041)
        Monster_projectile_asset_2 = new Assets(document.getElementById("Necromancer_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.13,Game_canvas.width*0.023,Game_canvas.height*0.041)
        Monster_projectile_asset_3 = new Assets(document.getElementById("Necromancer_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.13,Game_canvas.width*0.023,Game_canvas.height*0.041)
        Monster_projectile_interval = setInterval(Necromancer_assign_projectile,100)}

      function Necromancer_assign_projectile(){ //Denna skjuter iväg projektilerna samtidigt och återupprepas enligt ett interval
        Fire_projectile(Monster_projectile_asset,0,-Game_canvas.width*0.017,-10,0,0,10)
        Fire_projectile(Monster_projectile_asset_2,Game_canvas.width*0.012,Game_canvas.height*0.02,0,-10,10,0)
        Fire_projectile(Monster_projectile_asset_3,-Game_canvas.width*0.012,Game_canvas.height*0.02,0,-10,10,0)

        if (Monster_projectile_asset.y < -20 && Monster_projectile_asset_2.y > Game_canvas.height && Monster_projectile_asset_3.y > 0){   //Detta ser till att intervalet avslutas när projektilerna har kommit till där de inte längre syns
            clearInterval(Monster_projectile_interval)
            return
        }
     }
    }
   
    function Devil_Projectile(){ //djävul förmåga, skapar tre projektiler, likt nekromantikern, fast dessa går i andra riktningar.
       Current_monster.sy = 1320
       Current_monster.sx = 0
       Monster_Current_frame = -1
       Monster_Frame_to_end_with = 7
       Monster_animation_times_repeated = 1
       clearInterval(Monster_walking_interval)
       clearInterval(Monster_interval)
       Monster_interval = setInterval(Monster_animation,120)
       Monster_projectile_asset = new Assets(document.getElementById("Devil_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.05,Game_canvas.width*0.023,Game_canvas.height*0.041)
       Monster_projectile_asset_2 = new Assets(document.getElementById("Devil_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.05,Game_canvas.width*0.023,Game_canvas.height*0.041)
       Monster_projectile_asset_3 = new Assets(document.getElementById("Devil_projectile"),Current_monster.x+Game_canvas.width*0.1 ,Current_monster.y+Game_canvas.height*0.05,Game_canvas.width*0.023,Game_canvas.height*0.041)
       Monster_projectile_interval = setInterval(devil_assign_projectile,100)
   
       function devil_assign_projectile(){ //Fungerar i princip exakt likadant som Necromancer_assign_projectile()
           Fire_projectile(Monster_projectile_asset,0,Game_canvas.height*0.048,-10,0,0,10)
           Fire_projectile(Monster_projectile_asset_2,Game_canvas.width*0.024,0,0,-10,10,0)
           Fire_projectile(Monster_projectile_asset_3,-Game_canvas.width*0.024,0,0,-10,10,0)
   
           if (Monster_projectile_asset.y > Game_canvas.height && Monster_projectile_asset_2.x > Game_canvas.width && Monster_projectile_asset_3.x < 0){
               clearInterval(Monster_projectile_interval)
           }
       }
   
       }
   
    function Fire_projectile(type, speed_x, speed_y, y_space, x_space, width_space, height_space){ //space variablen är för att se till att clearrect() tar bort hela bilden,
           ctx.clearRect(type.x +x_space,type.y + y_space,type.width+width_space,type.height+height_space)
           type.x += speed_x
           type.y += speed_y
           is_player_hit(type)
           Current_monster.Monster_update()
           type.update()
   }
  }
  else{Monster_death(); return} //Monstret dör först efter den har gått ett varv av sitt monster attack mönster


    function Monster_death(){ //Startar death_animation animationen
       if (Current_monster.type === document.getElementById("Necromancer")){setTimeout(End_scene,2500)} //Då nekromantikern är den slutgiltiga bossen, aktiveras end_scene funktionen, vilket är slutet av spelet
       Monster_death_active = true
       clearInterval(Monster_interval)
       Current_monster =  new Karaktär(document.getElementById("Death_animation"), 600, 600, Current_monster.x, Current_monster.y, Game_canvas.width*0.2, Game_canvas.height*0.32,0,0,0)
       ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
       Current_monster.update()
       Current_monster.sy = 0
       Monster_Current_frame = -1
       Monster_Frame_to_end_with = 6
       Monster_animation_times_repeated = 1
       Monster_interval = setInterval(Monster_animation,100)
       Mimic_is_attacking = false
       Monster_defeated_counter ++
     }

    function Monster_animation(){ //Funktionen som ansvarar för att sköta alla animationer som monster gör, denna kallas ifrån andra funktioner inuti monster_encounter
       Monster_Current_frame++
       ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
       Current_monster.sx = 616 * Monster_Current_frame
       Current_monster.Monster_update()
       if (Monster_Current_frame === Monster_Frame_to_end_with){
           if (Monster_animation_times_repeated === 1){
               clearInterval(Monster_interval)
               if (Monster_death_active === false){Idle()} //Ifall monstret inte ska dö, återupprepar monstret sin idle animation
               else{Current_monster = new Karaktär(document.getElementById("Empty_image"), 0, 0, 0, 0, 0, 0,0,0,0);Monster_death_active = false; return} //Ifall monstret dör, blir monstret en tom bild
           }
           ctx.clearRect(Current_monster.x,Current_monster.y,Current_monster.width,Current_monster.height)
           Current_monster.sx = 0
           Current_monster.Monster_update()
           Monster_Current_frame = 0
       }
     }
    }

