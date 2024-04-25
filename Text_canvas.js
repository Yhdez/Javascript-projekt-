const Text_canvas = document.getElementById("Text_canvas")

ctx_text = Text_canvas.getContext("2d")

console.log(Text_canvas.height)
ctx_text.font = Text_canvas.width*0.06 + "px Pixelify Sans, sans-serif"
ctx_text.fillText("Press  w , a , s , d  to move",62,80)
//ctx_text.clearRect(0,0,Text_canvas.width,Text_canvas.height)

