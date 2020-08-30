//Looks up a given combination and returns the result of the combination
async function combine(...elements){
    //Get Data from the elements file
    let rawCombinationData=await fetch("combinations/elements.json");
    let combinations=await rawCombinationData.json();
    //Creates a New Array with the names of the Elements (Sorted Alphabetically)
    let elementNames=[];
    elements.forEach(val=>{elementNames.push(val.name)});
    elementNames=elementNames.map(item3=>item3.toLowerCase()).sort();
    //Checks if the equations match
    let result=[];
    combinations.elements.forEach((currElem)=>{
        if(currElem.equation!="none"){
            currElem.equation.forEach((equation)=>{
                if(JSON.stringify(elementNames)==JSON.stringify(equation.map((item4)=>item4.toLowerCase()).sort())){
                    result.push(new Element(currElem.name,currElem.type,currElem.color,currElem.textColor));
                }
            });
        }
    });
    return result;
}