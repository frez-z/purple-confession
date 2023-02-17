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
    $("#submit").click(function(){
        let token = getCookie("not-so-secret-token");
        const d = new Date();
        if (token !== "" && d.getTime() - Number(token) >= 60_000){
            let faculty = $("#faculty").val();
            let name = $("#name").val();
            let text = $("#confession-text").val();
            if (text === "" || text.length < 10) {
                alert("Too Short!");
                return;
            }
            let text_to_send = ""
            if (faculty === "" || name === "") {
                text_to_send = "Anonymous: " + text;
            }
            if (faculty !== "" && name !== "") {
                text_to_send = "( " + faculty + " ) " + name + " : " + text;
            }
            text_to_send = encodeURIComponent(text_to_send.trim())
            let what_is_this = "bot6172780649:AAF9rOSTtG_ywiqYh67WuYmCs_CFO_-r_E8"
            let chat = "-1001500645742"
            let url = "https://api.telegram.org/"+ what_is_this +"/sendMessage?chat_id="+ chat +"&text=" + text_to_send;

            // send message to telegram
            fetch(url)

            // delete cookie
            document.cookie = "not-so-secret-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // create new cookie
            document.cookie = "not-so-secret-token="+ d.getTime() +"; path=/; max-age=31536000";
        } else {
            alert("Please wait 1 minute before submitting another confession");
        }
    });
});