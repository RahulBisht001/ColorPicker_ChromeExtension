const btn = document.querySelector('.changeColorBtn')
const colorGrid = document.querySelector('.color-grid')
const colorValue = document.querySelector('.color-value')
const copyText = document.querySelector('.copyText')


btn.addEventListener('click', async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    /**
     * ! chrome.scripting
     * 
     * ? Use the chrome.scripting API to execute script in different contexts.
     * 
     * * To use the chrome.scripting API, declare the "scripting" permission 
     * * in the manifest plus the host permissions for the pages to inject scripts into.
     * * Use the "host_permissions" key or the activeTab permission, which grants temporary host permissions.
     * * The following example uses the activeTab permission.
     * 
     *  ? __Usage
     * * You can use the chrome.scripting API to inject JavaScript and CSS into websites.
     * * This is similar to what you can do with content scripts. But by using the chrome.
     * * scripting namespace, extensions can make decisions at runtime.
     * 
     * ? .executeScript() is method in chrome.scripting API
     */


    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: pickColor,
    }, async (injectionResults) => {
        const [data] = injectionResults
        console.log(data)

        /**
         * ! Because sometime it may happen that the user exit from the color 
         * ! picking process in between , so the result value will be null.
         * ! so in this case we can't send result
         */
        if (data.result) {
            const color = data.result.sRGBHex
            colorGrid.style.backgroundColor = color

            /**
             * ? sometime it will happen that color of the text( which will show color like #ffffff)
             * ? and color are somehow similar due to which text is not properly visible
             * 
             * todo_   That's why we need invertColor() function 
             */
            colorValue.style.color = invertColor(color)
            colorValue.innerHTML = color

            try {
                await navigator.clipboard.writeText(color)
                // console.log(color)
                copyText.innerText = "Color Code Copied Successfully"
            }
            catch (err) {
                console.error(err)
            }
        }
    })
})


/**
 * ! Injecting this Function using chrome.scripting.executeScript() method
 * 
 * * This Function is running in the context of the web page
 * * so it can't use the variables of this particular script
 * * If we want to use these local variables in the function 
 * * we need to pass the 
 *  ? args Property in the executeScript() method
 */


const pickColor = async () => {

    /**
     * ? Picking colors of any pixel on the screen with the EyeDropper API
     * ? The EyeDropper API enables authors to use a browser-supplied eyedropper
     * ? in the construction of custom color pickers.
     * 
     * todo__    refer Readme
     * * Resources : 1.  https://tinyl.io/801k
     * *             2. https://tinyl.io/801n
     */
    try {
        const eyeDropper = new EyeDropper()
        const selectedColor = await eyeDropper.open()
        return selectedColor

    }
    catch (err) {
        console.log(err)
        console.log("Error Bro")
    }
}


function invertColor(hex) {

    if (hex.indexOf('#') === 0)
        hex = hex.slice(1)

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3)
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]

    if (hex.length !== 6)
        throw new Error('Invalid HEX color.')

    // invert color components
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    return '#' + padZero(r) + padZero(g) + padZero(b)

}

/**
 * ! I have little Doubts about this padZero Function
 */

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
