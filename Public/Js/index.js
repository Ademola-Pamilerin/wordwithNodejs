
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
           <h2> ${data.title}</h2> <h3>${data.body}</h3>
           </div>`;
            }
        });
    });
};
const Inputed=value=>{
    if(value.length<=0){
        matched.innerHTML='';
    }
    else{
    fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="'+value).then(response=>{
        response.json().then(data=>{
            let values=data.query.search.filter(igkey=>{
                let reg=new RegExp(`^${value}`,'gi');
                return (igkey.title.match(reg));
            });
            // values.forEach(igkey => {
            //     console.log(igkey.title);
            //     let title="<h2>"+igkey.title+"</h2>";
            //     let end="</a>";
            //     let refrence='<a href="/search?search='+igkey.title+'>';
            //     matched.innerHTML=refrence+title+end;
            // });  
            let output=values.map(igkey=>{
                let title="<h2>"+igkey.title+"</h2>";
                let end="</a>";
                let refrence='<a onclick="Submitted(\''+igkey.title+'\')">';
                return refrence+title+end;
            });
            matched.innerHTML=output;    
             });
        })
    }
}
 const Clicked=()=>{
     console.log('was clicked')
 }
submit.addEventListener('click',()=>Submitted(input.value));
input.addEventListener('input',()=>Inputed(input.value));