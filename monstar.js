const monsters = document.querySelectorAll(".monster");

monsters.forEach((monster) => {
  let isDragging = false;

  let offsetX = 0;
  let offsetY = 0;

  monster.addEventListener("pointerdown", (event) => {
    isDragging = true;

    const monsterBox = monster.getBoundingClientRect();

    offsetX = event.clientX - monsterBox.left;
    offsetY = event.clientY - monsterBox.top;

    monster.setPointerCapture(event.pointerId);

    monster.style.zIndex = "1000";
  });

  monster.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const stage = document.querySelector(".monster-stage");

    const stageBox = stage.getBoundingClientRect();

    let newX = event.clientX - stageBox.left - offsetX;
    let newY = event.clientY - stageBox.top - offsetY;

    monster.style.left = `${newX}px`;
    monster.style.top = `${newY}px`;

    monster.style.bottom = "auto";
    monster.style.right = "auto";
  });

  monster.addEventListener("pointerup", (event) => {
    isDragging = false;

    monster.releasePointerCapture(event.pointerId);

    monster.style.zIndex = "10";
  });

  monster.addEventListener("pointercancel", () => {
    isDragging = false;

    monster.style.zIndex = "10";
  });

  monster.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
});


// Monking animation state

const monking = document.getElementById("monking");
const monkingIdle = document.getElementById("monking-idle");
const monkingPlaying = document.getElementById("monking-playing");

let monkingIsPlaying = false;

monking.addEventListener("dblclick", () => {
  if (monkingIsPlaying === false) {
    // Switch from default Monking to animated Monking

    monkingIdle.style.display = "none";
    monkingPlaying.style.display = "block";

    monkingPlaying.currentTime = 0;
    monkingPlaying.play();

    monkingIsPlaying = true;
  } else {
    // Switch from animated Monking back to default Monking

    monkingPlaying.pause();
    monkingPlaying.currentTime = 0;
    monkingPlaying.style.display = "none";

    monkingIdle.style.display = "block";

    monkingIsPlaying = false;
  }
});