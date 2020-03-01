/* Check an answer to a question on the site. */

let challenges = {
    "Social mediaz": {
        "Find Tim's Facebook profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in Tim's bio.",
            "flag": [ 252219629, 1275647269, -950986246, -1092619567, 1009108659, 120247186, -1811358450, 1905063291 ],
        },
        "Find Tim's Twitter profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in Tim's bio.",
            "flag": [ -1284738369, -2132894347, -804238834, -267869104, 1983723238, -595183392, -1806617023, 411476346 ],
        },
        "Find Tim's Reddit profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in Tim's bio.",
            "flag": [ -971382586, 610884631, -403965118, -468223092, 1020951242, -241560144, -1277589624, 2053991720 ],
        },
        "Find Tim's GitHub profile": {
            "difficulty": "Easy",
            "help": "You will find the flag in Tim's bio.",
            "flag": [ -1565240874, 2138259484, -1640369872, -556117414, 508542287, -462511722, 736660485, 472351297 ],
        },
    },

    "Personal information": {
        "What is Tim's full name?": {
            "difficulty": "Easy",
            "help": "Flag should be formatted as <span class='monospace'>flag{firstname lastname}</span>, e.g. <span class='monospace'>flag{Abraham Lincoln}</span>.",
            "flag": [ 1087248789, -966896528, 1124723056, -522472902, 641224337, 302855631, 195621603, 1950266352 ],
        },
        "Find Tim's email address": {
            "difficulty": "Medium",
            "help": "Flag should be formatted as <span class='monospace'>flag{email}</span>, e.g. <span class='monospace'>flag{user@example.com}</span>.",
            "flag": [ 1749497196, -900797865, -721542599, 1928463999, -1983923306, -803313799, -1385460726, -2091524867 ],
        },
        "Where was this photo taken?": {
            "difficulty": "Medium",
            "help": "This picture was taken from inside a restaurant. The flag should be formatted as <span class='monospace'>flag{restaurant}</span>.",
            "flag": [ 1153733438, -1502275302, 62672678, 200638444, -993829380, -1633629449, -937807304, -2113025586 ],
        },
    },

    "Bonus": {
        "Find the GitHub repository where this CTF is being developed": {
            "difficulty": "Medium",
            "help": "You'll find the flag in the <span class='monospace'>README.md</span> file where the code is located.",
            "flag": [ 1819628408, 1045100549, 1427160234, -1540049015, 826166590, 1759412315, -1686643272, -1900162883 ],
        },
    },
};

/*
 * Associate a CSS class with each difficulty level, which will be used to
 * color the difficulty level text.
 */
function difficulty_level_color(difficulty) {
    let diff = difficulty.toLowerCase();
    if ( diff == "easy" ) {
        return "uk-text-success";
    }
    else if ( diff == "medium" ) {
        return "uk-text-warning";
    }
    else if ( diff == "hard" ) {
        return "uk-text-danger";
    }
    else {
        console.warn("Difficulty " + difficulty + " not defined.");
        return "";
    }
}

/* 
 * Add a new challenge to the list of challenges on the
 * page (which can be found in the form with id "challenges").
 */
var max_id = 0
function add_challenge(challenge_title, challenge_data) {
    let challenge_list = document.getElementById("challenges");

    let template = document.getElementById("challenge-template")
                           .content
                           .cloneNode(true);
    let ptags = template.querySelectorAll("p");
    let id = "challenge_" + max_id;
    max_id += 1;

    // Set the challenge title
    ptags[0].textContent = challenge_title;

    // Set the challenge difficulty
    let difficulty = ptags[1].querySelector("span");
    let color = difficulty_level_color(challenge_data["difficulty"]);
    difficulty.textContent = challenge_data["difficulty"];
    difficulty.setAttribute("class", color);

    // Set the help text
    ptags[2].innerHTML = challenge_data["help"];

    // Configure the button to check the flag
    let input_div = template.querySelector(".uk-grid");
    input_div.setAttribute("id", id);
    if ( "flag" in challenge_data ) {
        let check_button = template.querySelector("button");
        let flag = challenge_data["flag"];
        let cmd = "check_answer('"+id+"',["+flag+"])"
        check_button.setAttribute("onClick", cmd);
    }

    challenge_list.appendChild(template);
}

/*
 * Add each of the challenges defined in the challenges object to
 * the page.
 */
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
