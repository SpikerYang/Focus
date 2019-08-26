import React from 'react'
import {Input, Button} from 'semantic-ui-react'



class WxRes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            onShow: props.onShow,
            fromWho: '',
            toWho: props.toWho,
            text: ''
        }
        this.text = this.text.bind(this);
        this.submit = this.submit.bind(this);
    }
    // componentDidMount() {
    //     console.log('sent listen');
    //     socket.on('Message send', (data) => {
    //
    //         if (data === 1) window.alert('Message sent!')
    //         console.log('mes send');
    //     })
    //
    // }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({onShow : nextProps.onShow});
    }

    text(e) {
        this.setState({ text : e.target.value});
    }
    submit() {
        if (this.state.text != '') {
            let text = {"text":this.state.text,
                "toWho":this.state.toWho
            } //获取数据
            this.state.socket.emit('sendMsg', text);
            this.setState({ onShow : false})
            this.setState({ text : ''})
        }
        else window.alert('please input the response!')
    }
    render() {
        console.log(this.state.onShow);
        if (this.state.onShow == false) return null;
        return (
            <div>
                <h2>To {this.state.toWho}</h2>
                <Input
                    id='text'
                    placeholder='text'
                    style={{
                        marginBottom:'10px',
                    }}
                    onChange={this.text}
                /><br/>
                <Button
                    primary
                    content='Send'
                    style={{
                        marginBottom:'10px',
                        width:'250px',
                        height:'40px',
                    }}
                    onClick={this.submit}
                />
            </div>
        );
    }
}
export default WxRes;