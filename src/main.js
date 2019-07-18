import React from "react";
import List from './list'
import io from 'socket.io-client'
import {Button} from "semantic-ui-react";


const socket = io('http://localhost:8080')
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteId: 2,
            list: [{
                'id':0,
                'note': '123',
                'device': 'iphone4',
                'app': 'wx',
                },
                {
                    'id':1,
                    'note': '123',
                    'device': 'iphone4',
                    'app': 'email',
                },
                {
                    'id':2,
                    'note': '123',
                    'device': 'iphone4',
                    'app': 'qq',
                }]
        }
        this.test = this.test.bind(this)
    }
    test() {
        socket.emit('test', {
            id:1,
            note: '123',
            device: 'iphone4',
            app: 'qq',
        })
        console.log('fasong')
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
            </div>
        );
    }
}

export default Main;