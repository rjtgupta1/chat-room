let signInBtn = document.querySelector('#signin-btn');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

signInBtn.addEventListener('click',(e)=>{
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
            "/signin",
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
            console.log(Response);
        })

    }else{
        alert("Please enter email & password");
    }
})