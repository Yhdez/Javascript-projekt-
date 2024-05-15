const Text_canvas = document.getElementById("Text_canvas")
ctx_text = Text_canvas.getContext("2d")
ctx_text.font = Text_canvas.width*0.06 + "px Pixelify Sans, sans-serif"
ctx_text.fillText("Press  w , a , s , d  to move",90,85)

function tutorial(Part_of_tutorial){ //Denna funktion ansvarar för att skriva informerande text till spelaren, där den får en parameter och skriver text baserat på den
    ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height) //Den raderar kod i början för att se till att text, aldrig staplas

    if (Part_of_tutorial === "Game_over"){ //Aktiveras när spelaren har nått 0 health
        ctx_text.fillText("Press Enter to restart",100,85)

        ctx.fillStyle = "white"
        ctx.font = Game_canvas.width*0.075 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Game over",Game_canvas.width*0.3,Game_canvas.height*0.3)

        ctx.font = Game_canvas.width*0.03 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Rooms explored: " + Rooms_explored_counter,Game_canvas.width*0.35,Game_canvas.height*0.45)
        ctx.fillText("Monsters defeated: " + Monster_defeated_counter,Game_canvas.width*0.32,Game_canvas.height*0.55)
    }

    else if (Part_of_tutorial === "End_scene"){ //Aktiveras när spelaren har besegrat Nekromantikern
        ctx_text.fillText("Press Enter to restart",100,85)
        
        ctx.fillStyle = "white"
        ctx.font = Game_canvas.width*0.075 + "px Pixelify Sans, sans-serif"
        ctx.fillText("You  Win",Game_canvas.width*0.33,Game_canvas.height*0.32)
        ctx.font = Game_canvas.width*0.03 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Made by Alexander Yhde TE22A",Game_canvas.width*0.25,Game_canvas.height*0.55)

    }
    else if (Part_of_tutorial === "Walking"){ ctx_text.fillText("Press  w , a , s , d  to move",90,85)} //Denna aktiveras i början av spelet och byts till "Fighting" efter att spelaren har gått ett visst avstånd

    else if (Part_of_tutorial === "Fighting"){ctx_text.fillText("Press  z to Swing",180,85)}
  
    else if (Part_of_tutorial === "Open_chest"){ ctx_text.fillText("Press e to open chest",90,85)} //Aktiveras när spelaren står bredvid en oöppnad kista

    else if (Part_of_tutorial === "What_is_in_chest"){ ctx_text.fillText("You Healed for 3 health",125,85)} //Aktiveras när spelaren står bredvid en öppnad kista, som inte är en mimic

    else if (Part_of_tutorial === "Open_door"){ //Aktiveras när spelaren står i närheten av en dörr
        if(Rooms_explored_counter === 8){ctx_text.fillText("You admire the view, Happily",80,85)} //Då sista rummet inte innehåller en dörr, kan inte det vanliga meddelandet att du ska trycka på en viss knapp för att öppna den, visas
        else{ctx_text.fillText("Press  e  to open door",120,85)}}

    else if (Part_of_tutorial === "Locked_door"){ //Aktiveras när spelaren står i närheten av en dörr, medans ett monster är i rummet
        if(Rooms_explored_counter === 8){ctx_text.fillText("You admire the view",155,85)} //Då sista rummet inte innehåller en dörr, kan inte det vanliga meddelandet att dörren är låst, visas
        else{ ctx_text.fillText("The Door is Locked",155,85)}
    }

    else if (Part_of_tutorial === "Empty canvas"){return} //Aktiveras när spelaren inte står i närheten av en dörr eller kista och har gått och slagit en viss mängd
}