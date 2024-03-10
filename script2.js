
const startBtn=document.getElementById('btn');
 const input=document.getElementsByTagName('input')[0];
const error=document.getElementById('error');
 startBtn.addEventListener('click',()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(input.value==='')
    {
      
       error.innerHTML='Email is required.';
       error.style.color='rgba(241, 26, 26, 0.932)';
       input.style.border='1px solid rgba(241, 26, 26, 0.932)';
    //    document.body.appendChild(div);
    }
    else if(!emailRegex.test(input.value)){
        error.innerHTML='Please enter a valid email address.';
        error.style.color='rgba(241, 26, 26, 0.932)';
        input.style.border='1px solid rgba(241, 26, 26, 0.932)';
    }
    else{
      
            // Use window.location to navigate to page2.html
            window.location.href = 'index.html';
            input.style.border='1px solid rgb(187, 186, 186)';
    }
 })
 