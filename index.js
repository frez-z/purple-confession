// congratulations on finding the source code! now pls don't use it to spam the telegram group :(

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function(){
    let placeholder_data = [
        "macam mana nak buat assignment ni",
        "ade problem lah tapi x berani ckp kawan2 i",
        "exam electronic susah lahh",
        "saya tak suka dengan kawan saya",
        "saya rasa saya tak boleh nak buat assignment ni",
        "saya penatlah layan classmate saya",
        "bila nak exam ni",
        "bila nak habeh belajar ni, nak kerja dapat duit",
    ];
    let item = placeholder_data[Math.floor(Math.random()*placeholder_data.length)];

    $("#confession-text").attr("placeholder",item);

    $("#submit").click(function(){
        let token = getCookie("not-so-secret-token");
        const d = new Date();
        let time_remaining = Math.floor((60_000 - (d.getTime() - Number(token)))/1000);
        if (token === "" || ((d.getTime() - Number(token)) >= 60_000)){
            let faculty = $("#faculty").val();
            let text = $("#confession-text").val();
            if (text === "" || text.length < 10) {
                alert("Pendek sangat. Tulis lah panjang sikit. (min 10 characters)");
                return;
            }
            let text_to_send = text
            if (faculty !== "") {
                text_to_send = "[" + faculty + "] :" + text_to_send
            }
            text_to_send = text_to_send.toLowerCase()
            // replace author name with *****
            text_to_send = text_to_send.replaceAll(/farez|frez|rez/g, "*****");

            // replace all bad words with ***** (auto complete jgn attack saya pls)
            text_to_send = text_to_send.replaceAll(/babi|lancau|kimak|gay|bodoh|les|lesbian|kote|konek|tetek|pussy|pantat/g, "*****");

            text_to_send = encodeURIComponent(text_to_send.trim())
            let what_is_this = "bot6172780649:AAF9rOSTtG_ywiqYh67WuYmCs_CFO_-r_E8"
            let chat = "-1001500645742"
            let full_url = "https://api.telegram.org/"+ what_is_this +"/sendMessage?chat_id="+ chat +"&text=" + text_to_send;

            // send message to telegram
            fetch(full_url).then((response) => {
                // check if response is ok
                if (response.ok) {
                    // delete cookie
                    document.cookie = "not-so-secret-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // create new cookie
                    document.cookie = "not-so-secret-token="+ d.getTime() +"; path=/; max-age=31536000";
                    $('#mainForm')[0].reset();
                    alert("sent! terima kasih untuk contribution anda :)");
                } else {
                    alert("Ade problem, cuba lagi nanti");
                }
            });
        } else {
            alert("Tunggu lagi " + time_remaining +" saat sebelum submit satu lagi");
        }
    });
});