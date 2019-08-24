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
            resState: false
        }
        this.res = this.res.bind(this);
    }
    res() {
        this.setState({ resState : !this.state.resState});
    }
    render() {
        return (
            <div style = {{
                backgroundColor: "#E0EEEE",
                width: 300,
            }}>
                <h2>Id: {this.state.id}</h2>
                <h2>Noti: {this.state.note}</h2>
                <h2>Device: {this.state.device}</h2>
                <h2>App: {this.state.app}</h2>
                <h2>Title: {this.state.title}</h2>
                <Button
                    primary
                    content='Respond on/off'
                    style={{
                        marginBottom:'10px',
                        width:'250px',
                        height:'40px',
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