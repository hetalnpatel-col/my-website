let PIN = "";
let SECRET = "";

let currentClassId = "";

/*************************************************
 LOGIN
*************************************************/

function login() {

    PIN = document.getElementById("pin").value.trim();
    SECRET = document.getElementById("secret").value.trim();

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({

            action: "teacherLogin",
            pin: PIN,
            secret: SECRET

        })
    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            document.getElementById("loginBox").style.display = "none";
            document.getElementById("dashboard").style.display = "block";

            loadClasses();

        } else {

            alert(res.message);

        }

    });

}

/*************************************************
 LOAD CLASSES
*************************************************/

function loadClasses() {

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({

            action: "getClasses"

        })
    })

    .then(r => r.json())

    .then(res => {

        let table = "";
        let options = "<option value=''>Select Class</option>";

        console.log(res);
        res.classes.forEach(c => {

            table += `

            <tr>

                <td>${c.className}</td>

                <td>${c.branch}</td>

                <td>${c.semester}</td>

                <td>

                    <button onclick="deleteClass('${c.classId}')">

                        Delete

                    </button>

                </td>

            </tr>

            `;

            options += `

                <option value="${c.classId}">

                    ${c.className}

                </option>

            `;

        });

        document.getElementById("classTable").innerHTML = table;

        document.getElementById("sessionClass").innerHTML = options;

    });

}

/*************************************************
 ADD CLASS
*************************************************/

function addClass() {

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "addClass",

            pin: PIN,
            secret: SECRET,

            className: document.getElementById("className").value,

            branch: document.getElementById("branch").value,

            semester: document.getElementById("semester").value

        })

    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            alert("Class Added Successfully");

            document.getElementById("className").value = "";
            document.getElementById("branch").value = "";
            document.getElementById("semester").value = "";

            loadClasses();

        } else {

            alert(res.message);

        }

    });

}

/*************************************************
 DELETE CLASS
*************************************************/

function deleteClass(id) {

    if (!confirm("Delete this class?"))
        return;

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "deleteClass",

            pin: PIN,
            secret: SECRET,

            classId: id

        })

    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            loadClasses();

        } else {

            alert(res.message);

        }

    });

}

/*************************************************
 START ATTENDANCE
*************************************************/

function startAttendance() {

    currentClassId =
        document.getElementById("sessionClass").value;

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify ({

    action: "startSession",

    pin: PIN,
    secret: SECRET,

    classId: currentClassId,

    subject: document.getElementById("subject").value

})

    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            document.getElementById("attendanceCode").innerHTML =
                res.code;

            document.getElementById("attendanceStatus").innerHTML =
                "ACTIVE";

        }

        else {

            alert(res.message);

        }

    });

}

/*************************************************
 STOP ATTENDANCE
*************************************************/

function stopAttendance() {

    currentClassId =
        document.getElementById("sessionClass").value;

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

    action: "stopSession",

    pin: PIN,
    secret: SECRET,

    classId: currentClassId

})
    })

    .then(r => r.json())

    .then(res => {

        if (res.success) {

            document.getElementById("attendanceCode").innerHTML =
                "------";

            document.getElementById("attendanceStatus").innerHTML =
                "STOPPED";

        }

        else {

            alert(res.message);

        }

    });

}
