const box = document.querySelectorAll(".box")
const startGame = document.querySelector(".splash-screen .start-button")
const splashScreen = document.querySelector(".splash-screen")
const PlayerInput = document.querySelector(".Player-name input")
const playerPlayBotton = document.querySelector(".Player-name button")
const namePlayer = document.querySelector(".name-sction .name-player")
const blocks = document.querySelector(".blocks")
const gameOver = document.querySelector(".game-over")
const win = document.querySelector(".win")
const boxArry = Array.from(box)
let worngTries = document.querySelector(".num-wrong")
const timerSction = document.querySelector(".timer-sction")
worngTries.innerHTML = 0;
let wrongNum = "15"
let duration = 1000;
let nice = 0;
let timer = 60; //per mins




// console.log(rangeNumbrsArry.length)
// let randumNum = Math.floor(Math.random() * boxArry.length)
const rangeNumbrsArry = [...boxArry.keys()]
shuffel(rangeNumbrsArry)

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
                document.querySelector(".sound-win").play()
                win.classList.add("display-flex")
                clearInterval(countDownIntrvel)
                document.querySelector(".background").pause()

            }
        }

    })


})

function stopClick() {
    blocks.classList.add("no-click");

    setTimeout(() => {
        blocks.classList.remove("no-click")

    }, duration)

}

function start() {
    boxArry.forEach((box) => {
        box.classList.add("flip")

        setTimeout(() => {
            box.classList.remove("flip")

        }, duration)

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

        worngTries.innerHTML++
        setTimeout(() => {
            firstBox.classList.remove("flip");
            scoundBox.classList.remove("flip");
        }, duration)

        if (worngTries.innerHTML === wrongNum) {
            gameOver.classList.add("display-flex")
            document.querySelector(".sound-fild").play()
            document.querySelector(".background").pause()
        }
        document.querySelector(".success").play()
    }


}
let play = document.querySelector(".Player-name")
console.log(play)
startGame.addEventListener("click", () => {
    if (play.classList.contains("one")) {
        splashScreen.classList.add("display-non")
        document.querySelector(".background").play()
        //or
        // splashScreen.remove()
        PlayerInput.focus()

    } else {
        document.querySelector(".background").play()
        PlayerInput.classList.add("display-non")
        splashScreen.classList.add("display-non")
    }



})
playerPlayBotton.addEventListener("click", () => {
    namePlayer.innerHTML = PlayerInput.value
    if (play.classList.contains("one")) {
        if (PlayerInput.value !== "") {
            play.style.display = "none"
            start()
            countDown(timer)
        }

    } else {
        if (PlayerInput.classList.contains("display-non")) {
            play.style.display = "none"
            start()
            countDown(timer)
        }
    }



})

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
            document.querySelector(".sound-fild").play()
            document.querySelector(".background").pause()
        }
        if (timer < 10) {
            timerSction.style.color = "red"
        }

    }, 1000)



}