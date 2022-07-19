let toolsCont=document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let optionsCont=document.querySelector(".options-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil=document.querySelector(".pencil");
let eraser=document.querySelector(".eraser");
let optionsFlag=true;

let upload=document.querySelector(".upload");

let sticky=document.querySelector(".sticky");

let pencilFlag=false;
let eraserFlag=false;
optionsCont.addEventListener("click",(e) => {
    //true->tools show, false -> hide tools
    optionsFlag=!optionsFlag;

    if(optionsFlag)
    {
       openTools();
    }
    else{
         closeTools();
    }
})

function openTools() {
    let iconElem=optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display ="flex";
}
function closeTools() {
    let iconElem=optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display ="none";

    pencilToolCont.style.display="none";
    eraserToolCont.style.display="none";
}

pencil.addEventListener("click",(e) => {
    //true->tools pencil tool, false -> hide pencil tools
    pencilFlag=!pencilFlag;

    if(pencilFlag){
        pencilToolCont.style.display="block";
    }
    else
    {
        pencilToolCont.style.display="none";
    }
})

eraser.addEventListener("click",(e) => {
    //true->tools eraser tool, false -> hide eraser tools
    eraserFlag=!eraserFlag;

    if(eraserFlag){
        eraserToolCont.style.display="flex";
    }
    else
    {
        eraserToolCont.style.display="none";
    }
})

upload.addEventListener("click", (e) => {
    //to open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change", e => {
        let file=input.files[0];
        let url= URL.createObjectURL(file);

        let stickyTemplateHTML=`
        <div class="header-cont">
        <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
               <img src="${url}"/>
            </div>
        `;
        createSticky(stickyTemplateHTML);
    })

    
})

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML= `
    <div class="header-cont">
        <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
                <textarea spellcheck="false"></textarea>
            </div>
    `;
    createSticky(stickyTemplateHTML);
})

function createSticky(stickyTemplateHTML)
{
    let stickycont = document.createElement("div");
        stickycont.setAttribute("class", "sticky-cont");
        stickycont.innerHTML = stickyTemplateHTML;

    document.body.appendChild(stickycont);

    let minimize=stickycont.querySelector(".minimize");
    let remove=stickycont.querySelector(".remove");
    noteActions(minimize,remove,stickycont);

    stickycont.onmousedown = function(event) {
      dragAndDrop(stickycont,event);     
      };
      
      stickycont.ondragstart = function() {
        return false;
      };
}

function noteActions(minimize,remove,stickycont) {
    remove.addEventListener("click", e => {
        stickycont.remove();
    })
    minimize.addEventListener("click", e=> {
        let noteCont=stickycont.querySelector(".note-cont");
        let display=getComputedStyle(noteCont).getPropertyValue("display");
        if(display==="none") noteCont.style.display="block";
        else noteCont.style.display="none";
    })

}

function dragAndDrop(element,event)
{
    let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;
      
        element.style.position = 'absolute';
        element.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
          element.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          element.onmouseup = null;
        };
}