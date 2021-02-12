var arr_responses = [];

function addResponse()
{
    const responses = document.getElementById('responses');

    var response_element = document.createElement('div');
    response_element.classList.add('response_element');

    var emoji = document.createElement('p');
    emoji.classList.add('emoji');
    emoji.innerHTML = "1️⃣";

    var input_text = document.createElement('input');
    input_text.classList.add('input_response')
    input_text.type = "text";
    input_text.style = "width: 100%;";
    input_text.placeholder = "réponse";
    input_text.oninput = update

    var btn_remove = document.createElement('button');
    btn_remove.classList.add('remove');
    btn_remove.classList.add('poll_button');
    btn_remove.type = "button";
    btn_remove.onclick = () => {removeResponse(response_element)};

    response_element.appendChild(emoji);
    response_element.appendChild(input_text);
    response_element.appendChild(btn_remove);

    arr_responses.push(response_element);

    responses.appendChild(response_element);
    update();
}

function removeResponse(e)
{
    e.remove();
    arr_responses.splice(arr_responses.indexOf(e), 1);
    update();
}

window.onload = () => {
    addResponse();
    addResponse();
}

function order()
{
    const responses = document.getElementById('responses');
    var response_elements = responses.children;

    for (var i = 0; i < response_elements.length; i++)
    {
        var e = response_elements[i];

        if (e.classList.contains('response_element'))
        {
            e.id = "response"+i;
            e.getElementsByClassName('input_response')[0].name = "response"+i;

            e.getElementsByClassName('emoji')[0].innerHTML = getEmoji(i);

            if (i < 2) {e.getElementsByClassName('remove')[0].disabled = true;}
        }
        else
        {
            removeResponse(e);
            return;
        }
    }

    document.getElementById('add_btn').disabled = response_elements.length > 9;
}

function update()
{
    order();
    const messageArea = document.getElementById("message");
    var submitButton = document.getElementById("submit");

    var disableSubmit = (!messageArea || messageArea.value == "");

    const responses = document.getElementById('responses');
    var response_elements = responses.children;

    for (var i = 0; i < response_elements.length; i++)
    {
        var e = response_elements[i];

        if (e.classList.contains('response_element'))
        {
            var response = e.getElementsByClassName('input_response')[0];
            disableSubmit = disableSubmit || (!response || response.value == "");
        }
        else
        {
            removeResponse(e);
            return;
        }
    }

    submitButton.disabled = disableSubmit;
}

function getEmoji (i)
{
    switch (i)
    {
        case 0: 
            return "1️⃣";
            break;

        case 1: 
            return "2️⃣";
            break;

        case 2: 
            return "3️⃣";
            break;

        case 3: 
            return "4️⃣";
            break;

        case 4: 
            return "5️⃣";
            break;

        case 5: 
            return "6️⃣";
            break;

        case 6: 
            return "7️⃣";
            break;

        case 7: 
            return "8️⃣";
            break;

        case 8: 
            return "9️⃣";
            break;

        case 9: 
            return "🔟";
            break;

        default: 
            return "";
            break;
    }
}