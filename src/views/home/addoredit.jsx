import React, { Component } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { Row, Col } from '@src/components/grid'

class AddOrEdit extends Component {

    state = { 
        open: false,
        _id: null,
        carCode: null,
        carTypeName: null,
        driverName: null,
        remark: null,
    }
    constructor(props) {
        super(props)
        if(props.getThis) {
            props.getThis(this)
        }
    }

    show = (d) => {
        this.setState({
            open: true,
            ...d.data
        })
    }

    actionDone = () => {
        const { parent } = this.props
        if (parent.searchCriteria) {
            parent.searchCriteria()
        }
        this.claearValue()
        message.success('操作成功！')
    }

    claearValue = () => {
        this.setState({
            open: false,
            _id: null,
            carCode: null,
            carTypeName: null,
            driverName: null,
            remark: null,
        })
    }

    handleCancel = () => {
        this.setState({
            open: false
        }, () => {
            this.claearValue()
        })
    }

    handleOk = () => {
        const { 
            carCode,
            carTypeName,
            driverName,
            remark,
            _id,
        } = this.state
        const { rApi } = this.props
        rApi.onSaveCarData({
            carCode,
            carTypeName,
            driverName,
            remark,
            _id,
        }).then(d => {
            this.actionDone()
        }).catch(e => {
            message.error(e.message || '操作失败')
        })
    }
    render() { 
        const { 
            open, 
            carCode,
            carTypeName,
            driverName,
            remark,
        } = this.state
        return ( 
            <Modal
                title="Basic Modal"
                visible={open}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row gutter={24}>
                    <Col label="车牌&emsp;&emsp;" colon span={16}>
                        <Input 
                            value={carCode}
                            placeholder="" 
                            onChange={e => {
                                this.setState({carCode: e.target.value})
                            }}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col label="车型&emsp;&emsp;" colon span={16}>
                        <Input 
                            value={carTypeName}
                            placeholder="" 
                            onChange={e => {
                                this.setState({carTypeName: e.target.value})
                            }}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col label="司机&emsp;&emsp;" colon span={16}>
                        <Input 
                            value={driverName}
                            placeholder="" 
                            onChange={e => {
                                this.setState({driverName: e.target.value})
                            }}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col label="备注&emsp;&emsp;" colon span={16}>
                        <Input 
                            value={remark}
                            placeholder="" 
                            onChange={e => {
                                this.setState({remark: e.target.value})
                            }}
                        />
                    </Col>
                </Row>
            </Modal>
         );
    }
}
 
export default AddOrEdit;