import React, {useState, useEffect }from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from "./Messages";
import TextContainer from "./TextContainer";

let socket;

const Chat = ({ location })=>{
    const [name,setName] = useState();
    const [room, setRoom] = useState(); 
    const [message, setMessage] = useState(); 
    const [messages, setMessages] = useState([]); 
    const[users,setUsers]=useState([]);

    const hostedLink = "localhost:5000";

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        socket=io(hostedLink);
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room}, ()=>{
            
        });

        return ()=>{
            socket.emit("disconnect");

            socket.off();
        }

    }, [hostedLink,location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message]);
        });

        socket.on("roomData",({users})=>{
            setUsers(users);
        })
    },[messages,users]);

    //Sends messages
    const sendMessage = (e)=>{
        e.preventDefault();

        if(message){
            socket.emit("sendMessage", message,()=>setMessage(""))
        }
    }

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/> 
            </div>
            <div>
                <TextContainer users={users}/>
            </div>
        </div>

    )
}

export default Chat;