/* Check an answer to a question on the site. */

let challenges = {
    "Social mediaz": {
        "Find their Facebook profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in this person's bio",
        },
        "Find their Twitter profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in this person's bio",
        },
        "Find their Reddit profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in this person's bio",
        },
        "Find their GitHub profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in this person's bio",
        },
    },
    "Personal information": {
        "What's this person's name?": {
            "difficulty": "Easy",
            "help": "Flag should be formatted as <span class='monospace'>flag{firstname lastname}</span>, e.g. <span class='monospace'>flag{Abraham Lincoln}</span>."
        },
        "Find their email address": {
            "difficulty": "Medium",
            "help": "Flag should be formatted as <span class='monospace'>flag{email}</span>, e.g. <span class='monospace'>flag{user@example.com}</span>.",
        },
        "Find their phone number": {
            "difficulty": "Medium",
            "help": "Flag should be formatted as <span class='monospace'>flag{XXX-XXX-XXXX}</span>, e.g. <span class='monospace'>flag{123-456-7890}</span>.",
        },
        "Where was this photo taken?": {
            "difficulty": "Medium",
            "help": "This picture was taken from inside a restaurant. The flag should be formatted as <span class='monospace'>flag{restaurant}</span>.",
        }
    }
};

let challenge_difficulties = {
    "easy": "uk-text-success",
    "medium": "uk-text-warning",
    "hard": "uk-text-danger"
};

function add_challenge(challenge_title, challenge_data) {
    let challenge_list = document.getElementById("challenges");

    let template = document.getElementById("challenge-template").content.cloneNode(true);
    let ptags = template.querySelectorAll("p");

    // Set the challenge title
    ptags[0].textContent = challenge_title;

    // Set the challenge difficulty
    let difficulty = ptags[1].querySelector("span");
    let color = challenge_difficulties[challenge_data["difficulty"].toLowerCase()];
    difficulty.textContent = challenge_data["difficulty"];
    difficulty.setAttribute("class", color);

    // Set the help text
    ptags[2].innerHTML = challenge_data["help"];

    challenge_list.appendChild(template);
}

Object.keys(challenges).forEach(function(challenge_section_title) {
    let challenge_list = document.getElementById("challenges");

    let line = document.createElement("hr");
    line.setAttribute("class", "uk-article-divider");
    challenge_list.appendChild(line);

    let title = document.createElement("h1");
    title.setAttribute("class", "uk-article-title");
    title.textContent = challenge_section_title;
    challenge_list.appendChild(title);

    Object.keys(challenges[challenge_section_title]).forEach(function(key) {
        add_challenge(key, challenges[challenge_section_title][key]);
    });
});
