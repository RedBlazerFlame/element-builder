# Element Builder


A game built on HTML, CSS, and JavaScript where you start with the elements in the periodic table and start combining them to form compounds and mixtures.




## Background
This project was started by RedBlazerFlame. RedBlazerFlame needed to study chemistry in a way that is fun for them, so RedBlazerFlame decided to make element-builder. It's written in HTML, CSS, and JavaScript (because RedBlazerFlame has the most experience there).

## Documentation
Basically, there is an [elements.json](docs/combinations/elements.json) file, which stores all the elements (where element refers to "elements","compounds", and "mixtures") and their properties and blueprint(the equation used to make it). Elements.json is **Case-Sensitive**, which includes the element names and the element types.

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

where `elementObjN` is an **object** which represents one unique element, and `"elements"` is the property of the `elements.json` file which contains all of the elements.

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
&ast;-Specifically, the string literal "none" , which means that the element becomes a "basic" element(the player starts off with it). **Setting the equation property to "none" will make it a basic element (An element which you start with)** .

#### Properties - name
The name of the element as a string. Note that this is a case-sensitive property(which means that "dna" is different from "DNA" and "dNa"). This is **required**.

##### Name Examples
* `"name":"aluminium" //Element with the name "Aluminium"`
* `"name":"chromium"`
* `"name":"silicon dioxide"`
* `"name":"eukaryotic cell"`

#### Properties  -  type
The type of the element as a string. Note that this is a case-sensitive property. This is **required**.

As of now, there are three possible values for this:
* `"type":"element" //Element of type "element"`
* `"type":"compound" //Element of type "compound"`
* `"type":"mixture" //Element of type "mixture"`

