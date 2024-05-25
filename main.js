
const startGame = document.querySelector(".splash-screen .start-button")
const splashScreen = document.querySelector(".splash-screen")
const PlayerInput = document.querySelector(".Player-name input")
const playerPlayBotton = document.querySelector(".Player-name button")
const namePlayer = document.querySelector(".name-sction .name-player")
const blocks = document.querySelector(".blocks")
const gameOver = document.querySelector(".game-over")
const win = document.querySelector(".win")
const nextLevel = document.querySelector(".level-two");
const levelThree = document.querySelector(".level-three")
const levelFour = document.querySelector(".level-four")
let worngTries = document.querySelector(".num-wrong")
const timerSction = document.querySelector(".timer-sction")
const contanier = document.querySelector(".contanier")
const info = document.querySelector(".info")
const reset = document.querySelector(".reset")
let value = 30
function valInner() {
    worngTries.textContent = value
}
valInner()
let wrongNum = "0"
let duration = 1000;
let nice = 0;
let right = 0;
let timer = 180; //per mins
let play = document.querySelector(".Player-name")
// let pageName = window.location.pathname.split('/')
// console.log(pageName)

levelThree.classList.add("display-non")
levelFour.classList.add("display-non")
// console.log(rangeNumbrsArry.length)
// let randumNum = Math.floor(Math.random() * boxArry.length)



// console.log([...boxArry.keys()])
//or console.log([...Array(boxarry.length).keys()])
function shuffel(arry) {
    let current = arry.length;
    let temp;
    let random;
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        temp = arry[current]
        arry[current] = arry[random]
        arry[random] = temp
    }

    return arry

}




function stopClick() {
    blocks.classList.add("no-click");
    setTimeout(() => {
        blocks.classList.remove("no-click")

    }, duration)

}

function start() {
    const box = document.querySelectorAll(".blocks .box")
    const boxArry = Array.from(box)
    const rangeNumbrsArry = [...boxArry.keys()]
    shuffel(rangeNumbrsArry)
    boxArry.forEach((box, i) => {

        box.style.order = rangeNumbrsArry[i]
        //or el.style.order = Math.floor(Math.random() * boxArry.length)
        box.addEventListener("click", () => {
            box.classList.add("flip")

            let allFlipedBox = boxArry.filter((el) => {
                return el.classList.contains("flip")
            })
            if (allFlipedBox.length === 2) {
                stopClick()
                matchOrNot(allFlipedBox[0], allFlipedBox[1])
            }
            if (boxArry[i].classList.contains("match")) {
                nice++
                if (nice == (boxArry.length / 2)) {
                    reset.style.display = "none"
                    document.querySelector(".sound-win").play()
                    win.classList.add("display-flex")
                    clearInterval(countDownIntrvel)
                    document.querySelector(".background").pause()

                }

            }

        })

    })
    boxArry.forEach((box) => {
        box.classList.add("flip")
        setTimeout(() => {
            box.classList.remove("flip");
            document.querySelector(".laugh").play()
        }, 1500)
    })

}

function matchOrNot(firstBox, scoundBox) {
    if (firstBox.dataset.name === scoundBox.dataset.name) {
        firstBox.classList.remove("flip");
        scoundBox.classList.remove("flip");

        firstBox.classList.add("match");
        scoundBox.classList.add("match");
        document.querySelector(".sparkle").play()
    } else {

        value--
        valInner()
        setTimeout(() => {
            firstBox.classList.remove("flip");
            scoundBox.classList.remove("flip");
        }, duration)

        if (worngTries.innerHTML === wrongNum) {
            document.querySelector(".heart").innerHTML = "&#128148;"
            clearInterval(countDownIntrvel)
            gameOver.classList.add("display-flex")
            reset.style.display = "block"
            document.querySelector(".sound-fild").play()
            document.querySelector(".background").pause()
            localStorage.clear()
        }
        document.querySelector(".success").play()
    }
    if (firstBox.dataset.name === scoundBox.dataset.name) {

        right += 1
    } else {
        right = 0
    }
    if (right === 2) {
        value += 1
        valInner()
        document.querySelector(".plus").classList.add("animatinPlus")
        document.querySelector(".extra-lives").play()
        setTimeout(() => {
            document.querySelector(".plus").classList.remove("animatinPlus")
        }, 1000)

    }
    if (right === 3) {
        timer += 5
        document.querySelector(".plus-five").classList.add("animatinPlus")
        document.querySelector(".extra-time").play()
        setTimeout(() => {
            document.querySelector(".plus-five").classList.remove("animatinPlus")
        }, 1000)
    }
    if (right === 4) {
        right = 0
        value += 1
        timer += 5
        document.querySelector(".plus").classList.add("animatinPlus")
        document.querySelector(".plus-five").classList.add("animatinPlus")
        document.querySelector(".laugh").play()
        setTimeout(() => {
            document.querySelector(".plus").classList.remove("animatinPlus")
            document.querySelector(".plus-five").classList.remove("animatinPlus")
        }, 1000)
    }
}


