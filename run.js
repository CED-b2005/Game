const div_character = document.getElementById("character");
const character = document.getElementById("img-character");
const img_character = ['11zon_1 (2).png', '11zon_2.png', '11zon_3.png', '11zon_4.png', '11zon_5.png', '11zon_6.png', '11zon_7.png', '11zon_8.png', '11zon_9.png', '11zon_10.png']
const catus = document.getElementById("catus");
const score = document.getElementById('score');
const dpgameOver = document.getElementById('gameOver')

const style_character = getComputedStyle(div_character)
const style_catus = getComputedStyle(catus)

var x = 0
var s = 0;
const S = 100;
const t = 10;
var v = 0.2;
var v_increas = 0.075
var v_px = 0;
var timeLoopMother = 1;
var timeLoopChild = 0;
var device_width;
var character_width = 140;

var gameScore = 0;
var scoreIncreas = 1;
var checkGameOver = false;

function gameOver() {
    if ((parseFloat(style_character.right) - parseFloat(style_catus.right)) < parseFloat(style_catus.width) + 5 &&
        (parseFloat(style_character.right) - parseFloat(style_catus.right)) > -(parseFloat(style_character.width) - 30) &&
        (parseFloat(style_character.top) - parseFloat(style_catus.top)) > -80) {

        return true
    } else {
        return false
    }
}

function runGame() {
    //run
    setInterval(() => {
            if (checkGameOver == false) {
                if (x > img_character.length - 1) {
                    x = 0;
                } else {
                    character.src = img_character[x];
                    x++
                }
            }
        }, 50)
        //run

    //catus
    setInterval(() => {
        if (checkGameOver == false) {
            dpgameOver.style.display = "none"
            device_width = window.innerWidth;
            checkGameOver = gameOver();
            if (s <= S) {
                catus.style.right = `${s+=v}%` // s
                v_px = device_width * v

            } else {
                s = 0;
                timeLoopChild++
                if (timeLoopChild >= timeLoopMother) {
                    timeLoopChild = 0;
                    timeLoopMother++;
                    v += v_increas;
                    character_width += 5;
                    scoreIncreas += 2;
                }

            }
        } else {
            dpgameOver.style.display = 'block'

        }
    }, t)

    //jump
    document.addEventListener('keydown', function(event) {
        if (event.key == " " && style_character.top == `${200}px` && checkGameOver == false) {
            setTimeout(() => {
                div_character.style.top = `${200}px`;
            }, (character_width / v_px) * 1100);
            div_character.style.top = `${50}px`;
        }
    })

    document.body.addEventListener('tounchstart', function() {
            if (style_character.top == `${200}px` && checkGameOver == false) {
                setTimeout(() => {
                    div_character.style.top = `${200}px`;
                }, (character_width / v_px) * 1100);
                div_character.style.top = `${50}px`;
            }
        })
        //jump

    //score
    setInterval(() => {
            if (checkGameOver == false) {
                score.innerHTML = `Score:  ${gameScore}`;
                gameScore += scoreIncreas
            }
        }, 200)
        //score


    document.addEventListener('keydown', function(event) {
        if (event.key = " " && checkGameOver == true) {
            checkGameOver = false;
            character_width = 140;
            gameScore = 0;
            scoreIncreas = 1;
            x = 0
            s = 0;
            S = 100;
            t = 10;
            v = 0.2;
            v_increas = 0.075
            v_px = 0;
            timeLoopMother = 1;
            timeLoopChild = 0;
            catus.style.right = 0;
            runGame()

        }
    })
}

runGame()

// console.log(style.top);
// console.log(0)