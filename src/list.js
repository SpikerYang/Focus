import React from 'react'
import Card from './card'







class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appLimit: this.props.app,
            list: this.props.list,
            socket: this.props.socket
        }
    }

    render() {
        const element = [];
        element.push(<h2>{this.state.appLimit}:</h2>)
        this.state.list.forEach((card) => {
                if (this.state.appLimit == card.app) {
                    element.push(<Card key={card.id}
                                    id={card.id}
                                    note={card.note}
                                    device={card.device}
                                    app={card.app}
                                    title={card.title}
                                    time={card.time}
                                    socket={this.state.socket}/>)
                }
            }
        );
        return (
            <div style = {{
                backgroundColor: "#E0E0E0",
                paddingTop: 10,
                paddingBottom:5,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 3,
                width: 300,
                textAlign: "center",
                fontSize:10
            }}>{element}</div>

        );
    }
}
export default List;