function additems(event)
{
    event.preventDefault();
    let text=document.getElementById('todo-input');
    db.collection("todo-items").add({
        text: text.value,
        status:"active"
    })
    text.value="";
}
getitems();
function getitems() // get items from firestore..
{
    db.collection("todo-items").onSnapshot((snapshot)=>{
        //console.log(snapshot);
        let items=[];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id:doc.id,
                ...doc.data() //spread operator(unwrapping of data)..
            });
        })
        //console.log(items);
        generateItems(items);
    })
}
//document.querySelector('#data-id').addEventListener("click",function())
function generateItems(items)
{
    let itemsHTML="";
    items.forEach((item)=>{
        //console.log(item);
        itemsHTML+=`
        <div class="todo-item">
            <div class="check">
                <div data-id= ${item.id} class="check-mark ${item.status==="completed"?"checked":""}">
                    <img src="./assets/icon-check.svg" alt="" />
                </div>
            </div>
        <div class="todo-text ${item.status==="completed"?"checked":""}">${item.text}</div>
        <div class="button">
              <a href="" data-id=${item.id} class="btn" >Remove</a>
        </div>
        </div>
        `
    })
    document.querySelector('.todo-items').innerHTML=itemsHTML;
    // count++;
    // document.getElementById('list').innerText=count;
    createEventListners();
}
function createEventListners(){
    let todocheckmarks=document.querySelectorAll('.check-mark');
    todocheckmarks.forEach((checkmark)=>{
        checkmark.addEventListener("click",function(){
            markcompleted(checkmark.dataset.id);
            })
        });
    
    let removedocs= document.querySelectorAll('.button');
    //console.log(removedocs);
    removedocs.forEach((removedoc)=>{
        removedoc.addEventListener('click',function(){
            deletedocument(removedoc.dataset.id);
        })
    });
}
function markcompleted(id)
{
    console.log(id);
    let item=db.collection("todo-items").doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            //console.log(doc.data());
            let status=doc.data().status;
            if(status==="active")
            {
                item.update({
                    status:"completed",
                });
            }
            else if(status==="completed")
            {
                item.update({
                    status:"active"
                })
            }
        }
    })
}
function deletedocument(id)
{
    console.log(id);
    db.collection("todo-items").doc(id).delete();
    //console.log("hello");
    // item.get().then(function(doc){
    //     //console.log(doc.id);
    //     doc.ref.delete();
    // })
}