import React from 'react';
// const App = () => (
//     <div>This is App</div>
// );


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : 'Focus',
        }
    }
    render(){
        let mainStyle = {
            background: `url(${"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566814909180&di=9d313528314127e7fb902e8b372d1ae5&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011d3859659a3fa8012193a3c20320.jpg%401280w_1l_2o_100sh.png"})`,
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            margin: "0px",
            padding: "0px",
            position: "absolute",

        };
        return(
            <div>
            <h2 style={mainStyle}> 23123 </h2>
            </div>
        );
    }
}

export default Header;

