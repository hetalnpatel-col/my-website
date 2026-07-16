/*************************************************
 AEC Attendance System
 Student Portal
*************************************************/
let deviceId = localStorage.getItem("AEC_DEVICE_ID");

if (!deviceId) {

    deviceId =
        "DEV-" +
        Date.now() +
        "-" +
        Math.floor(Math.random()*100000);

    localStorage.setItem(
        "AEC_DEVICE_ID",
        deviceId
    );

}
let selectedClassId = "";

function loadClasses() {

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "getClasses"

        })

    })

    .then(r => r.json())

    .then(res => {

        console.log("Classes:", res);

        let options = "<option value=''>Select Class</option>";

        if (res.success && res.classes) {

            res.classes.forEach(c => {

                options += `
                <option value="${c.classId}">
                    ${c.className}
                </option>
                `;

            });

        }

        document.getElementById("classSelect").innerHTML = options;

    });

}
/*************************************************
 Mark Attendance
*************************************************/

function markAttendance() {

    selectedClassId =
        document.getElementById("classSelect").value;

    const enrollment =
        document.getElementById("enrollment").value.trim();

    const code =
        document.getElementById("attendanceCode").value.trim();

    if (selectedClassId === "") {
        alert("Please select a class.");
        return;
    }

    if (enrollment === "") {
        alert("Please enter Enrollment Number.");
        return;
    }

    if (code === "") {
        alert("Please enter Attendance Code.");
        return;
    }

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "markAttendance",

            classId: selectedClassId,

            enrollment: enrollment,

            code: code
            deviceId: deviceId

        })

    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            document.getElementById("studentInfo").innerHTML =
                "<h3>Welcome " + res.student.name + "</h3>";

            document.getElementById("message").innerHTML =
                "<p class='success'>Attendance Marked Successfully</p>";

        }

        else {

            document.getElementById("message").innerHTML =
                "<p class='error'>" + res.message + "</p>";

        }

    });

}
