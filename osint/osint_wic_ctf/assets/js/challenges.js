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
    let result = input_div.querySelector(".result");
    while ( result.firstChild ) {
        result.removeChild(result.firstChild);
    }
    result.setAttribute("class", "uk-alert");
    result.setAttribute("data-uk-alert", "");

    let close_icon = document.createElement("a");
    close_icon.setAttribute("class", "uk-alert-close uk-close");
    close_icon.setAttribute("href", "");
    result.appendChild(close_icon);

    let result_text = document.createElement("p");
    result.appendChild(result_text);

    // Apply CSS to the text input based on whether or not the flag
    // was correct.
    const input_classes = "monospace uk-form-width-large";
    const result_classes = "uk-alert uk-width-small-1-3";
    if ( correct_flag ) {
        input.setAttribute("class", input_classes + " uk-form-success");
        input.setAttribute("disabled", "");
        result.setAttribute("class", result_classes + " uk-alert-success");
        result_text.textContent = "Correct!";
    }
    else {
        input.setAttribute("class", input_classes + " uk-form-danger");
        result.setAttribute("class", result_classes + " uk-alert-danger");
        result_text.textContent = "Try again";
    }
}

function get_hash(flag) {
    let hashfn = new sjcl.hash.sha256();
    hashfn.update(flag);
    let hashes = hashfn.finalize();
    return hashes;
}
