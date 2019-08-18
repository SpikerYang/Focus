import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            note : props.note,
            device: props.device,
            app: props.app,
            title: props.title,
        }
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
            </div>
        );
    }
}
export default Card;