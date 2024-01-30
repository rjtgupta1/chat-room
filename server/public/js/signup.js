let signUpBtn = document.querySelector('#signup-btn');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

signUpBtn.addEventListener('click',(e)=>{
    // console.log("Clicked on button");

    if(email.value && password.value){
        e.preventDefault();
        console.log("Email : ",email.value);
        console.log("Pass : ",password.value);

        let data = {
            email: email.value,
            password: password.value
        }

        fetch(
            "/signup",
            {
                method:"post",
                mode:"same-origin",
                body:JSON.stringify({data}),
                credentials:"same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        .then(async (res)=>{
            const Response = await res.json();
            // console.log(Response);
            alert(Response.msg);
        })

    }else{
        alert("Please enter email & password");
    }
})