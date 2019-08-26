import React from 'react'
import WxRes from './WxRes'
import { Button} from 'semantic-ui-react'


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            id: props.id,
            note : props.note,
            device: props.device,
            app: props.app,
            title: props.title,
            time: props.time,
            resState: false
        }
        this.res = this.res.bind(this);
    }
    res() {
        this.setState({ resState : !this.state.resState});
    }
    render() {
        let hStyle = {
            width:280,
            height: 10,
        };
        return (
            <div style = {{
                backgroundColor: "#F0F0F0",
                width: 280,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10
            }}>
                <h2 style={hStyle}>Noti: {this.state.note}</h2>
                <h2 style={hStyle}>Device: {this.state.device}</h2>
                <h2 style={hStyle}>App: {this.state.app}</h2>
                <h2 style={hStyle}>Time: {this.state.time}</h2>
                <Button
                    primary
                    content='Respond on/off'
                    style={{
                        marginBottom:'10px',
                        width:'250px',
                        height:'30px',
                    }}
                    onClick={this.res}
                />
                <WxRes onShow={this.state.resState}
                       toWho={this.state.note.split(':')[0]}
                       socket = {this.state.socket}
                />

            </div>
        );
    }
}
export default Card;