startGame.addEventListener("click", () => {
    splashScreen.classList.add("display-non")
    PlayerInput.classList.add("anmtion-for-input")
    playerPlayBotton.classList.add("anmtion-for-button")
    document.querySelector(".background").play()
    //or
    // splashScreen.remove()
    PlayerInput.focus()

})


function funny() {
    playerPlayBotton.addEventListener("mousemove", () => {
        if (PlayerInput.value === "") {
            playerPlayBotton.classList.toggle("left");
            document.querySelector(".no-input").play()
        }
    })
}

funny();





playerPlayBotton.addEventListener("click", () => {
    levelOne()
    start()
    namePlayer.innerHTML = PlayerInput.value
    localStorage.setItem("value", JSON.stringify(namePlayer.innerHTML))
    if (PlayerInput.value !== "") {
        play.style.display = "none"
        countDown(timer)
    }
})
let nameValue = localStorage.getItem("value")
if (nameValue) {
    namePlayer.innerHTML = JSON.parse(nameValue)
}
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        playerPlayBotton.click()
    }
})

function countDown() {
    let miunts, scounds;
    countDownIntrvel = setInterval(() => {
        miunts = (Math.floor(timer / 60))
        scounds = (Math.floor(timer % 60))
        miunts = miunts < 10 ? `0${miunts}` : miunts
        scounds = scounds < 10 ? `0${scounds}` : scounds
        timerSction.innerHTML = `${miunts}:${scounds}`

        if (timer > 0) {
            timer--
        } else {
            clearInterval(countDownIntrvel)
            gameOver.classList.add("display-flex")
            reset.style.display = "block"
            document.querySelector(".sound-fild").play()
            document.querySelector(".background").pause()
            localStorage.clear()
        }
        if (timer < 10) {
            timerSction.style.color = "red"
        }

    }, 1000)



}

reset.addEventListener("click", () => {
    localStorage.clear()
})

const block = document.querySelector(".blocks")
function levelOne() {
    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 7; i++) {
            const box = document.createElement("div");
            box.classList.add("box")
            box.dataset.name = i;
            const imgs = document.createElement("img");
            const front = document.createElement("div")
            front.classList.add("front")
            const back = document.createElement("div")
            back.classList.add("back")
            imgs.src = `/image/${i}.jpg`
            back.append(imgs)
            box.append(front, back)
            block.append(box)
        }
    }

}
function levelTwo() {
    nice = 0
    blocks.replaceChildren();
    for (let j = 0; j < 2; j++) {
        for (let i = 8; i < 16; i++) {
            const box = document.createElement("div");
            box.classList.add("box")
            box.dataset.name = i;
            const imgs = document.createElement("img");
            const front = document.createElement("div")
            front.classList.add("front")
            const back = document.createElement("div")
            back.classList.add("back")
            imgs.src = `/image/${i}.jpg`
            back.append(imgs)
            box.append(front, back)
            block.append(box)
        }
    }

}


nextLevel.addEventListener("click", () => {
    right = 0
    win.classList.remove("display-flex")
    nextLevel.classList.add("display-non")
    document.querySelector(".background").play()
    contanier.style.backgroundImage = "url(image/3.jpg)"
    info.style.borderColor = "green"
    levelTwo()
    countDown(timer)
    start()
    blocks.classList.add("two")
    levelThree.classList.remove("display-non")
})


function levelNThree() {
    nice = 0
    blocks.replaceChildren();
    for (let j = 0; j < 2; j++) {
        for (let i = 5; i < 16; i++) {
            const box = document.createElement("div");
            box.classList.add("box")
            box.dataset.name = i;
            const imgs = document.createElement("img");
            const front = document.createElement("div")
            front.classList.add("front")
            const back = document.createElement("div")
            back.classList.add("back")
            imgs.src = `/image/${i}.jpg`
            back.append(imgs)
            box.append(front, back)
            block.append(box)
        }
    }

}
levelThree.addEventListener("click", () => {
    right = 0
    win.classList.remove("display-flex")
    levelThree.classList.add("display-non")
    document.querySelector(".background").play()
    contanier.style.backgroundImage = "url(image/11.jpg)"
    info.style.borderColor = "blue"
    levelNThree()
    countDown(timer)
    start()
    blocks.classList.add("three")
    levelFour.classList.remove("display-non")
})
function levelNFour() {
    nice = 0
    blocks.replaceChildren();
    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < 18; i++) {
            const box = document.createElement("div");
            box.classList.add("box")
            box.dataset.name = i;
            const imgs = document.createElement("img");
            const front = document.createElement("div")
            front.classList.add("front")
            const back = document.createElement("div")
            back.classList.add("back")
            imgs.src = `/image/${i}.jpg`
            back.append(imgs)
            box.append(front, back)
            block.append(box)
        }
    }

}
levelFour.addEventListener("click", () => {
    win.classList.remove("display-flex")
    document.querySelector(".background").play()
    contanier.style.backgroundImage = "url(image/3.jpg)"
    info.style.borderColor = "purple"
    levelNFour()
    countDown(timer)
    start()
    levelFour.classList.add("display-non")
    blocks.classList.add("four")
    if (timer < 90) {
        timer += 50
    }
    if (worngTries.innerHTML < 10) {
        value += 5
        valInner()
    }
})

