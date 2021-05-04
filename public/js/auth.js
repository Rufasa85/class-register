const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");

loginForm.addEventListener("submit",e=>{
    const type = loginForm.querySelector("input[name=type]").value
    const formObj = {
        email:loginForm.querySelector("input[name=email]").value,
        password:loginForm.querySelector("input[name=password]").value
    }
    console.log(formObj);
    if(type==="Teacher"){
        fetch('/api/teachers/login',{
            method:"POST",
            body:JSON.stringify(formObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                alert("logged in!")
                location.replace("/")
            }else {
                alert("login failed!")
            }
        })
    }else {
        fetch('/api/students/login',{
            method:"POST",
            body:JSON.stringify(formObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                alert("logged in!")
                location.replace("/")
            }else {
                alert("login failed!")
            }
        })
    }
    e.preventDefault();
    console.log("no submit for you!!","type: " ,type)
})
signupForm.addEventListener("submit",e=>{
    const type = signupForm.querySelector("input[name=type]").value
    const formObj = {
        email:signupForm.querySelector("input[name=email]").value,
        password:signupForm.querySelector("input[name=password]").value,
        name:signupForm.querySelector("input[name=name]").value
    }
    console.log(formObj);
    if(type==="Teacher"){
        fetch('/api/teachers',{
            method:"POST",
            body:JSON.stringify(formObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                alert("signed up!")
                location.replace("/")
            }else {
                alert("signup failed!")
            }
        })
    }else {
        fetch('/api/students',{
            method:"POST",
            body:JSON.stringify(formObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                alert("signed up!")
                location.replace("/")
            }else {
                alert("signup failed!")
            }
        })
    }
    e.preventDefault();
    console.log("no submit for you!!","type: " ,type)
})
