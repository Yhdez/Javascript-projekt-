const Text_canvas = document.getElementById("Text_canvas")

ctx_text = Text_canvas.getContext("2d")

ctx_text.font = Text_canvas.width*0.06 + "px Pixelify Sans, sans-serif"
ctx_text.fillText("Press  w , a , s , d  to move",62,80)

function tutorial(Part_of_tutorial){
    ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)
    if (Spelkaraktär.health <= 0){ //Sker när spelaren har förlorat 5 liv
        ctx_text.fillText("Press Enter to restart",100,85)

        ctx.fillStyle = "white"
        ctx.font = Game_canvas.width*0.075 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Game over",Game_canvas.width*0.3,Game_canvas.height*0.3)

        ctx.font = Game_canvas.width*0.03 + "px Pixelify Sans, sans-serif"
        ctx.fillText("Rooms explored: " + Rooms_explored_counter,Game_canvas.width*0.35,Game_canvas.height*0.45)
        ctx.fillText("Monsters defeated: " + Monster_defeated_counter,Game_canvas.width*0.32,Game_canvas.height*0.55)
    }
    else if (Part_of_tutorial === "Walking"){ ctx_text.fillText("Press  w , a , s , d  to move",90,85)}
    else if (Part_of_tutorial === "Fighting"){ctx_text.fillText("Press  z to Swing",180,85)}
    else if (Part_of_tutorial === "Open_door"){ctx_text.fillText("Press  e  to open door",120,85)}
    else if (Part_of_tutorial === "Locked_door"){ctx_text.fillText("The Door is Locked",155,85)}
    else if (Part_of_tutorial === "Empty canvas"){return}
}

tutorial("Walking")
//ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)