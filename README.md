# Phase1Project
Flatiron Project Phase 1


User Story
I want to create a randomized dungeons and dragons character creator. I would like for there to be basic formatting and a button that, when pressed, will randomly generate a new character using the public API https://www.dnd5eapi.co/.

BasicExample.png is attached with a /very/ rough drawing. Logo for dungeons and dragons at the top. Atrributes listed underneath in a list format. The bottom has the button to click for a new character. This button could end up being at the top if there are a lot of attributes available to pull. 

The 3 event listeners will be:
-click for random character
-DOMContentLoaded
-MouseOver for the logo

Stretch goal to provide persistance would be to have a saving option. This will make a new object that is a collection of what was saved. There will be a dropdown to select the character again to fill out the form with those attributes.


1. First day I played with the API to find out what information it had. Played with the idea of having a monster dating site but it doesn't include pictures :(
    Then settled on the idea of a character creator after seeing the information available. I then created a basic drawing of the layout of the site.
    Next, I looked up fun images for the site and wrote out some things I would like to have on it based on what the API has available and what I thought was important to a character (even though I didn't include everything because wayyy too many rules for characters).
    I wanted to include:
        -Ability scores
        -Alignment
        -Class
        -Race
        -A magic item

2. Second day I set up the basics for the site. I went to github and made a repository and then used the terminal to create the js, css, and html. Next, I added in the html boilerplate and linked the js and css to the html doc. I found a nice picture for the site and included it on git hub then linked to it. I made some basics in the html like listing the attributes and then made the basic fetch request for the API. 

3. I started with the task of random ability scores. I ran into several issues with scope ans trying to make sure the text cleared after the first run so that the runs after wouldn't keep adding more numbers. I found on MDN the math.random() and made it into a function so that I can shuffle the numbers. I also kept running into putting a loop into a loop while trying to put the numbers with the html list items. I was trying to iterate through the list items while assigning one of the numbers from the array. This was doing the inside loop 6 times and the outside loop 6 times which... was not intended. I had to finish up and did not get to resolve these issues on day 3.

4. I was able to fix the looping issue by not looping for the variable i that gave each list item their number. I instead made i a variable and then just increased the i by 1 every time it looped through a list item. Feels obvious in hindsight but couldn't figure that one out. Next, I created the alignment attribute. It grabs a random number based on the object length and then returns the text using that objects id. This makes the text random from the object. Also, I had to split it up into an if statement to make sure it already ran so it does not create another p element.
    Lastly, I spent time trying to make the createAttr function as agnostic as possible in order to try and use that same function for all of my attributes. Not sure if it is yet possible but will be more efficient then creating a function for each. Goal is for the fetch to change based on the element id of the current iteration.

5. Trying to put some basic css styling on the page. Having a lot of trouble putting things where I would like them. Changed my mind a little bit about the layout depending on what I could accomplish. Also found a cool dropdown navigation so changed some ideas of the layout.
    My biggest struggle when trying to figure out how to use things like flexbox and grid in css is that I didn't realize I had to use "display: flex" or anything like that in the CSS in order to tell it that's what I wanted to use. I thought these were built in to CSS and just by using the language like "justify-content" I could reference it. So, I was very confused why those key words weren't working. I thought my issue was with how I was targeting elements through the CSS, not with the keywords. I want to keep this in mind in order to do a future technical blog about it because if I had that issue, I know others may have as well. Everytime I looked up stuff for CSS, and why it may not be working, that was never mentioned. Also, none of the training guides I came across mention this important detail as well.
    After I figured that out, I had much more success. I was able to create cards for the page by going to bootstrap website. They have examples on their site and I used the inspector to see how it was set up. I was able to use key words in order for my page to display cards as well. And then I played around with the settings to make them my own. And even targeted them with my own CSS in order to make some small adjustments. 
