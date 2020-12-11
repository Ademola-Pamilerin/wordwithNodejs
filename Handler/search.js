const request=require('request');
const Search=(searchValue,callback)=>{
    const url="https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="+searchValue;
    request({url:url , json:true},(e,response)=>{
   if(e){
      callback("please connect to internet",undefined);
   }else if(response.body.query.search <=0 ){
      callback('Please try another search',undefined);
   }
   else{
   let res=response.body.query.search[2];
   callback(undefined,{title:res.title,body:res.snippet});
   }
})
};
module.exports=Search;