import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './index.less';
import { Provider, connect } from 'react-redux';
const FormItem = Form.Item;

@connect(
    (state) => {
        return ({
            tiger: state.reducer.tiger,
            rApi: state.api.rApi
        })
    }, 
    (dispatch) => {
        return ({
            PayIncrease: () => dispatch({ type: 'ADD' }),
            PayDecrease: () => dispatch({ type: 'DEL' })
        })
    }
)
class Login extends Component {

    state={
        username: '',
        password: '',
        isCheck: false,
        loading: false,
        requstDone: true
    }

    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { rApi } = this.props
                rApi.login({
                    userName: values.userName,
                    password: values.password
                }).then(d => {
                    message.success('操作成功')
                    let accessToken = d.data.access_token
                    let time = d.data.time
                    let timeout = d.data.timeout
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('time', time)
                    localStorage.setItem('timeout', timeout)
                    this.toHome()
                }).catch(e => {
                    message.error(e.message || '操作失败')
                })
            }
          })
       
    }

    toHome = () => {
        let { history } = this.props
        if (history.action === 'PUSH') {
            history.go(-1)
        } else {
            history.replace('/')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let { requstDone } = this.state
        let platformName = localStorage.getItem('platformName')
        return (
            <Fragment>
                {
                    requstDone ?
                    <div className="login-layout login-wrapper flex" style={{height: window.innerHeight}}>
                        <div className="left-wrapper flex1"></div>
                        <div className="right-wrapper">
                            <h3 className="login-title">{platformName ? platformName : '供应链智慧云平台'}</h3>
                            <div className="page-login flex flex-vertical-center">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请输入账号!' }],
                                            initialValue: this.state.username
                                        })(
                                            <Input 
                                                placeholder="" 
                                                className="padding-left"
                                                prefix={<span style={{color: '#aaa'}}>用户名</span>} 
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码!' }],
                                            initialValue: this.state.password
                                        })(
                                            <Input 
                                                className="padding-left"
                                                prefix={<span style={{color: '#aaa'}}>密&emsp;码</span>} 
                                                type="password" 
                                                placeholder="" 
                                            />
                                        )}
                                    </FormItem>
                                    <div className="flex flex-vertical-center" style={{height: 45, padding: '0 5px'}}>
                                        <FormItem>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: this.state.isCheck,
                                            })(
                                                <Checkbox>记住密码</Checkbox>
                                            )}
                                        </FormItem>
                                        <div className="flex1"></div>
                                        <FormItem>
                                            <a className="login-form-forgot" href="">忘记密码</a>
                                        </FormItem>
                                    </div>
                                    <Button 
                                        loading={this.state.loading} 
                                        size="large"
                                        type="primary" 
                                        htmlType="submit" 
                                        className="login-form-button"
                                    >
                                        登录
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </Fragment>
        );
    }
}
export default Form.create()(Login);
