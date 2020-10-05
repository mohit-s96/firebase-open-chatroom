class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.dbs = db.collection('chats');
        this.dbn = db.collection('names');
        this.unsub;
    }
    async updateChat(message){
        let date = new Date();
        let newItem = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        };
        const response = await this.dbs.add(newItem);
        return response;
    }

    fetchOnLoad(callback){
        this.dbn.get().then((snapshot) => {
                // console.log(snapshot.docs);
                callback(snapshot.docs);
        
        }).catch((err) => {
            console.log(err.message);
    });    
    }
    
    deleteName(id){
        this.dbn.doc(id).delete().then(() => {
            console.log('Name Deleted');
        }).catch((err) => {
            console.log(err.message);
        })
    }

    nameChangeListener(callback){
        this.unsub = this.dbn
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((x) => {
                if(x.type === 'removed'){
                    callback(x.doc.data());
                    // nameDB();
                }
            });
        });
    }

    changeListener(callback){
       this.unsub = this.dbs
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((x) => {
                if(x.type === 'added'){
                    callback(x.doc.data());
                }
            });
        });
    }
    async updateName(name){
        this.username = name; 
        localStorage.setItem('username', name);
        let newname = {
            name
        }; 
        const response = await this.dbn.add(newname);
        return response;
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }
}