//get total
//create prodtct
//save in localstorage
//clear input
//raed
//count
//delete
//update
//search
//clean data

let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let catergoy=document.getElementById("category");
let submit=document.getElementById("submit");

let search=document.getElementById("search");

let searchByTitle=document.getElementById("searchTitle");
let searchByCategory=document.getElementById("searchCatergoy");


let mood='create';

let temp;



//console.log(title,price,taxes,ads,discount,total,count,catergoy,submit)







//get total
price.addEventListener("keyup",getTotal);
taxes.addEventListener("keyup",getTotal);
ads.addEventListener("keyup",getTotal);
discount.addEventListener("keyup",getTotal);

function getTotal(){
    if(price.value !=""){
        let resalut=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=resalut;
        total.style.background='lightgreen';
    }else{
        total.innerHTML='';
        total.style.background='#6b0808';
    }
}

//create Product
let dataProduct;
if(localStorage.product !=null){
    //convert to array
    dataProduct=JSON.parse(localStorage.product);
}else{
    dataProduct=[]; 
}
submit.onclick=function(){

    let newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catergoy:catergoy.value.toLowerCase(),
        
        

    }

    if(title.value !="" && price.value != "" && catergoy.value != ""
    &&newProduct.count<=100
    ){

    if(mood=="create"){
    //create more than one product
    if(newProduct.count>1){
        for(let i=0;i<newProduct.count;i++){
             //add object in array
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct.push(newProduct);
        }
   
    } else{
        //mood update  
        dataProduct[temp]=newProduct;
        //return mood create
        mood="create";
        submit.innerHTML="Create";
        count.style.display="block";
    }
      //reset data
    claerData();

    }else{
        alert("please enter data");
    }
    //save data in localstorage and convert array to string 
    localStorage.setItem("product",JSON.stringify(dataProduct));
   

     //show data
     showData();

}

//clear inputs
function claerData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
catergoy.value='';

}

//read data
function showData(){
    getTotal();
    let table='';
    for(let i=0;i<dataProduct.length;i++){
        table+=`
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].catergoy}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr> 
        `;
    }
    document.getElementById("tbody").innerHTML=table;//return object object

    let btnDeleteAll=document.getElementById("deleteAllData");
    //check data is found
    if(dataProduct.length>0){
       btnDeleteAll.innerHTML=`
       <button onclick="deleteAll()">Delete All Data</button>
       ` 
    }else{
        btnDeleteAll.innerHTML='';
    }

}

    //show data
    showData();

//delete product

function deleteData(i){
    //remove index i from array
dataProduct.splice(i,1);
//remove from localstorage
localStorage.product=JSON.stringify(dataProduct);

    //show data after delete
    showData();

}


//delete all data
function deleteAll(){
   //remove all data from localstorage 
   console.log("remove");
  localStorage.clear();
  //remove all data from array
  dataProduct.splice(0); 
  showData();
}


//update products

function updateData(i){

//console.log(i);
title.value=dataProduct[i].title;
price.value=dataProduct[i].price;
taxes.value=dataProduct[i].taxes;
ads.value=dataProduct[i].ads;
discount.value=dataProduct[i].discount;
getTotal();
catergoy.value=dataProduct[i].catergoy;

count.style.display="none";

submit.innerHTML="Update"

 mood='update';
 temp=i;

 scroll({
    top:0,
    behavior:"smooth"
 })

}


//search 

let searchMood="title";

//searchByTitle.addEventListener("click",getSearchMood(this.id));
//searchByCategory.addEventListener("click",getSearchMood(this.id));

searchByTitle.addEventListener("click", () => {
    getSearchMood(searchByTitle.id);
});

searchByCategory.addEventListener("click", () => {
    getSearchMood(searchByCategory.id);
});





//search mood
function getSearchMood(id){
console.log(id);

if(id=="searchTitle"){
    searchMood="title";
    search.placeholder="search by title";
}else{
    searchMood="category";
    search.placeholder="search by category";

}
search.focus();
search.value='';
showData();
}


search.addEventListener("keyup", () => {
    searchData(search.value);
});

//search data
function searchData(value){

    let table="";
    //console.log(value);
    for(let i=0;i<dataProduct.length;i++){
    if(searchMood=="title"){

        
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].catergoy}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr> 
                `;  

            }
        
            
    } 
            else{
                
                    if(dataProduct[i].catergoy.includes(value.toLowerCase())){
                        console.log(dataProduct[i].catergoy);
                        table+=`
                        <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].catergoy}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                        </tr> 
                        `;  
        
                    }
                

            }
        }
            document.getElementById("tbody").innerHTML=table;   
}


//clean data




