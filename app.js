const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const clear = document.getElementById("jsClear")
const saveBtn = document.getElementById("jsSave")

const INITIAL_COLOR = "#2c2c2c"

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas.width, canvas.height)

ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5

let painting = false;
let filling = false;

function stopPainting(){
    painting = false
}

function startPainting(){
    painting = true
    
}

function onMouseMove(event){
    const x = event.offsetX
    const y = event.offsetY
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x,y)
    } else{
        ctx.lineTo(x,y)
        ctx.stroke()
    }
}

function handleColorClick(event){
    let color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
    if (filling){
        ctx.fillRect(0,0,canvas.width, canvas.height)
    }
}

function handleRangeChange(event){
    let width = event.target.value
    ctx.lineWidth = width
}

function handleModeClick(){
    if(filling === true){
        filling = false
        mode.innerText = "Fill"
        ctx.canvas.style.cursor = "default"
    } else {
        filling = true
        mode.innerText = "Paint"
        ctx.canvas.style.cursor = "pointer"
    }

}

// function handleCanvasClick(){
//     if(filling){
//         ctx.fillRect(0,0,canvas.width, canvas.height)
//     }
// }

function handleClearClick(){
    let clearcolor = ctx.fillStyle
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = clearcolor
}

function handleCM(event){
    event.preventDefault()
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "PaintJS[EXPORT]"
    link.click()
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    // canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => 
color.addEventListener("click", handleColorClick)
)

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick)
}

if(clear){
    clear.addEventListener("click", handleClearClick)
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}