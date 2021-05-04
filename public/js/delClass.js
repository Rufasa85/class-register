const delButtons = document.querySelectorAll(".deleteClassBtn");

delButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        const idToDelete = button.getAttribute('data-id');
        console.log(idToDelete);
        fetch(`/api/classes/${idToDelete}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
                alert("class deleted!")
                location.reload();
            } else {
                alert("error!")
            }
        })
    })
})