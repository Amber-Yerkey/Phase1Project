document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById("random")
    const listItem = document.getElementsByClassName("abil")
    const newAttr = document.getElementsByClassName("charLoop")
    const stats = [15, 14, 13, 12, 10, 8]

    //change fetch to next item
    function changeFetch() {
        //loops through all p elements, grabs the id, sends the id to the fetch for the url
        for (const attrList of newAttr) {
            let newID = attrList.id
            fetchQuest(newID, attrList)
        }
    }

    //grabs the information from the API, attaches id to the end
    function fetchQuest(newID, attrList) {
        fetch("https://www.dnd5eapi.co/api/" + newID)
            .then((resp) => resp.json())
            .then(char => { randomAttr(char, attrList) })
            .catch(function (error) {
                console.log(error)
            })
    }

    //creates the element with a random name from object pulled
    function randomAttr(char, attrList) {
        //counts the length of the current object in order to create limit for math.random
        let objLength = Object.keys(char.results).length
        alignNum = Math.floor(Math.random() * objLength);
        //will check if p element already has a span child element. Will create one and change text content if not, will just change text if it does.
        if (attrList.childElementCount === 1) {
            const refreshAttr = attrList.lastElementChild
            refreshAttr.textContent = char.results[alignNum].name
            attrList.append(refreshAttr)
        }
        else {
            let newAlignSpan = document.createElement("span")
            newAlignSpan.textContent = char.results[alignNum].name
            attrList.append(newAlignSpan)
        }
    }

    function shuffleAbilStats() {
        //shuffles the ability score array
        let shuffledStats = stats.sort((a, b) => 0.5 - Math.random())
        return shuffledStats
    }

    //lists all saved characters
    function listChar(newName) {
        //console.log(newName)
        let newList = document.createElement('li')
        newList.textContent = newName.firstN + " " + newName.lastN
        document.getElementById("savedChars").appendChild(newList)

        let newId = document.createAttribute("Id")
        newId.value = newName.id
        newList.setAttributeNode(newId)
        newList.addEventListener('click', () => { reviveChar(newName) })
    }


    function reviveChar(newName) {
        // grab value from object that is equal to the id from the html element
        //if I console log newName, I get all info for the character clicked
        //need to loop through all attributes and return the obj value for each
        for (const reviveList of listItem) {
            if (reviveList.childElementCount === 1) {
                //looks for span and then sets new numbers without a new span if it already exists
                const reviveListText = reviveList.lastElementChild
                let reviveId = reviveList.id
                reviveListText.textContent = newName[reviveId]
                reviveList.append(reviveListText)
            } else {
                //if span does not exist yet, creates and then gives one of the numbers from the new random array
                const newReviveList = document.createElement("span")
                let reviveId = reviveList.id
                newReviveList.textContent = newName[reviveId]
                reviveList.append(newReviveList)
            }
        }

        for (const reviveListAttr of newAttr) {
            if (reviveListAttr.childElementCount === 1) {
                //looks for span and then sets new numbers without a new span if it already exists
                const reviveListTextAttr = reviveListAttr.lastElementChild
                let reviveIdAttr = reviveListAttr.id
                reviveListTextAttr.textContent = newName[reviveIdAttr]
            } else {
                const newReviveListAttr = document.createElement("span")
                let reviveIdAttr = reviveListAttr.id
                newReviveListAttr.textContent = newName[reviveIdAttr]
                reviveListAttr.append(newReviveListAttr)
            }
        }
    }

    //calls the json from characters in order to make list
    function savedChars() {
        fetch('http://localhost:3000/characters')
            .then((resp) => resp.json())
            .then(charNames => charNames.forEach(newName => listChar(newName)))
            .catch(function (error) {
                window.alert(error)
            })
    }

    //send post to json server in order to save character
    function saveCharacter(newChar) {
        fetch('http://localhost:3000/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChar)
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
    }


    button.addEventListener('click', (e) => {
        //calls the randomizer in the array
        i = -1
        shuffledStats = shuffleAbilStats()
        for (const abil of listItem) {
            i++
            if (abil.childElementCount === 1) {
                //looks for span and then sets new numbers without a new span if it already exists
                const refreshText = abil.lastElementChild
                refreshText.textContent = shuffledStats[i]
                abil.append(refreshText)
            } else {
                //if span does not exist yet, creates and then gives one of the numbers from the new random array
                let newText = document.createElement("span")
                newText.textContent = shuffledStats[i]
                abil.append(newText)
            }
        }
        changeFetch()
    })

    //blurs the logo when mouse in and then removes blur moving out
    const logo = document.getElementById("logo")
    logo.addEventListener('mouseenter', () => {
        logo.style.filter = 'blur(3px)'
    })

    logo.addEventListener('mouseleave', () => {
        logo.removeAttribute("style")
    })

    //submit form & save character
    document.addEventListener('submit', (e) => {
        //e.preventDefault()
        if (document.getElementById("str").childElementCount === 1) {
            let newChar = {
                firstN: e.target.firstN.value,
                lastN: e.target.lastN.value,
                str: document.getElementById("str").lastElementChild.textContent,
                dex: document.getElementById("dex").lastElementChild.textContent,
                con: document.getElementById("con").lastElementChild.textContent,
                int: document.getElementById("int").lastElementChild.textContent,
                wis: document.getElementById("wis").lastElementChild.textContent,
                cha: document.getElementById("cha").lastElementChild.textContent,
                alignments: document.getElementById("alignments").lastElementChild.textContent,
                classes: document.getElementById("classes").lastElementChild.textContent,
                races: document.getElementById("races").lastElementChild.textContent,
                languages: document.getElementById("languages").lastElementChild.textContent,
                traits: document.getElementById("traits").lastElementChild.textContent,
                "magic-items": document.getElementById("magic-items").lastElementChild.textContent,
                equipment: document.getElementById("equipment").lastElementChild.textContent,
                proficiencies: document.getElementById("proficiencies").lastElementChild.textContent,
                skills: document.getElementById("skills").lastElementChild.textContent,
            }
            saveCharacter(newChar)
            e.target.firstN.value = ""
            e.target.lastN.value = ""
            window.alert("Character Saved!")
        } else {
            window.alert('Please create a character first!')
        }
    })
    //load all saved characters into a list
    savedChars()






})

// function callMeMaybe() {
//     fetch("http://localhost:3000/characters")
//         .then((resp) => resp.json())
//         .then(data => { console.log(data) })
// }

// callMeMaybe()
