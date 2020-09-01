# element-builder
A game built on HTML, CSS, and JavaScript where you start with the elements in the periodic table and start combining them to form compounds and mixtures.

## Background
This project was started by RedBlazerFlame. RedBlazerFlame needed to study chemistry in a way that is fun for them, so RedBlazerFlame decided to make element-builder. It's written in HTML, CSS, and JavaScript (because RedBlazerFlame has the most experience there).

## How It Works
Basically, there is an `elements.json` file, which stores all the elements (where element refers to "elements","compounds", and "mixtures") and their properties and blueprint(the equation used to make it). Elements.json is **Case-Sensitive**, which includes the element names and the element types.

### Elements.json Structure
The structure of the `elements.json` is as follows:
```JavaScript
{
"elements":[
elementObj1,
elementObj2,
elementObj3,
.
.
.
elementObjN
]
}
```

where `elementObjN` is an object which represents the element itself.

### ElementObject Structure
The structure of the Element Object is as follows:
```JavaScript
{
              "name":/*Name of the element, as a String*/,
              "type":/*The type of the element, as a String(ex. "element","compound","mixture",etc...)*/,
              "color":/*OPTIONAL: The background color of the element, as a String (supports linear-gradient() and radial-gradient())*/,
              "textColor":/*OPTIONAL: The text color of the element, as a String (does not support linear-gradient() or radial-gradient()*/,
              "equation":/*An array of arrays containing all possible equations OR the string "none" (which represents a basic element, which the user starts with)*/
            }
```
The five properties can be summarized as follows:
<table>
  <tr><th><b>Element Name</b></th><th>Case-Sensitive</th><th>Value Type Accepted</th><th>Required</th></tr>
  <tr><td><b>Name</b></td><td style="background-color:#55FF55;">Yes</td><td>String</td><td style="background-color:#55FF55;">Yes</td></tr>
  <tr><td><b>Type</b></td><td style="background-color:#55FF55;">Yes</td><td>String</td><td style="background-color:#55FF55;">Yes</td></tr>
  <tr><td><b>Color</b></td><td style="background-color:#55FF55;">Yes</td><td>String (Representing the CSS "background" property of the element)</td><td style="background-color:#FF5555;">No</td></tr>
  <tr><td><b>TextColor</b></td><td style="background-color:#55FF55;">Yes</td><td>String (Representing the CSS "color" property of the element)</td><td style="background-color:#FF5555;">No</td></tr>
  <tr><td><b>Equation</b></td><td style="background-color:#55FF55;">Yes</td><td>Array or String*</td><td style="background-color:#55FF55;">Yes</td></tr>
</table>
&ast;-Specifically, the string literal "none" , which means that the element becomes a "basic" element(the player starts off with it)

#### Properties - Name
The name of the element as a string. Note that this is a case-sensitive property(which means that "dna" is different from "DNA" and "dNa").



#### Example 1 - Carbon Dioxide
```JavaScript
            {
              "name":"carbon dioxide",
              "type":"compound",
              "equation":[
                ["carbon",["oxygen",2]]
              ]
            }
```

In this example, we have an element called *"Carbon Dioxide"*, which is of the type *"compound"*.
There is only one element in the "equation" array, which means that there is only one way to make Carbon Dioxide, which is using one "carbon" and two "oxygen".

Note that `[item,N]` represents N copies of `item`. Here, item can be a string containing the name of the element or an array containing a pattern to repeat.
So, 2H<sub>2</sub>O can be written as `[["oxygen",["hydrogen",2]],2]`
