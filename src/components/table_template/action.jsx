import React, { Component } from 'react'
import { Popconfirm } from 'antd'

/* 
record._noDel: bool   ->  是否隐藏删除按钮
*/

const PreventActionEvent = event => {
    event.stopPropagation()
}

class Number extends Component {
    state = {}
    render() { 
        let { index } = this.props
        return (
            <div className='table-action-box text-overflow-ellipsis'>
                {index}
            </div>
        )
    }
}

const ActionBox = (props) => {
    return (
        <div style={{...props.style, userSelect: 'none'}} className='table-action-box'>
            {props.children}
        </div>
    )
}

const DeleteButton = (props) => {
    return (
        <Popconfirm
        title={`确定要${props.text || '刪除'}此项?`}
        onConfirm={props.action}
        okText="确定"
        cancelText="取消">
        <span
            className={`action-button`}
        >
            {props.text || '刪除'}
        </span>
    </Popconfirm>
    )
}

class Action extends Component {
    state = {}
    render() { 
        let { onDelete, onEdit, onLook, edittext, deltext, record, power, style, isPreventActionEvent } = this.props
        if (deltext && deltext === '禁用') {
            if (record.status === 1) {
                deltext = '恢复'
            }
        }
        deltext = deltext || `删除`
        // console.log('props', record)
        return (
            <ActionBox style={style} record={record}>
                {
                    onLook && power.LOOK_MORE?
                    <span
                        className={`action-button`}
                        onClick={(e) => {onLook(e)}}
                    >
                        查看
                    </span>
                    :
                    null
                }
                {
                    power.EDIT_DATA ?
                    <span
                        className={`action-button`}
                        onClick={(e) => {onEdit(e)}}
                    >
                        {edittext || '编辑'}
                    </span>
                    :
                    null
                }
                {
                    (power.DEL_DATA && !record._noDel) ?
                    <DeleteButton 
                        text={deltext}
                        action={onDelete}
                    />
                    :
                    null
                }
            </ActionBox>
        )
    }
}
 
export const columnsAddNumber = ({columns, title, cusNumColRender}) => {
    let obj = {
        width: 50,
        title: title || '序号',
        className: 'table-action table-action-num',
        dataIndex: 'number',
        key: 'number',
        //fixed: 'left',
        render: cusNumColRender ? cusNumColRender : (text, record, index) => {
            let num = index + 1
            if ('num' in record) {
                num = record.num
            }
            return <Number index={num} />
        }
    }
    let cols = [obj, ...columns]
    // console.log('cols', cols)
    return cols
};
/**
 * 默认 操作 onDelect onEdit onLook
 * @param {*} columns 
 * @param {*} that 
 * @param {*} title 
 */
export const columnsAddAction = (d) => {
    const {columns, that, edittext, deltext, title, power, fixed, onDeleteItem, onEditItem, actionView, actionWidth, isPreventActionEvent, isShowActionDel } = d
    let { onSaveAddNewData, onSaveDeleteNewData } = d
    let width = 150
    if (!power) {
        //console.error('表格操作插件请输入组件power权限ID')
    }
    if (power && power.DEL_DATA && power.EDIT_DATA && power.LOOK_MORE) {
        width = 160
    }
    width = actionWidth || width
    // console.log('onDeleteItem', onDeleteItem)
    let obj = {
        // ...(fixed ? {fixed: fixed} : {}),
       // fixed: 'right',
        onCell: (record) => {
            return {
                onClick: (event) => {
                    // console.log('onCell record', record)
                    if (isPreventActionEvent) {
                        PreventActionEvent(event)
                    }
                }
            }
        },
        title: title || (<div style={{width: width}}>操作</div>),
        className: 'table-action table-action-action',
        width: width,
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
            if (record.isNoneAction) {
                return (
                    <span></span>
                )
            }
            if (actionView) {
                let view = actionView({
                    text, 
                    record, 
                    index, 
                    onDeleteItem: () => onDeleteItem ? onDeleteItem(record, index) : that.onDelete(record, index), 
                    onEditItem: () => onEditItem ? onEditItem(record, index) : that.onEdit(record, index),
                    DeleteButton: DeleteButton
                })
                if (view) {
                    return <ActionBox isPreventActionEvent={isPreventActionEvent} style={width ? {width: width} : {}}>{view}</ActionBox>
                }
            }
            const onDelete = () => { onDeleteItem ? onDeleteItem(record, index) : that.onDelete(record, index) }
            const onEdit = () => { onEditItem ? onEditItem(record, index) : that.onEdit(record, index) }
            const onLook = that && that.onLook ? () => { that.onLook(record, index) } : null
            const onSaveAddNewData1 = onSaveAddNewData ? () => { onSaveAddNewData(record, index) } : null
            const onSaveDeleteNewData1 = onSaveDeleteNewData ? () => { onSaveDeleteNewData(record, index) } : null
            // console.log('onSaveDeleteNewData', onSaveDeleteNewData, that)
            // console.log('Action0', power)
            if (record.isEdit) {
                return (
                    <div style={{userSelect: 'none',width: width}} className='table-action-box'>
                        <span
                            className={`action-button`}
                            onClick={(e) => {onSaveAddNewData1(e)}}
                        >
                            保存 
                        </span>
                        {
                            isShowActionDel && <DeleteButton
                                action={onSaveDeleteNewData1}
                            />
                        }
                    </div>
                )
            }
            //console.log('render action')
            return (
                <Action 
                    style={width ? {width: width} : {}}
                    isPreventActionEvent={isPreventActionEvent}
                    power={power}
                    edittext={edittext}
                    deltext={deltext}
                    record={record} 
                    index={index} 
                    onLook={onLook}
                    onDelete={onDelete} 
                    onEdit={onEdit}
                />
            )
            
        }
    }
    return [...columns, obj]
};
export const addAll = (d) => {
    //console.log('addAll', d)
    const {
        isNoneAction,
        isNoneNum
    } = d
    let cols = d.columns
    if (!isNoneNum) {
        cols = columnsAddNumber(d)
    }
    if (!isNoneAction) {
        cols = columnsAddAction(Object.assign({}, d, {columns: cols}))
    }
    return cols
}