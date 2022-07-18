const algorithm=document.getElementById('sort');
const container=document.getElementById('array');
const speedBtn =document.getElementById('speed');
const sizeBtn=document.getElementById('size');
const arrayBtn=document.getElementById('array_btn');
console.log(arrayBtn);
const strt=document.getElementById('strt');
var block=document.querySelectorAll('.block');


// arrayBtn.disabled=true;
// strt.disabled=true;

let selected_algo="BUBBLE SORT";
let speed=50;
let size=20;

let delay=(speed*100);

speedBtn.addEventListener('change',()=>{
    speed=(100-Number(speedBtn.value));
    delay=(speed*10)/2;

})

algorithm.addEventListener('change', function () {
    selected_algo = algorithm.options[algorithm.selectedIndex].text;
    arrayBtn.disabled=false;
    arrayBtn.addEventListener('click',buildArray);
});
sizeBtn.addEventListener('change',()=>{
    size=Number(sizeBtn.options[sizeBtn.selectedIndex].text);
    arrayBtn.disabled=false;
    arrayBtn.addEventListener('click',buildArray);
});
arrayBtn.addEventListener('click',buildArray);
strt.addEventListener('click',startSorting);

function startSorting(){
    algorithm.disabled=true;
    sizeBtn.disabled=true;
    arrayBtn.disabled=true;

    

    if(selected_algo==='BUBBLE SORT'){
        bubbleSort();
    }
    else{
        if(selected_algo==="SELECTION SORT"){
            console.log(selected_algo)
            selectionSort();
        }
        else{
            if(selected_algo==="INSERTION SORT"){
                insertionSort();
            }
        }
    }

  

}



function buildArray(){
    let val=0;

    algorithm.options[algorithm.selectedIndex].text=selected_algo;
    sizeBtn.options[sizeBtn.selectedIndex].text=size;

    container.innerHTML="";
    arrayBtn.disabled=true;
    for(let i=0;i<size;i++){
        container.style.width=`${(size*28)+3*size}px`
        val=(Math.ceil(Math.random()*100));
        var arr_ele=document.createElement("div");
        arr_ele.classList.add("block");
        arr_ele.style.height=`${val*3}px`;
        arr_ele.style.backgroundColor='#B8D432';
        arr_ele.style.transform = `translate(${i * 30}px)`

        //creating label
        var arr_label=document.createElement('label');
        arr_label.classList.add('block_id');
        arr_label.innerHTML=val;

        //append
        arr_ele.appendChild(arr_label);
        container.appendChild(arr_ele);
    }
  
    arrayBtn.removeEventListener('click',buildArray);
    strt.disabled=false;

}



//function to swap
 function swap(el1,el2){
     return new Promise((resolve)=>{
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;
         window.requestAnimationFrame(function(){
            setTimeout(()=>{
                container.insertBefore(el2,el1);
                block=document.querySelectorAll('.block');
                resolve();
            },delay);
            
         });
     });
 }


 


 async  function bubbleSort(){


     //select all blocks
    block=document.querySelectorAll('.block');

     for(var i=0;i<block.length;i+=1){
         for(var j=0;j<block.length-i-1;j+=1){
             //color change
             //console.log(j);
             block[j].style.backgroundColor="#EF5D22";
             block[j+1].style.backgroundColor="#EF5D22";
            


             //promise to wait for .1 sec
             await new Promise((resolve)=>{
                 setTimeout(() => {
                     resolve();
                 }, delay);
             });

            //  console.log("run");

             let val1=Number(block[j].childNodes[0].innerHTML);
             let val2=Number(block[j+1].childNodes[0].innerHTML);
             if(val1>val2){
                 await swap(block[j],block[j+1]);

                // block=document.querySelectorAll('.block');
             }

             block[j].style.backgroundColor="#B8D432";
             block[j+1].style.backgroundColor="#B8D432";
 
         }
         //last i element is sorted
        //  console.log(block.length-i-1);
        block[block.length-i-1].style.backgroundColor="#009A90";

    }
    algorithm.disabled=false;
    sizeBtn.disabled=false;
    arrayBtn.disabled=false;
    arrayBtn.addEventListener('click',buildArray);
}


async function selectionSort(){



    block=document.querySelectorAll('.block');
    for(let i=0;i<block.length;i++){
        let min_index=i;
        block[min_index].style.backgroundColor="darkblue";
        for(let j=i+1;j<block.length;j++){
            let val1=Number(block[min_index].childNodes[0].innerHTML);
            let val2=Number(block[j].childNodes[0].innerHTML);

            block[j].style.backgroundColor="red";

            await new Promise((resolve)=>{
                setTimeout(() => {
                    resolve();
                }, delay);
            });

            
        
            if(val2<val1){
                if(min_index!=i){
                    block[min_index].style.backgroundColor="#B8D432"
                }
                
                min_index=j;
               
                block[min_index].style.backgroundColor="black";
            }
            else{
                block[j].style.backgroundColor="#B8D432"
            }
        }

        //swapiing 
        let tempHeight=block[min_index].style.height;
        let tempValue=block[min_index].childNodes[0].innerHTML;
        block[min_index].style.height=block[i].style.height;
        block[min_index].childNodes[0].innerHTML  = block[i].childNodes[0].innerHTML;
        block[i].style.height=tempHeight;
        block[i].childNodes[0].innerHTML=tempValue;

        // for(let i=0;i<block.length;i++){
        //     console.log(i+' ----->' + block[i].childNodes[0].innerHTML)
        // }

        block[i].style.backgroundColor="#009A90"

        console.log("DONE...........")


    }

  
    


    algorithm.disabled=false;
    sizeBtn.disabled=false;
    arrayBtn.disabled=false;
    arrayBtn.addEventListener('click',buildArray);
}


//Insertion Sort


async function insertionSort(){
    block=document.querySelectorAll('.block');
    // let t=3*Number(block[1].childNodes[0].innerHTML);
    // console.log(480-t);
    // block[1].style.bottom=`${479-t}px`

    // block[1].style.bottom="";



    let n=block.length;
    let key;
    let j;
    // block[0].style.backgroundColor="yellow";
    for(let i=1;i<n;i++){
        key = Number(block[i].childNodes[0].innerHTML);
        let j=i-1;

        block[i].style.backgroundColor="black";
        
      
        

        while(j>=0 ){
            block[j].style.backgroundColor="red";
            await new Promise((resolve)=>{
                setTimeout(() => {
                    resolve();
                }, delay);
            });
           
            if( Number(block[j].childNodes[0].innerHTML)>key){
                
                await swap(block[j],block[j+1]);

                block[j+1].style.backgroundColor="yellow";

               
            }
            else{
                // await new Promise((resolve)=>{
                //     setTimeout(() => {
                //         resolve();
                //     }, delay);
                // });
                // block[j].style.bottom="0px";
                block[j].style.backgroundColor="yellow";
            }
            j--;
        }
        for(let k=0;k<i;k++){
            block[k].style.backgroundColor="yellow";
        }
        // await new Promise((resolve)=>{
        //     setTimeout(() => {
        //         resolve();
        //     }, delay);
        // });

    }


    algorithm.disabled=false;
    sizeBtn.disabled=false;
    arrayBtn.disabled=false;
    arrayBtn.addEventListener('click',buildArray);
}