Again, `"type":"Element"` is invalid as the E in element is capitalized (The type property should all be in no-caps. Note that there's nothing stopping you from making a category with capitalized letters, but I recommend using small letters, especially because the current code cannot work with capitalized letters.)

#### Properties - color
The **BACKGROUND** color of the element as a string containing the CSS background property of the element's DOMElement object. This is case sensitive (because CSS is case-sensitive). This is **not required**.

The value can be a:
* String with the Name of the Color
* String with `RGB()`, `RGBA()`, `HSL()`, or `HSLA()`
* A String containing Hexadecimal
* A `linear-gradient()` or `radial-gradient()`
* A `url()` linking to an image
* Or anything supported by the CSS background property

##### Color Examples
* `"color":"red" //Red Background`
* `"color":"#FFAABB" //Pink Background`
* `"color":"linear-gradient(135deg,#444444,#000000)" //Gradient starting from the top-left, fading from dark gray to black`
* `"color":"linear-gradient(90deg,hsl(0,50%,75%,1) 0%,hsl(40,50%,75%,1) 11.1%,hsl(80,50%,75%,1) 22.2%,hsl(120,50%,75%,1) 33.3%,hsl(160,50%,75%,1) 44.4%,hsl(200,50%,75%,1) 55.6%,hsl(240,50%,75%,1) 66.7%,hsl(280,50%,75%,1) 77.8%,hsl(320,50%,75%,1) 88.9%,hsl(360,50%,75%,1) 100%)" //Pastel Rainbow Gradient starting from the left`

#### Properties - textColor
The **TEXT** color of the element as a string containing the CSS color property of the element's DOMElement object. This is case sensitive (because CSS is case-sensitive). This is **not required**.

This value can be a:
* String with the Name of the Color
* String with `RGB()`, `RGBA()`, `HSL()`, or `HSLA()`
* or a String containing Hexadecimal

It **CANNOT** be a:
* A `linear-gradient()` or `radial-gradient()`
* A `url()` linking to an image
* Or anything **NOT** supported by the CSS color property

##### TextColor Examples
* `"textColor":"red" //Red Text`
* `"textColor":"#FFAABB" //Pink Text`

#### Properties - equation
Basically, the equation property tells the `combine.js` file on how to make the element. To be specific, the equation property is an **array of arrays**, containing all the possible ways to make an element (There is a special case where it can be a **string**, to be explained in a later section). For example, in `"equation":[["sodium","chlorine"],["pizza","pepperoni"]]`, the element can be made by either combining sodium and chlorine OR by combining pizza and pepperoni. It should be noted that the order in which things appear in the equation array **does not matter**, meaning that it is commutative (i.e.,  `"equation":[["hydrogen","oxygen"]]` and `"equation":[["oxygen","hydrogen"]]` both represent the same thing).

##### Structure of the "equation" Property
The equation property takes on the following format:
```JavaScript
"equation":[
equation(1),
equation(2),
equation(3),
.
.
.
equation(N-1),
equation(N)
]
```

Where ```equation(N)``` represents an equation (which is represented as an array of elements). If one of ```equation(1), equation(2), equation(3), ..., equation(N-1), equation(N)``` matches with the user input, then combinations.js returns the object name, object type, object color, and object textColor and converts those to object instances of the class Element (the logic for the Element class is stored in the ```elements.js``` file), which the JavaScript can handle.

##### Structure of the Equations Inside the "equation" Property
The "equation" property is an **array** of equations. Each equation is, itself, an array containing the elements used to make the new element. The format of the equations in the equation property is as follows:
```
"equation":[
[element/elementGroup1,element/elementGroup2,element/elementGroup3,...,element/elementGroupN]
]
```

An element is basically a string containing the name of the element to be used as a part of the equation.
A simple example would be saltwater. Consider the following object:
```JavaScript
{
            "name":"saltwater",
            "type":"mixture",
            "equation":[
                ["salt","water"]
            ]
        }
```

This element has the name "saltwater", is of the type "mixture", and is made by combining "salt" and "water".

Now, we can use "saltwater" to make new elements. Consider this arbitrarily chosen new element:
```JavaScript
{
            "name":"sea",
            "type":"mixture",
            "equation":[
                ["saltwater","saltwater"]
            ]
        }
```

This new element has the name "sea", is of the type "mixture", and is made by combining our previously created "saltwater" element to itself.

We can add as many "saltwater" elements as we like, as seen in:
```JavaScript
{
            "name":"ocean",
            "type":"mixture",
            "equation":[
                ["saltwater","saltwater","saltwater","saltwater","saltwater","saltwater","saltwater","saltwater"]
            ]
        }
```

This new element has the name "ocean", is of the type "mixture", and is made by combining 8 copies of "saltwater".

Notice that this might take some time to type. Luckily, there is a way to **repeat** elements or groups of elements a certain number of times.

The syntax for that is:
```JavaScript
[elementName/elementGroup,repeatCount]
```
Which basically represents ```repeatCount``` copies of ```elementName/elementGroup```

So, in ```"equation":[["silicon",["oxygen",2]]]```, the element is made by combining 1 copy of silicon and 2 copies of oxygen.

In our previous example, the element can be simplified in this way:
```JavaScript
{
            "name":"ocean",
            "type":"mixture",
            "equation":[
                [["saltwater",8]] //8 copies of "saltwater"
            ]
        }
```

Basically, the way this works is that ```combine.js``` checks to see if an item is of the format ```[Value(string or array), Number]```, and converts that to an array containing ```Number``` copies of ```Value```. In the final step, ```combine.js``` **flattens** the array, so that it only contains strings representing the names of the elements.

Notice that ```Value``` can be a STRING or ARRAY. This means that you can **nest repetitions**. Consider an element made by the following chemical formula: 10H<sub>2</sub>O + CO<sub>2</sub>

Then, that element's equation can be represented as:
```JavaScript
"equation":[

[
[[["hydrogen",2],"oxygen"],10],
"carbon",["oxygen",2]
]

]
```
Notice that there are two parts: ```[[["hydrogen",2],"oxygen"],10]``` and ```"carbon",["oxygen",2]```. The latter simply represents CO<sub>2</sub>; meanwhile, the former(```[[["hydrogen",2],"oxygen"],10]```) represents 10 copies of ```[["hydrogen",2],"oxygen"]```, which is 10H<sub>2</sub>O, or 20 pieces of hydrogen(because 10&ast;2=20) and 10 pieces of oxygen.

Here are some more examples:
1. O<sub>2</sub> -> `[["oxygen",2]]`
1. KO<sub>2</sub> -> `["potassium",["oxygen",2]]`
1. 2NaCl -> `[[["sodium","chlorine"],2]]`
1. 2SiO<sub>2</sub> -> `[[["silicon",["oxygen",2]],2]]`
1. 2SiO<sub>2</sub> + CO<sub>2</sub> + KO<sub>2</sub> -> `[[["silicon",["oxygen",2]],2] , "carbon",["oxygen",2] , "potassium",["oxygen",2]]`

##### "equation" Property Special Case
There is one special case for the `"equation"` property, which is `"equation":"none"`.

Notice that instead of containing an array of equation arrays, it instead contains the string literal `"none"`.
Whenever the `"equation"` property is set as `"none"` , this means that the element is basic(you start off with it, and there is no way to make the element).

Consider the following example:
```JavaScript
            {
              "name":"hydrogen",
              "type":"element",
              "equation":"none" //Basic Element!
            }
```
As you can see, `"hydrogen"`'s equation property is set to `"none"`. This means that you start the game having the `"hydrogen"` element.

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
