const newClassForm = document.querySelector("#newClassForm");

newClassForm.addEventListener("submit",e=>{
    e.preventDefault();
    const formObj = {
        title: newClassForm.querySelector("input[name=title]").value,
        credits: newClassForm.querySelector("input[name=credits]").value,
        maxStudents: newClassForm.querySelector("input[name=maxStudents]").value,
        description: newClassForm.querySelector("textarea[name=description]").value,
    }
    fetch("/api/classes",{
        method:"POST",
        body:JSON.stringify(formObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.replace("/")
        }else {
            alert("uh oh! something went wrong!")
            location.reload();
        }
    })
})