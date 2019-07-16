import React from 'react';
import { Segment, Input, Button } from 'semantic-ui-react'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password : null,
        }
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    userChange(e) {
        this.setState({ username : e.target.value});
    }
    passwordChange(e){
        this.setState({ password : e.target.value });
    }
    submit() {
        let text = {userName:this.state.username,passWord:this.state.password} //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        console.log(send)
        fetch(`http://localhost:8080/login`,{   //Fetch方法
            method: 'POST',
            mode:"cors",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: send
        }).then(res => res.json()).then(
            data => {
                console.log(data.Cookie)
                if(data.Status) {
                    window.alert('验证成功，欢迎登录')
                    sessionStorage.setItem("userName", data.Cookie.userName);
                    sessionStorage.setItem("cookie", data.Cookie.cookie);
                    this.props.history.push('/Main',{cookie : data.Cookie});
                }
                else window.alert('验证失败，用户名或密码错误')
            }
        )
    }
    render() {
        return (
            <div style={{margin:'10px'}}>
                <Segment style={{textAlign:'center'}}>
                    <Input
                        id='user'
                        placeholder='Username'
                        style={{
                            marginBottom:'10px',
                        }}
                        onChange={this.userChange}
                    /><br/>
                    <Input
                        id='password'
                        type='password'
                        placeholder='Password'
                        style={{
                            marginBottom:'10px',
                        }}
                        onChange={this.passwordChange}
                    /><br/>
                </Segment>

                <Segment style={{textAlign:'center'}}>
                    <Button
                        primary
                        content='Sign in'
                        style={{
                            marginBottom:'10px',
                            width:'250px',
                            height:'40px',
                        }}
                        onClick={this.submit}
                    /><br/>
                    <Button
                        primary
                        content='Sign up'
                        style={{
                            marginBottom:'10px',
                            width:'250px',
                            height:'40px',
                        }}
                        onClick={this.register}
                    />
                </Segment>
            </div>
        )
}
}
export default Login;