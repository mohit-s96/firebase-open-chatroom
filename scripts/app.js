// let currentName = 'anon';
let flag = 0;
let tempNameDb = [];
const list = document.querySelector('.message-list');
const parent = document.querySelector('.input-container');
const roomParent = document.querySelector('.rooms-container');
const rooms = document.querySelectorAll('.room');

roomParent.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btn')){
        let room = e.target.classList[2];
        e.target.classList.add('active-room');
        rooms.forEach((x) => {
            if((x.classList.contains(chatroom.room)) && (room !== chatroom.room)){
                x.classList.remove('active-room');
            }
        });
        chatUI.clear();
        chatroom.updateRoom(room);
        chatroom.changeListener((data) => {
            chatUI.render(data);
        });
        // chatroom.nameChangeListener((x)=>{
        //     nameDB();
        // });
        // console.log(chatroom.room);
    }
})

document.querySelector('.sendm').addEventListener('submit' ,(e) => {
        e.preventDefault();
        let x = e.target.children[1].value;
        let y = x.replace(/\s/g, '');
        if( y === ''){
            alert('Message Empty');
            e.target.children[1].value = '';
        }
        else{
            chatroom.updateChat(x);
            e.target.children[1].value = '';
        }
    });

document.querySelector('.sendc').addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log(tempNameDb);
    flag = 0;
    let x = e.target.children[1].value;
    x = x.replace(/\s/g, '');
    
         tempNameDb.forEach((name) => {
            if(name.name === x){
               
                flag = 1;
            }
        });
        if( x.length > 15){
            alert('Name too long');
            e.target.children[1].value = '';
        }
        else if(flag === 1){
            alert('Name already exists, choose another');
            e.target.children[1].value = '';
        }
        
        else if(( x === '') || (x === currentName) ){
            alert('Name can\'t be Empty or same');
            e.target.children[1].value = '';
        }

        else{
            let id;
            chatroom.updateName(x);
            e.target.children[1].value = '';
            let div = document.createElement('div');
            div.classList.add('test');
            div.innerText = `${currentName} changed their name to ${x}`;
            tempNameDb.forEach((name) => {
                if(name.name === currentName){
                    id = name.id;
                }
            });
            chatroom.deleteName(id);
            nameDB();
            list.appendChild(div);
            window.document.querySelector('.messages').scrollBy(0, 2000);
            currentName = x;
        }
       
});



let currentName = localStorage.username ? localStorage.username : 'anon';

chatUI = new ChatUI(list);

chatroom = new Chatroom('general', currentName);
chatroom.changeListener((data)=>{
     chatUI.render(data);
});

// chatroom.nameChangeListener((x)=>{
//     nameDB();
// });

nameDB();
function nameDB(){
    tempNameDb = [];
    chatroom.fetchOnLoad((data) => {
        data.forEach((x) => {
            // console.log(x.data());
            tempNameDb.push({
                name: x.data().name,
                id: x.id
            });
        });
    });
}
