const penPicker = document.getElementById("penPicker");
const bgPicker = document.getElementById("bgPicker");
const fontSize = document.getElementById("fontSize");
const workSpace = document.getElementById("workSpace");
const clearBtn = document.getElementById("clearBtn");
const saveDownloadBtn = document.getElementById("saveDownloadBtn");
const retrieveBtn = document.getElementById("retrieveBtn");

var isDrawing = false;
var lastX = 0;
var lastY = 0;
let ctx = workSpace.getContext('2d');

penPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

workSpace.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;

})

workSpace.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;

    }
})

workSpace.addEventListener("mouseup", () => {
    isDrawing = false;
})

bgPicker.addEventListener("change", (e) => {
    ctx.fillStyle = e.target.value;
    e.fillRect(0, 0, 1200, 600);
})

fontSize.addEventListener("change", (e) => {
    ctx.lineWidth = e.target.value;

})

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, workSpace.width, workSpace.height);
})

saveDownloadBtn.addEventListener("click", () => {
    localStorage.setItem('canvasContents', workSpace.toDataURL());
    let link = document.createElement("a");

    link.download = "my-canvas.png";
    link.href = workSpace.toDataURL();
    link.click();
})

retrieveBtn.addEventListener("click", () => {
    let savedSign = localStorage.getItem("canvasContents");
    if (savedSign) {
        let img = new Image();
        img.src = savedSign;
        ctx.drawImage(img, 0, 0);
    }
})