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
            qrCodeUrl: '',
            noteId: 2,
            list: [{
                'id':0,
                'note': '123',
                'device': 'iphone4',
                'app': 'wx',
                'title': 'sss',
                },
                {
                    'id':1,
                    'note': 'xxx',
                    'device': 'iphone4',
                    'app': 'wx',
                    'title': 'sss',
                },
                {
                    'id':2,
                    'note': '567',
                    'device': 'iphone4',
                    'app': 'wx',
                    'title': 'sss',
                },
                {
                    'id':3,
                    'note': 'iju',
                    'device': 'iphone4',
                    'app': 'email',
                    'title': 'sss',
                },
                {
                    'id':4,
                    'note': '123',
                    'device': 'iphone4',
                    'app': 'qq',
                    'title': 'sss',
                }]
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


    }

    render() {
        let listStyle = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "spaceAround",
            backgroundColor: "#D1EEEE"
        };
        let mainStyle = {

        }
        return (
            <div style={mainStyle}>
            <div style={listStyle}>
                <div><List list = {this.state.list} app='qq'/></div>
                <div><List list = {this.state.list} app='wx'/></div>
                <div><List list = {this.state.list} app='email'/></div>
            </div>
                <Button onClick={this.test} />
                <QRCode value={this.state.qrCodeUrl} />
            </div>
        );
    }
}

export default Main;