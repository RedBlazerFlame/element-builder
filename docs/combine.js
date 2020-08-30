//Looks up a given combination and returns the result of the combination
async function combine(...elements){
    //Get Data from the elements file
    let rawCombinationData=await fetch("combinations/elements.json");
    let combinations=await rawCombinationData.json();
    //Creates a New Array with the names of the Elements (Sorted Alphabetically)
    let elementNames=[];
    elements.forEach(value=>{elementNames.push(value.name)});
    elementNames=elementNames.map(item3=>item3.toLowerCase()).sort();
    //Checks if the equations match
    let result=[];
    combinations.elements.forEach((currElem)=>{
        if(currElem.equation!="none"){
            currElem.equation.forEach((equation)=>{
                let newEquation=equation.map((item4)=>{
                    if(typeof(item4)==="string"){
                        return item4;
                    }else if(typeof(item4)==="object"){
                        return [...new Array(item4[1])].map(currElement=>item4[0]);
                    }
                });
                let flatEquation=[].concat(...newEquation);
                flatEquation.forEach(itemin=>console.log(itemin));
                if(JSON.stringify(elementNames)==JSON.stringify(flatEquation.map(item4=>item4.toLowerCase()).sort())){
                    result.push(new Element(currElem.name,currElem.type,currElem.color,currElem.textColor));
                }
            });
        }
    });
    return result;
}