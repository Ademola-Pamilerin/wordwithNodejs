let submit=document.querySelector('button');
let input=document.querySelector('input');
let matched=document.querySelector('.matched');
const Submitted=value=>{
    console.log('was clicked');
    matched.innerHTML="<h2>loading...</h2>"
    fetch('/search?search='+value).then(response=>{
        response.json().then(data=>{
            if(data.error){
             return  matched.innerHTML=`<h2>Please ${data.error}</h2>`
            }else{
           return matched.innerHTML=`<div>
           <h2> Ademola</h2>
           </div>`;
            }
        });
    });
};
const Inputed=value=>{
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="'+value).then(response=>{
        response.json().then(data=>{
            let values=data.query.search.filter(igkey=>{
                let reg=new RegExp(`^${value}`,'gi');
                return (igkey.title.match(reg));
            });
           let html= values.map(igkey=>{
                return`<h2><p>${igkey.title}</p></h2>`
            });      
            matched.innerHTML=html;
            console.log(html);          
             });
        })
    }
 const Clicked=()=>{
     console.log('was clicked')
 }
submit.addEventListener('click',()=>Submitted(input.value));
input.addEventListener('input',()=>Inputed(input.value));