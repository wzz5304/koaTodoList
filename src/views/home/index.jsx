import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Popconfirm, Button, message, Avatar, Dropdown } from 'antd'
import { Table, Parent, ColumnItemBox } from '@src/components/table_template'
import AddOrEdit from './addoredit'
import moment from 'moment'

const { Header, Content, Footer } = Layout
// import rApi from '@src/http'

@connect(
    (state) => {
       //console.log('state', state)
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
class HomePage extends Parent {
    constructor(props) {
        super(props)
        this.state= {
            columns: [
                {
                    width: 140,
                    className: 'text-overflow-ellipsis',
                    title: '车牌',
                    dataIndex: 'carCode',
                    key: 'carCode',
                    render: (t, r, index) => {
                        return (
                            <ColumnItemBox name={r.carCode}/>
                        )
                    }
                },
                {
                    width: 140,
                    className: 'text-overflow-ellipsis',
                    title: '车型',
                    dataIndex: 'carTypeName',
                    key: 'carTypeName',
                    render: (t, r, index) => {
                        let name = r.isTemporary === 1 ? null : (r.carTypeName ? r.carTypeName : '-')
                        let tagName = r.isTemporary === 1 ? '临时车辆' : null
                        return (
                            <ColumnItemBox name={name} tagName={tagName} isModeTag={r.isTemporary === 1} />
                        )
                    }
                },
                {
                    width: 250,
                    className: 'text-overflow-ellipsis',
                    title: '所属司机',
                    dataIndex: 'driverName',
                    key: 'driverName',
                    render: (text, r, index) => {
                        let name =  r.driverName ? r.driverName : '-'
                        return(
                            <ColumnItemBox name={name}/>
                        )
                    }
                },
                {
                    width: 140,
                    className: 'text-overflow-ellipsis',
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: (text, r, index) => {
                        let name =  r.createTime ? moment(r.createTime).format('YYYY-MM-DD HH:mm') : '-'
                        return(
                            <ColumnItemBox name={name} />
                        )
                    }
                },
                {
                    width: 120,
                    className: 'text-overflow-ellipsis',
                    title: '创建人',
                    dataIndex: 'operatorName',
                    key: 'operatorName',
                    render: (text, r, index) => {
                        let name =  r.operatorName ? r.operatorName : '-'
                        return(
                            <ColumnItemBox name={name} />
                        )
                    }
                },
                {
                    className: 'text-overflow-ellipsis',
                    title: '备注信息',
                    dataIndex: 'remark',
                    width: 330,
                    key: 'remark',
                    render: (text, r, index) => {
                        let name = r.remark ? r.remark : '-'
                        return(
                            <ColumnItemBox name={name} />
                        )
                    }
                }
            ]
        }
    }

    onChangeValue = () => {
        if (this.searchCriteria) {
            this.searchCriteria()
        }
    }

    getData = (params) => {
        const { rApi } = this.props
        this.params = params
        return new Promise((resolve, reject) => {
            rApi.getBaseInfo({
                ...params
            }).then(d => {
                resolve({
                    dataSource: d.data || [], 
                    total: d.total
                })
            }).catch(e => {
                reject(e)
            })
        })
    }

    onAdd = () => { // 新建
        this.views.show({
            type: 'add',
            data: {}
        })
    }

    onLook = (record) => { // 编辑
        this.views.show({
            type: 'edit',
            data: {
                ...record
            }
        })
    }

    onDelete = (record) => { // 删除
        let { rApi } = this.props
        rApi.onDeleteCarItem({
            _id: record._id
        }).then(d => {
            message.success('操作成功')
            this.searchCriteria()
        }).catch(e => {
            message.error(e.message || '操作失败')
        }) 
    }

    logout = () => { // 注销
        let { history } = this.props
        localStorage.clear()
        history.replace('/login')

    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.logout}>
                        注销
                    </a>
                </Menu.Item>
            </Menu>
        )
        return ( 
            <Fragment>
                 <AddOrEdit
                    getThis={v => this.views = v}
                    parent={this} 
                    rApi={this.props.rApi}
                />
                <Layout className="layout">
                    <Header>
                        <div className="flex flex-vertical-center">
                            <div className="logo" 
                                style={{
                                    width: 120,
                                    height: 31,
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    margin: '16px 24px 16px 0',
                                }}
                            />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                            </Menu>
                            <div className="flex1"/>
                            <Dropdown 
                                overlay={menu} 
                                placement="bottomLeft"
                            >
                                <Avatar size={40} icon="user" />
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ 
                            background: '#fff', 
                            padding: 24, 
                            height: window.innerHeight - 190
                        }}
                        >
                        <Table
                                className="index-list-table-style"
                                title="车辆资源"
                                parent={this}
                            //' power={power}
                                params={this.state.params}
                                getData={this.getData}
                                columns={this.state.columns}
                                tableHeight={500}
                                actionWidth={120}
                                TableHeaderChildren={
                                    <Button 
                                        onClick={this.onAdd} 
                                        style={{verticalAlign: 'middle', borderRadius: 0}}
                                    >
                                        新建
                                    </Button>
                                }
                                actionView={({text, record, index, onDeleteItem, onEditItem, DeleteButton}) => {
                                    return(
                                        <Fragment>
                                            <span
                                                className={`action-button`}
                                                style={{color: '#18B56F', marginRight: '5px'}}
                                                onClick={() => this.onLook(record)}
                                            >
                                                编辑
                                            </span>
                                            <Popconfirm 
                                                placement="top" 
                                                title='确定要刪除此项?' 
                                                onConfirm={() => this.onDelete(record)} 
                                                okText="确定" 
                                                cancelText="取消"
                                            >
                                                <span className='action-button'>删除</span>
                                            </Popconfirm>
                                        </Fragment>
                                    )
                                }}
                            >
                            </Table>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Fragment>
        )
    }
}

export default HomePage
