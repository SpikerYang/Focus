import React from 'react'
import Card from './card'
import {Button} from "semantic-ui-react";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                    id:1,
                    note: '123',
                    device: 'iphone4',
                    app: 'qq',
                },
                {
                    id: 2,
                    note: '1sef',
                    device: 'iphone5',
                    app: 'qq',
                },
                {
                    id: 3,
                    note: 'seed',
                    device: 'iphone3',
                    app: 'qq',
                }]
        }
        this.add = this.add.bind(this);
    }
    add() {
        console.log(this.state.list);
        let newList = this.state.list;

        let newCard = {
            id: 4,
            note: 'seed',
            device: 'iphone3',
            app: 'qq',
        }
        newList.push(newCard);
        console.log(newList);
        this.setState({list: newList});
    }
    render() {
        return (
            <div style = {{
                backgroundColor: "#ccc",
                borderRadius: 3,
                width: 300,
                textAlign: "center",
                fontSize:10
            }}>
                {
                    this.state.list.map((card) =>
                        <Card key={card.id}
                        id={card.id}
                        note={card.note}
                        device={card.device}
                        app={card.app} />
                    )
                }
                <Button
                    primary
                    content='Add note'
                    style={{
                        marginBottom:'10px',
                        width:'250px',
                        height:'40px',
                    }}
                    onClick={this.add}
                />
            </div>
        );
    }
}
export default List;