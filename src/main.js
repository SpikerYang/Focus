import React from "react";
import List from './list'
import io from 'socket.io-client'
import {Button} from "semantic-ui-react";
import QRCode from 'qrcode-react'


const socket = io('http://localhost:8080')
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socket,
            qrCodeUrl: '',
            noteId: 0,
            list: [

                ]

        }
        this.test = this.test.bind(this)
    }
    test() {
        // socket.emit('test', {
        //     id:1,
        //     note: '123',
        //     device: 'iphone4',
        //     app: 'qq',
        // })
        // console.log('fasong')
        socket.emit('wxLogin', '123')
        console.log('wxLogin')
    }
    componentDidMount() {
        console.log('DidMount')
        socket.emit('join', sessionStorage.getItem("userName"))
        console.log(sessionStorage.getItem("userName"))

        socket.on('add note', (data) => {
            this.setState({noteId: this.state.noteId + 1});
            console.log(this.state.noteId)
            let newList = this.state.list;
            let newCard = data;
            newCard.id = this.state.noteId;
            newList.push(newCard);
            this.setState({list: newList});
            console.log(this.state.list)
        })
        socket.on('get qrCode', (data) => {
            this.setState({qrCodeUrl : data})
            console.log(this.state.qrCodeUrl)
            socket.emit('gotQrcode');
        })
        console.log('qeCode listening')
        socket.on('Message send', (data) => {
            console.log('sent listen');
            if (data === 1) window.alert('Message sent!')
            console.log('mes send');
        })

    }

    render() {
        let listStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "spaceAround",
        };
        let mainStyle = {
            background: `url(${"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566814909180&di=9d313528314127e7fb902e8b372d1ae5&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011d3859659a3fa8012193a3c20320.jpg%401280w_1l_2o_100sh.png"})`,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            height: "100%",
            width: "100%",
            margin: "0px",
            padding: "0px",
            position: "absolute",
        };
        return (
            <div style={mainStyle}>
            <div style={listStyle}>
                <div><List list = {this.state.list} socket = {this.state.socket}  app='qq'/></div>
                <div><List list = {this.state.list} socket = {this.state.socket} app='wx'/></div>
                <div><List list = {this.state.list} socket = {this.state.socket} app='email'/></div>
                <Button onClick={this.test} content='Login wx'
                        style={{
                            marginBottom:'10px',
                            width:'250px',
                            height:'40px',
                        }}/><br/>
                <QRCode value={this.state.qrCodeUrl} />
            </div>

            </div>
        );
    }
}

export default Main;