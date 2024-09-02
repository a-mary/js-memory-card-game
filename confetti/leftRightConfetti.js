// var duration = 30 * 1000;
// var duration = 10 * 1000;
var duration = 2 * 1000;
var end = Date.now() + duration;
// var end = Date.now() + (30 * 1000);

let lastFireworkTime = 0;
let fireworkCounter = 0;

let showConfetti = true;

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}


function frameLeftRightConfetti(currentTime) {
    // if (currentTime - lastFireworkTime > 1200) {  // 500ms between fireworks
    // if (currentTime - lastFireworkTime > 1000) {  // 500ms between fireworks
    if (currentTime - lastFireworkTime > 130) {  // 500ms between fireworks
        // if (true) {  // 500ms between fireworks
        //     fireworkCounter++;

        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: {x: 0, y: 0.73},
            disableForReducedMotion: true,
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: {x: 1, y: 0.75},
            disableForReducedMotion: true,
        });

        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            // origin: {x: 0, y: 0.73},
            origin: {x: 0},
            disableForReducedMotion: true,
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            // origin: {x: 1, y: 0.75},
            origin: {x: 1},
            disableForReducedMotion: true,
        });
        lastFireworkTime = currentTime;
    }

    // console.log(currentTime)


    // keep going until we are out of time
    if (Date.now() < end && showConfetti) {
        // if (fireworkCounter < 30) {
        // if (fireworkCounter < 1) {
        requestAnimationFrame(frameLeftRightConfetti);
    } else {
        // fireworkMaxCount = 0;
        // confetti.reset();
    }
}

function initLeftRightConfetti() {
    end = Date.now() + duration;
    lastFireworkTime = 0;
    fireworkCounter = 0


}

function resetLeftRightConfetti() {
    // console.log('rest')
    // confetti.reset();



}

// function setShowConfetti(value) {
//     // showConfetti = value;
//     confetti.reset();
// }
