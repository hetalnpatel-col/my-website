let countdown = 20;
let previousCode = "";

function refreshDisplay() {

    const classId = localStorage.getItem("selectedClass");

    if (!classId) {

        document.getElementById("displayStatus").innerHTML =
            "No class selected";

        return;
    }

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "getAttendanceStatus",

            classId: classId

        })

    })

    .then(r => r.json())

    .then(res => {

        if (!res.active) {

            document.getElementById("displaySubject").innerHTML =
                "No Active Session";

            document.getElementById("displayCode").innerHTML =
                "------";

            document.getElementById("displayCountdown").innerHTML =
                "⏳ Waiting...";

            document.getElementById("displayStatus").innerHTML =
                "Attendance Closed";

            document.getElementById("displayPresent").innerHTML =
                "Present : 0";

            return;

        }

        document.getElementById("displaySubject").innerHTML =
            res.subject;

        document.getElementById("displayStatus").innerHTML =
            "🟢 Session Active";

        document.getElementById("displayPresent").innerHTML =
            "Present : " + res.present;

        if (previousCode !== res.code) {

            previousCode = res.code;

            countdown = 20;

            document.getElementById("displayCode").innerHTML =
                res.code;

        }

    });

}

setInterval(function(){

    if(countdown>0){

        countdown--;

    }

    document.getElementById("displayCountdown").innerHTML =
        "⏳ Expires in " + countdown + " sec";

},1000);

setInterval(refreshDisplay,1000);

refreshDisplay();
