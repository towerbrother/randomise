import { participants, cognTests, movTests } from "./api.js";

const randomiseButton = document.querySelector(".randomise-button");
const resultWrapper = document.querySelector(".result-wrapper");

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const randomise = () => {
    // step 1: create two groups
    const shuffledParticipants = shuffle(participants);
    const participants1 = [...shuffledParticipants.slice(0, shuffledParticipants.length/2)];
    const participants2 = [...shuffledParticipants.slice(shuffledParticipants.length/2, shuffledParticipants.length)];

    // step 2: assign to each group member a list of tests
    const group1 = participants1.map(x => (
        { 
            "name": `${x}`,
            "cognTests": [...shuffle(cognTests)],
            "movTests": [...shuffle(movTests)]
        }
    ));

    const group2 = participants2.map(x => (
        { 
            "name": `${x}`,
            "cognTests": [...shuffle(cognTests)],
            "movTests": [...shuffle(movTests)]
        }
    ));

    // step 3: display the groups in html
    const group1Html = `<div class="group-wrapper"><h2>Group 1</h2><ul>${group1.map(x => `<li><strong>${x.name}</strong>: <strong>cognTests</strong> [${x.cognTests.join(", ")}] / <strong>movTests</strong> [${x.movTests.join(", ")}]</li>`).join("")}</ul></div>`;
    const group2Html = `<div class="group-wrapper"><h2>Group 2</h2><ul>${group2.map(x => `<li><strong>${x.name}</strong>: <strong>cognTests</strong> [${x.cognTests.join(", ")}] / <strong>movTests</strong> [${x.movTests.join(", ")}]</li>`).join("")}</ul></div>`;
    resultWrapper.innerHTML = `${group1Html}${group2Html}`;
};

randomiseButton.addEventListener("click", randomise);
