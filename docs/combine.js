//Looks up a given combination and returns the result of the combination
async function combine(...elements){
    //Get Data from the elements file
    let rawCombinationData=await fetch("combinations/elements.json");
    let combinations=await rawCombinationData.json();
    //Creates a New Array with the names of the Elements (Sorted Alphabetically)
    let elementNames=[];
    elements.forEach(value=>{elementNames.push(value.name)});
    elementNames=elementNames.sort();
    //Checks if the equations match
    let result=[];
    combinations.elements.forEach((currElem)=>{
        if(currElem.equation!="none"){
            currElem.equation.forEach((equation)=>{
                let newEquation=equation.map((item4)=>{
                    if(typeof(item4)==="string"){
                        return item4;
                    }else if(typeof(item4)==="object" && typeof(item4[1])==="number"){
                        return [...Array(item4[1])].map(currElement=>item4[0]);
                    }else{
                        return item4;
                    }
                });
                let flatEquation=[].concat(...newEquation);
                for(let i=0;i<6;i++){
                    flatEquation=flatEquation.map((item4)=>{
                        if(typeof(item4)==="string"){
                            return item4;
                        }else if(typeof(item4)==="object" && typeof(item4[1])==="number"){
                            return [...Array(item4[1])].map(currElement=>item4[0]);
                        }else{
                            return item4;
                        }
                    });
                    flatEquation=[].concat(...flatEquation);
                }
                //console.log(flatEquation)
                //flatEquation.forEach(itemin=>console.log(itemin));
                if(JSON.stringify(elementNames)==JSON.stringify(flatEquation.sort())){
                    result.push(new Element(currElem.name,currElem.type,currElem.color,currElem.textColor));
                }
            });
        }
    });
    return result;
}