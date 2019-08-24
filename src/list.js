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
        this.state.list.forEach((card) => {
                if (this.state.appLimit == card.app) {
                    element.push(<Card key={card.id}
                                    id={card.id}
                                    note={card.note}
                                    device={card.device}
                                    app={card.app}
                                    title={card.title}
                                    socket={this.state.socket}/>)
                }
            }
        );
        return (
            <div style = {{
                backgroundColor: "#D1EEEE",
                borderRadius: 3,
                width: 300,
                textAlign: "center",
                fontSize:10
            }}>{element}
            </div>
        );
    }
}
export default List;