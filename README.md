# <h1 align ="center">![logo](https://github.com/RahulBisht001/Color_Picker_ChromeExtension/blob/main/ColorPicker_Logo.png)Color Picker <h1/>

![logo](https://github.com/RahulBisht001/ColorPicker_ChromeExtension/blob/main/Chrome%20Extension%20Wallpaper.jpg)

<h2>Color Picker</h2>



## what is manifest.json file 
___________________
  It is a text file in JSON (JavaScript Object Notation) format that contains 
certain details about the extension you will be developing. Google uses this file 
to acquire details about your extension when you will publish it. There are required,
recommended and optional fields.

It is basically the meta data of your extension



## What is the EyeDropper API?
_____________________________
Many creative applications allow users to pick colors from parts
of the app window or even from the entire screen, typically using an eyedropper metaphor.


### Using the API
To use the API, create an EyeDropper object and then call its open() method.

```JavaScript

const eyeDropper = new EyeDropper();
```
The open() method returns a promise that resolves after the user selects a pixel on the screen, and the
resolved value provides access to the pixel's color in sRGBHex format (#RRGGBB). The promise is rejected 
if the user leaves the eyedropper mode by pressing the esc key.

```JavaScript
try {
  const result = await eyeDropper.open();
  // The user selected a pixel, here is its color:
  const colorHexValue = result.sRGBHex;
} catch (err) {
  // The user escaped the eyedropper mode.
}
```

* Resources :
 1.  [Chrome Docs](https://tinyl.io/801k)
 2.  [MDN Reference](https://tinyl.io/801n)


## Navigator API
   The Navigator interface represents the state and the identity of the user agent.
It allows scripts to query it and to register themselves to carry on some activities.

A Navigator object can be retrieved using the read-only window.navigator property.

* Resources : [MDN Reference](https://tinyl.io/802K)





* ### invertColor() function (popup.js)
__________________________

Source : Stackoverflow

Simple One ✅

``` javaScript
function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

```

### Advance Version 😎

This has a `bw` option that will decide whether to invert to black or white; 
so you'll get more contrast which is generally better for the human eye.

_______________
```javaScript

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
```



#### Explanation of 
(255 - parseInt(hex.slice(0, 2), 16)).toString(16)
|
---> 

1. `hex.slice(0, 2)` extracts the first two characters from the string `hex`,
which is assumed to be a hexadecimal color code. For example, if `hex` is `#FFA500`, then this operation would return `FF`.

2. `parseInt(hex.slice(0, 2), 16)` converts the extracted substring to an integer using base 16 
(i.e., hexadecimal) representation. In the example above, this would return the integer value `255`.

3. `255 - parseInt(hex.slice(0, 2), 16)` subtracts the integer value from `255`, effectively computing the complement of the red component of the color.

4. `.toString(16)` converts the resulting integer value back to a string representation in hexadecimal format. In the example above, this would return `0`, since `255 - 255` equals `0`.


Therefore, the code effectively computes the complement of the red component of a given hexadecimal color code. Note that this assumes that the color code is in the format `"#RRGGBB"`, where `RR`, `GG`, and `BB` represent the red, green, and blue components, respectively. If the code is used with a different format, it may produce unexpected results.




#### Explanation of padZero Function

The function works as follows:

1. `len = len || 2;` sets the value of `len` to 2 if it is not specified or is falsy (e.g., undefined, null, 0).


2. `var zeros = new Array(len).join('0');` creates a new array of length `len` filled with the string "0", and then joins the elements of the array with an empty separator to form a string of `len` zeros. For example, if `1en` is 5, then `zeros` would be `"00000"`.


3. `(zeros + str).slice(-len)` concatenates `zeros` and `str`, and then extracts the last `len` characters of the resulting string. If `str` is shorter than `len`, the remaining characters are filled with zeros from `zeros`. If `str` is longer than `len`, the function returns the last `len` characters of `str`. For example, if `str` is `"7"` and `len` is 5, then the function would return "00007"`. If `str` is `"123456"` and `len` is 3, then the function would return "456"`.


_____________________________________________________________________________________________

* As I don't have a Chome Developer Account so i can't publish it on Chrome web Store. 
  Here are Some Screenshot of the Extesnsion
[ScreenShots of the Extension's Woring](https://github.com/RahulBisht001/ColorPicker_ChromeExtension/tree/main/ScreenShots)


Developer : RahulB 

Contact : rahulbishtrb1012@gamil.com
