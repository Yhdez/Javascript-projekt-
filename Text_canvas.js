const Text_canvas = document.getElementById("Text_canvas")

ctx_text = Text_canvas.getContext("2d")

ctx_text.font = Text_canvas.width*0.06 + "px Pixelify Sans, sans-serif"
ctx_text.fillText("Press  w , a , s , d  to move",62,80)

function tutorial(Part_of_tutorial){
    ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)
    if (Part_of_tutorial === "Game_over"){
        ctx_text.fillText("Press Enter to restart",100,85)

        ctx.fillStyle = "white"
        ctx.font = Game_canvas.width*0.075 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Game over",Game_canvas.width*0.3,Game_canvas.height*0.3)

        ctx.font = Game_canvas.width*0.03 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Rooms explored: " + Rooms_explored_counter,Game_canvas.width*0.35,Game_canvas.height*0.45)
        ctx.fillText("Monsters defeated: " + Monster_defeated_counter,Game_canvas.width*0.32,Game_canvas.height*0.55)
        console.log("förlust")
    }

    else if (Part_of_tutorial === "End_scene"){
        ctx_text.fillText("Press Enter to restart",100,85)
        
        ctx.fillStyle = "white"
        ctx.font = Game_canvas.width*0.075 + "px Pixelify Sans, sans-serif"
        ctx.fillText("You  Win",Game_canvas.width*0.33,Game_canvas.height*0.32)
        ctx.font = Game_canvas.width*0.03 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Made by Alexander Yhde TE22A",Game_canvas.width*0.25,Game_canvas.height*0.55)

    }
    else if (Part_of_tutorial === "Walking"){ ctx_text.fillText("Press  w , a , s , d  to move",90,85)}

    else if (Part_of_tutorial === "Fighting"){ctx_text.fillText("Press  z to Swing",180,85)}
  
    else if (Part_of_tutorial === "Open_chest"){ ctx_text.fillText("Press e to open chest",90,85)}

    else if (Part_of_tutorial === "What_is_in_chest"){ ctx_text.fillText("You Healed for 3 health",125,85)}

    else if (Part_of_tutorial === "Open_door"){
        if(Rooms_explored_counter === 7){ctx_text.fillText("With the necromancer defeated, you admire the view",80,85)} //Då sista rummet inte innehåller en dörr är rummet annorluda än det vanligtvis är
        else{ctx_text.fillText("Press  e  to open door",120,85)}}

    else if (Part_of_tutorial === "Locked_door"){
        if(Rooms_explored_counter === 7){ctx_text.fillText("You admire the view",155,85)} //Då sista rummet inte innehåller en dörr är rummet annorluda än det vanligtvis är
        else{ ctx_text.fillText("The Door is Locked",155,85)}
    }

    else if (Part_of_tutorial === "Empty canvas"){return}
}

tutorial("Walking")
//ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)