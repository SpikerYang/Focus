import React from 'react';
// const App = () => (
//     <div>This is App</div>
// );


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : 'Focus',
        }
    }
    render(){
        return(
            <div>
            <div style = {{
                backgroundColor:'black',
                fontSize:'24px',
                textAlign:'center',
                color:'white',
            }}
            >FOCUS</div>
            </div>
        );
    }
}

export default App;

