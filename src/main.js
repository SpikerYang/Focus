import React from "react";
import List from './list'
import io from 'socket.io-client'
import {Button} from "semantic-ui-react";


const socket = io('http://localhost:8080')
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: 0,
            list: [{
                id:1,
                note: '123',
                device: 'iphone4',
                app: 'qq',
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

        socket.on('my response', (data) => {
            console.log(data)
        })

        console.log('emit')
        socket.emit('test', {
            id:1,
            note: '123',
            device: 'iphone4',
            app: 'qq',
        })
        console.log('fasong')
    }
    getNote() {
        // let text = {userName:'1',passWord:'1'} //获取数据
        // let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        // fetch(`http://localhost:8080/main`,{   //Fetch方法
        //     method: 'POST',
        //     mode:"cors",
        //     headers: {'Content-Type': 'application/json; charset=utf-8'},
        //     body: send
        // }).then(res => res.json()).then(
        //     data => {
        //         // console.log(data.list)
        //         // this.setState({list: data.list})
        //         console.log(data)
        //     }
        // )
    }
    render() {
        return (
            <div>
            <List list = {this.state.list}/>
            <Button onClick={this.test} /></div>
        );
    }
}
export default Main;