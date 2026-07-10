// Login

async function login() {

    const pin = document.getElementById("pin").value;
    const secret = document.getElementById("secret").value;

    const res = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"teacherLogin",
            pin:pin,
            secret:secret
        })
    });

    const data = await res.json();

    if(!data.success){
        alert(data.message);
        return;
    }

    localStorage.setItem("teacherPin",pin);
    localStorage.setItem("teacherSecret",secret);

    document.getElementById("loginBox").style.display="none";
    document.getElementById("dashboard").style.display="block";

    loadClasses();

}


// Load Classes

async function loadClasses(){

    const res = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"getClasses"
        })
    });

    const data = await res.json();

    let html="";

    data.classes.forEach(c=>{

        html+=`
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

    document.getElementById("classTable").innerHTML=html;

}


// Add Class

async function addClass(){

    const pin=localStorage.getItem("teacherPin");
    const secret=localStorage.getItem("teacherSecret");

    const className=document.getElementById("className").value;
    const branch=document.getElementById("branch").value;
    const semester=document.getElementById("semester").value;

    const res=await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({

            action:"addClass",

            pin:pin,
            secret:secret,

            className:className,
            branch:branch,
            semester:semester

        })
    });

    const data=await res.json();

    alert(data.message || "Saved");

    loadClasses();

}


// Delete Class

async function deleteClass(id){

    if(!confirm("Delete class?")) return;

    const pin=localStorage.getItem("teacherPin");
    const secret=localStorage.getItem("teacherSecret");

    await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify({

            action:"deleteClass",

            pin:pin,
            secret:secret,

            classId:id

        })
    });

    loadClasses();

}
