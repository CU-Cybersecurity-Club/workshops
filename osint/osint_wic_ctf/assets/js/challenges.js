/*
 * Check the flag that a user provides and tell them whether or not
 * the flag was correct.
 */
function check_answer(challenge_id, flag_hash) {
    let input_div = document.getElementById(challenge_id);
    let input = input_div.querySelector("input");

    let guessed_flag_hash = get_hash(input.value);
    let correct_flag = true;
    for ( let ii = 0; ii < guessed_flag_hash.length; ii++ ) {
        correct_flag = correct_flag && (guessed_flag_hash[ii] == flag_hash[ii]);
    }

    // Create an alert div beneath the text input for the flag indicating
    // the results.
    create_result_alert(input_div, correct_flag);

    // Apply CSS to the text input based on whether or not the flag
    // was correct.
    const input_classes = "monospace flag-input uk-form-width-large";
    if ( correct_flag ) {
        input.setAttribute("class", input_classes + " uk-form-success");
        input.setAttribute("disabled", "");
    }
    else {
        input.setAttribute("class", input_classes + " uk-form-danger");
    }
}

/*
 * Display an alert below the challenge saying whether or not the flag that
 * the user guessed was correct.
 */
function create_result_alert(input_div, correct_flag) {
    let alert_div = input_div.querySelector(".result");

    // Clear out contents of the alert_div if it's not currently empty
    while ( alert_div.firstChild ) {
        alert_div.removeChild(alert_div.firstChild);
    }
    alert_div.setAttribute("data-uk-alert", "");

    // Add an icon that allows us to close the alert
    let close_icon = document.createElement("a");
    close_icon.setAttribute("class", "uk-alert-close uk-close");
    close_icon.setAttribute("href", "");
    alert_div.appendChild(close_icon);

    // Add a text node to the alert
    let result_text = document.createElement("p");
    alert_div.appendChild(result_text);

    // Set the styling and contents of the alert
    const alert_classes = "result uk-alert uk-width-small-1-3";
    if ( correct_flag ) {
        alert_div.setAttribute("class", alert_classes + " uk-alert-success");
        result_text.textContent = "Correct!";
    }
    else {
        alert_div.setAttribute("class", alert_classes + " uk-alert-danger");
        result_text.textContent = "Try again";
    }

    return alert_div;
}

/*
 * Compute a SHA-256 hash of a flag.
 */
function get_hash(flag) {
    let hashfn = new sjcl.hash.sha256();
    hashfn.update(flag);
    let hashes = hashfn.finalize();
    return hashes;
}
