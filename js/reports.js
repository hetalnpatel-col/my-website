/*************************************************
 AEC Attendance Reports
*************************************************/

let PIN = "";
let SECRET = "";

/*************************************************
 Load Classes
*************************************************/

window.onload = function () {

    loadClasses();

};

function loadClasses() {

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "getClasses"

        })

    })

    .then(r => r.json())

    .then(res => {

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

        document.getElementById("reportClass").innerHTML = options;

    });

}

/*************************************************
 Generate Report
*************************************************/

function loadReport() {

    const classId =
        document.getElementById("reportClass").value;

    if (classId == "") {

        alert("Please select a class.");

        return;

    }

    PIN = prompt("Enter Teacher PIN");

    if (PIN == null) return;

    SECRET = prompt("Enter Secret Key");

    if (SECRET == null) return;

    fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "getAttendanceReport",

            classId: classId,

            pin: PIN,

            secret: SECRET

        })

    })

    .then(r => r.json())

    .then(res => {

        if (!res.success) {

            alert(res.message);

            return;

        }

        let html = "";

        let present = 0;
        let absent = 0;

        res.report.forEach(s => {

            if (s.status == "Present")
                present++;
            else
                absent++;

            html += `

            <tr>

                <td>${s.enrollment}</td>

                <td>${s.name}</td>

                <td>${s.status}</td>

                <td>${s.time ? new Date(s.time).toLocaleString() : "-"}</td>

            </tr>

            `;

        });

        document.getElementById("reportTable").innerHTML = html;

        document.getElementById("presentCount").innerHTML = present;

        document.getElementById("absentCount").innerHTML = absent;

    });

}
