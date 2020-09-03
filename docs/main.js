//Get References to certain parts of the DOM
var [combineButton,clearButton,equationBox,resetButton]=["combine","clear","equation","reset"].map(item=>document.getElementById(item));
var elementsOwned,allElements=[];
//Gets the basic elements
getBasic().then(result=>{
    //Get Save Data and Basic Elements and set that to the ElementsOwned Variable
    elementsOwned=[...(JSON.parse(localStorage.getItem("progress"))||[]).map(item=>new Element(item.name,item.type,item.color,item.textColor)),...result];
    //Remove Duplicates
    elementsOwned=elementsOwned.filter((v,i,a)=>a.findIndex(t=>(t.name.toLowerCase() === v.name.toLowerCase() && t.type === v.type))===i);
    //Get All Elements
    getAll().then(elementCombinations=>{
        //Append all of the elements as paragraph elements
        elementsOwned.forEach((item)=>{
            if(elementCombinations.map(val=>val.name).includes(item.name)){
                let elemIndex=elementCombinations.map(val=>val.name).indexOf(item.name);
                item.color=(elemIndex!=-1?elementCombinations[elemIndex].color:"linear-gradient(120deg,#FFFFFF,#DDDDDD)");
                item.textColor=(elemIndex!=-1?elementCombinations[elemIndex].textColor:"black");
                item.pushElement(elementsOwned);
            }
        })
    })
    
})
 //Get All Elements
 getAll().then(elementCombinations=>{
    //Get a copy of all the elements
    allElements=elementCombinations;
    //if(prompt("Hello")=="World"){
        elementsOwned=allElements.map(item=>new Element(item.name,item.type,item.color,item.textColor));
        localStorage.setItem("progress",JSON.stringify(elementsOwned));
    //}
    })
//Clears the Equation Box
clearButton.addEventListener("click",()=>{
    equationBox.innerHTML="<p class=\"label\">Equation:</p>";
});
//Combines the Elements in the Equation Box
combineButton.addEventListener("click",()=>{
    //Converts the Elements in the Equation Box into an array with the addends of the combination
    let addends=[...document.getElementById("equation").childNodes].slice(1).map(item=>new Element(item.innerHTML));
    //Calls on the combine Function to combine the Elements
    combine(...addends).then(res=>{
        //Combines the result with the current elements
        let oldElementsOwned=elementsOwned;
        elementsOwned=[...elementsOwned,...res];
        elementsOwned=elementsOwned.filter((v,i,a)=>a.findIndex(t=>(t.name.toLowerCase() === v.name.toLowerCase() && t.type === v.type))===i);
        //Displays the elements to the screen as HTML elements
        console.log(elementsOwned);
        elementsOwned.forEach(item=>{
            if(allElements.map(val=>val.name).includes(item.name) && !oldElementsOwned.map(val=>val.name).includes(item.name)){
                item.pushElement(oldElementsOwned.map(val=>val.name));
            }
        })
        //Alert the player on the new creations
        if(res.length>0){
            alert(`You have created the following element(s): ${res.map(item=>item.name)}`);
        }
        //Updates the player progress
        localStorage.setItem("progress",JSON.stringify(elementsOwned));
    })
})
//Resets all Progress
resetButton.addEventListener("click",()=>{
    if(confirm("Are you sure that you want to reset ALL of your progress PERMANENTLY?")){
        if(confirm("Really Sure?")){
            if(confirm("Final Chance! Are you sure you want to RESET?")){
                alert("Alright, don't say that I didn't warn you.");
                localStorage.removeItem("progress");    //Bye Bye Progress
                window.location.replace("#top");   //It's Rewind Time
            }
        }
    }
})
