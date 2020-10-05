class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        let passed = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        let x = data.message;
        let span = document.createElement('span');
        let div = document.createElement('div');
        div.classList.add('time-passed');
        div.innerText = passed;
        span.classList.add('name');
        span.innerText = `${data.username} : `;
        let li = document.createElement('li');
        let br = document.createElement('br');
        li.classList.add('message-item');
        li.appendChild(span);
        li.appendChild(document.createTextNode(x));
        li.appendChild(div);
        this.list.appendChild(li);
        this.list.appendChild(br);
        window.document.querySelector('.messages').scrollBy(0, 2000);
    }
}