let PIN = "";
let SECRET = "";

function login() {

    PIN = document.getElementById("pin").value.trim();
    SECRET = document.getElementById("secret").value.trim();

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"teacherLogin",
            pin:PIN,
            secret:SECRET
        })
    })
    .then(r=>r.json())
    .then(res=>{

        if(res.success){

            document.getElementById("loginBox").style.display="none";
            document.getElementById("dashboard").style.display="block";

            loadClasses();

        }else{

            alert(res.message);

        }

    });

}

function addClass(){

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({

            action:"addClass",
            pin:PIN,
            secret:SECRET,
            className:document.getElementById("className").value,
            branch:document.getElementById("branch").value,
            semester:document.getElementById("semester").value

        })
    })
    .then(r=>r.json())
    .then(res=>{

        if(res.success){

            alert("Class Added");

            loadClasses();

        }else{

            alert(res.message);

        }

    });

}

function loadClasses(){

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getClasses"
        })
    })
    .then(r=>r.json())
    .then(res=>{

        const table=document.getElementById("classTable");

        table.innerHTML="";

        res.classes.forEach(c=>{

            table.innerHTML+=`
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

        });

    });

}

function deleteClass(id){

    if(!confirm("Delete this class?"))
        return;

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({

            action:"deleteClass",
            pin:PIN,
            secret:SECRET,
            classId:id

        })
    })
    .then(r=>r.json())
    .then(res=>{

        if(res.success){

            loadClasses();

        }else{

            alert(res.message);

        }

    });

}
