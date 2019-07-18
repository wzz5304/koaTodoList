import React, { Component } from 'react'
import { Table, message, Button, Popover, Popconfirm, Pagination   } from 'antd'
import * as TablePlugin from './action.jsx'
import PropTypes from 'prop-types'
import { Resizable } from 'react-resizable'
// import { Popconfirm } from 'antd'
import { isArray } from '@src/utils'
import CellBox from './cell_box'
import './tableview.less'

/* 表格列拖动 */
const ResizeableTitle = (props) => {
    let { onResize, width, ...restProps } = props;
    if (!width || props.className === 'table-action table-action-action') {
        return <th {...restProps} />;
      }
  
    return (
      <Resizable width={width} height={0} onResize={onResize}>
        <th>
            <CellBox>
                <div {...restProps}></div>
            </CellBox>
        </th>
            
      </Resizable>
    )
}

const TableHeader = (props) => {
    let { 
        TableHeaderChildren,
        TableHeaderTitle,
        getPopupContainer,
    } = props
    getPopupContainer = getPopupContainer || (() => document.body)
    // console.log('columns', props.columns)
    return (
        <div className="flex flex-vertical-center" >
             <div className="flex1" style={{textAlign: 'left'}}>
                {
                    TableHeaderTitle ? 
                    TableHeaderTitle
                    :
                    null
                }
            </div>
            <div className="flex1" style={{textAlign: 'right'}}>
                {
                    TableHeaderChildren ? 
                    TableHeaderChildren
                    :
                    null
                }
            </div>
        </div>
    )
}

/**
 * 表格模板
 * 
 * @class TableView
 * @extends {Component}
 */

class TableView extends Component {

    static propTypes = {
        style: PropTypes.object, //样式
        isForceKey: PropTypes.bool, // 是否在无id的项中强制加入index字段
        onRowClick: PropTypes.func, // 行点击事件
        columns: PropTypes.array.isRequired, // table columns 参照antd3.0以后table组件
        isNoneSelected: PropTypes.bool, // 是否不需要显示check列
        isNoneNum: PropTypes.bool, // 是否不需要显示序号列
        isNonePagination: PropTypes.bool, //是否不需要显示分页
        actionView: PropTypes.func, // 定制action view函数 , 函数
        actionWidth: PropTypes.number, // action列宽度, 必须填整数（最小为90）
        selectedPropsRowKeys: PropTypes.array, // 设置选中项的数组，以id为标识
        getCheckboxProps: PropTypes.func, // 设置table行checkbox点击状态 return {disabled: bool}
        isPreventActionEvent: PropTypes.bool, // 是否阻止actionview点击事件冒泡
        isNoneAction:  PropTypes.bool, // 是否不需要显示操作栏
        tableHeight: PropTypes.number, // 表格高度
        columnKey: PropTypes.string, //列定义key值
        isNoneScroll: PropTypes.bool, //是否不需要滚动
        noPadding: PropTypes.bool, // 是否取消公共样式默认padding
        noTitlebar: PropTypes.bool, //是否没有顶部栏
        batchDel: PropTypes.func, // 表格顶部删除按钮 确认click事件
        onEditItem: PropTypes.func, //表格操作编辑 click事件 (record, index) => {} record:行数据, index: 行索引
        onSaveAddNewData: PropTypes.func, //表格操作编辑保存 click事件 (record, index) => {} record:行数据, index: 行索引
        onSaveDeleteNewData: PropTypes.func, //表格操作删除确认（保存） click事件 (record, index) => {} record:行数据, index: 行索引
        onDeleteItem: PropTypes.func, //表格操作删除确认(编辑) click事件 (record, index) => {} record:行数据, index: 行索引
        modalName: PropTypes.string, // 新建编辑按钮默认打开的弹窗指针名
        isCustomPagination: PropTypes.bool, //是否自定义分页显示
        handleTableChange: PropTypes.func, //表格改变触发
        isShowActionDel: PropTypes.bool, //是否显示action删除
        isHideHeaderTitle: PropTypes.bool, //是否显示表头
        isCusSource: PropTypes.bool, //是否自定义 dataSource
        sourceList: PropTypes.array, //自定义dataSource 数据
        cusNumColRender: PropTypes.func, //自定义序号列render方法 (t, record, index) => {}
        cusSelection: PropTypes.func, //自定义选择列 (otp) => {}
        cusLoading: PropTypes.bool, //自定义loading
        edittext: PropTypes.string, //action编辑文字
        isNotFilter: PropTypes.bool, //是否不过滤拖拽
        type: PropTypes.string, // 多选/单选，checkbox or radio
        handleFilter: PropTypes.func, // 过滤func
    }

    static defaultProps = {
        actionAuth: [],
        loading: false,
        actionView: null,
        columns: [],
        isNoneSelected: false,
        isNoneNum: false,
        isNonePagination: false,
        isPreventActionEvent: false,
        columnKey: 'columns',
        isNoneScroll: false,
        style: null,
        noPadding: false,
        noTitlebar: false,
        modalName: 'addoredit',
        isShowActionDel: true,
        isCusSource: false,
        sourceList: [],
        cusNumColRender: null,
        cusSelection: null,
        cusLoading: false,
        isNotFilter: false
    }
    
    state = {
        selectedRowKeys: {},
        dataSource: [],
        limit: 10,
        pagination: { position: 'bottom', pageSize: 10, current: 1, showSizeChanger: true },
        importLoading: false
    }

    originCol = null

    constructor(props) {
        super(props)
        const { getThis } = props
        this.parent = props.parent
        if (this.parent) {
            this.parent.tableView = this
        }
       
        if (getThis) {
            getThis(this)
        }
    }

    componentDidMount() {
        const { isCusSource } = this.props
        if (!isCusSource) {
            this.initData()
        }
    }

    initData = () => {
        let { dataSource } = this.state
        if (dataSource.length < 1) {
            this.getData()
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        // console.log('handleTableChange', pagination, filters, sorter)
        const { isCusSource, handleFilter, handleTableChange } = this.props
        let pager = { ...this.state.pagination }
        pager.current = pagination.current
        if (handleTableChange) {
            handleTableChange(pagination)
            return
        }
        if (filters && isCusSource && handleFilter) {
            handleFilter(filters)
            return
        }
        this.setState({
          pagination: pager
        }, () => {
            this.getData(() => {}, filters)
        })
    }

    clearDataSouce = () => {
        this.setState({dataSource: []}, () => {
            // console.log('clearDataSouce', this.state.dataSource)
            // callback()
        })
    }

    updateDataTableSource = (data, callback) => {
        //console.log('updateDataTableSource', data)
        this.setState({
            dataSource: data
        }, callback)
    }

    getTableSource = () => {
        return this.state.dataSource
    }

    getData = (callback, filters) => {
        let { getData, params, noLoading } = this.props
        const pager = { ...this.state.pagination }
        params = params || {}
        // 过滤项处理
        if (filters) {
            let newFilters = {}
            for (let key of Object.keys(filters)) {
                if (filters[key] instanceof Array && filters[key].length) {
                    let newKey = `${key}Filters`
                    Object.assign(newFilters, {
                        [newKey]: filters[key]
                    })
                }
            }
            params = Object.assign({}, params, { ...newFilters })
            // console.log('filters', filters, params, newFilters)
        }
        this.setState({loading: noLoading ? false : true})
        let dealParams = Object.assign({}, {
            offset: pager.pageSize * (pager.current - 1),
            limit: pager.pageSize,
            pageNo: pager.current,
            pageSize: pager.pageSize
        }, params)
        return getData(dealParams)
            .then(async d => {
                pager.total = d.total
                pager.showTotal = total => `共 ${total} 条`
                await this.setState({
                    dataSource: d.dataSource || [], 
                    loading: false, 
                    pagination: pager
                })
                if ((typeof (callback)).toUpperCase() === 'FUNCTION') {
                    callback(this.state.dataSource)
                }
            })
            .catch(() => {
                this.setState({loading: false})
            })
    }

    clearDataSource = () => {
        this.setState({
            dataSource: [],
            pagination: {
                ...this.state.pagination,
                total: 0,
                showTotal: `共 ${0} 条`
            }
        })
    }

    updateData = (d) => {
        let { dataSource } = this.state
        dataSource = dataSource.map(value => {
            if (value.id === d.id) {
                return Object.assign({}, value, d)
            }
            return value
        })
        this.setState({
            dataSource: dataSource
        })
    } 

    refresh = () => {
        this.setState({selectedRowKeys: {}, loading: false}, () => {
            this.getData()
        })
    }

    onSearch = (callback) => {
        this.setState({selectedRowKeys: {}, pagination: {
            ...this.state.pagination,
            current: 1
        }}, () => {
            this.getData(callback)
        })
    }

    onShowSizeChange = (current, size) => {
        const pager = { ...this.state.pagination }
        pager.current = current
        pager.pageSize = size
        this.state.pagination = pager
        this.setState({pagination: pager}, () => {
            this.onSearch()
        })
    }

    getAddOrEdit = (d) => {
        this[this.props.modalName] = d
    }


    delete = (params) => {
        let { rApi, power } = this.props
        if (params && Object.prototype.toString.call(params) === '[object Array]') {
            if (typeof params[0] === 'object') {
                params = params.map((item) => {
                    return item.id
                })
            }
        } else if (params) {
            if (typeof params === 'object') {
                params = params.id
            }
            params = [params]
        }
        // console.log('params', params)
        return rApi[power.DEL_DATA.apiName](params).then(() => {
            message.success('操作成功！')
            this.getData()
        }).catch(e => {
            message.error(e.msg || '操作失败！')
        })
    }

    /* 表格操作列默认 编辑onClick 事件 */
    onEdit = (record, index) => {
        const { modalName } = this.props
        if (this.parent && this.parent[modalName]) {
            this.parent[modalName].show({
                edit: true,
                data: record,
                index: index
            })
        }
    }

    /* 表格操作列默认 删除确认onClick 事件 */
    onDelete = (record, index) => {
        this.delete(record)
    }

    /* 表格操作列默认 查看onClick 事件 */
    onLook = (record, index) => {
        // todo 查看数据详情
        const { modalName } = this.props
        if (this.parent && this.parent[modalName]) {
            this.parent[modalName].show({
                edit: false,
                data: record,
                index: index
            })
        }
    }

    onChangeShowColumn = (checked, index) => {
        const {columnKey} = this.props
        const onChangeShowColumn = this.parent.onChangeShowColumn
        if (onChangeShowColumn) {
            onChangeShowColumn(checked, index, columnKey)
        }
    }

    onChangeSelect = (keys, selectedRows) => {
        // console.log('onChangeSelect', selectedRows, keys)
        const { onChangeSelect } = this.props
        let selectedRowKeys = this.state.selectedRowKeys
        if (selectedRows) {
            selectedRowKeys[keys.id] = keys
        } else {
            delete selectedRowKeys[keys.id]
        }
        // console.log('onChangeSelect', selectedRowKeys, selectedRows)
        if (onChangeSelect) {
            onChangeSelect(selectedRowKeys, {
                deleteKeys: selectedRows ? [] : [keys],
                addKeys: selectedRows ? [keys] : [],
            })
        }
        this.setState({selectedRowKeys: selectedRowKeys})
    }

    onSelectAll = (selected, selectedRows, changeRows) => {
        // console.log('onSelectAll', selected, selectedRows, changeRows)
        const { onChangeSelect } = this.props
        let selectedRowKeys = []
        if (selected) {
            selectedRows.forEach(ele => {
                selectedRowKeys[ele.id] = ele
            })
        }
        if (onChangeSelect) {
            onChangeSelect(selectedRowKeys, {
                deleteKeys: selected ? [] : changeRows,
                addKeys: selected ? changeRows : [],
            })
        }
        this.setState({selectedRowKeys: selectedRowKeys})
    }

    getSelectKeys = ({selectedPropsRowKeys, selectedRowKeys}) => {
        const { getSelectKeys } = this.props
        // console.log('getSelectKeys', getSelectKeys)
        if (getSelectKeys) {
            return getSelectKeys({selectedPropsRowKeys, selectedRowKeys})
        }
        return selectedPropsRowKeys ?
        selectedPropsRowKeys.map(item => {
            return item.id
        })
        :
        Object.keys(selectedRowKeys).map(item => {
            return selectedRowKeys[item].id
        })
    }

    calColumnsWidth = (columns) => {
        // this.state = {}
        let assignedWidth = []
        columns.map(item => {
            if (item.width && item.width !== 'auto') {
                assignedWidth.push(item.width) 
            }
            return item
        })
        let width = 1100
        
        if (assignedWidth.length > 0) {
            width -= assignedWidth.reduce((pre, curr) => pre + curr)
        }
        let length = columns.length - assignedWidth.length
        if ((width / length) < 60) {
            width = 150
        }
        assignedWidth = []
        columns = columns.map(item => {
            let w = item.width
            if (!item.width || item.width === 'auto' && !item.fixed) {
                if (item.minWidth && (item.minWidth > width / length || item.minWidth > width)) {
                    w = item.minWidth
                } else {
                    w = width / length
                }
            }
            assignedWidth.push(w)
            return {
                ...item,
                width: w
            }
        })
        if (columns[columns.length - 1].fixed) {
            if (assignedWidth.reduce((pre, curr) => pre + curr) < 1100)
            columns[columns.length - 2].width =  1100 - assignedWidth.reduce((pre, curr) => pre + curr)
        }
        return columns
    }

    handleResize = column => (e, { size, ...resetProps }) => {
        const  { parent, columnKey } = this.props
        parent.setState(prevState => {
            const nextColumns = [...prevState[columnKey]]
            let index = null
            nextColumns.map((item, i) => {
                if (item.dataIndex === column.dataIndex && column.key !== 'action') {
                    index = i
                }
            })
            if (typeof index === 'number') {
                if (size.width < 50) {
                    size.width = 50
                }
                // console.log(size.width)
                nextColumns[index] = {
                    ...nextColumns[index],
                    width: size.width
                }
            }
            // console.log('handleResize', index, size, nextColumns)
            return { [columnKey]: nextColumns }
        })
    }

    components = {
        // header: {
        //   cell: (props) => ResizeableTitle({originCol: this.originCol, ...props}),
        // }
        header: {
            cell: ResizeableTitle,
        }
    }


    render() { 
        const { 
            isForceKey,
            isNoneSelected,
            actionView, // 定制action view函数
            actionWidth, // actionView 宽度
            fixed, 
            columns, 
            power, 
            onSaveAddNewData, 
            onSaveDeleteNewData, 
            onDeleteItem, 
            onEditItem,
            isNoneAction,
            isNonePagination,
            isNoneNum,
            style,
            scroll,
            selectedPropsRowKeys, // 设置选中项的数组，以id为标识
            getCheckboxProps,
            rowKey,
            onRowClick, // 行点击
            isPreventActionEvent,
            getPopupContainer,
            calaCellWidth,
            tableHeight,
            tableWidth,
            isNoneScroll,
            noPadding,
            noTitlebar,
            isCustomPagination,
            isShowActionDel,
            isCusSource,
            sourceList,
            cusNumColRender,
            cusSelection,
            cusLoading,
            edittext,
            isNotFilter,
            type,
        } = this.props
        const { dataSource, loading } = this.state
        let { selectedRowKeys } = this.state
        let cols = columns.filter(ele => {
            return !ele.isNoDisplay
        })
        
        const selectionOpt = {
            fixed: true,
            selectedRowKeys: this.getSelectKeys({
                selectedPropsRowKeys,
                selectedRowKeys
            }),
            onSelectAll: this.onSelectAll,
            onSelect: this.onChangeSelect,
            getCheckboxProps: record => {
                if (getCheckboxProps) {
                    return getCheckboxProps(record)
                }
                return {
                    disabled: false
                }
            },
            type: type || 'checkbox '
        }
        const rowSelection = cusSelection !== null ? cusSelection(selectionOpt) : selectionOpt

        let THeader = this.props.THeader || TableHeader
        if (isArray(cols) && cols.length > 0 && !calaCellWidth) {
            for (let i = cols.length - 1; i > 0 ; i--) {
                if (cols[i].width && !('fixed' in cols[i])) {
                    cols[i] = {...cols[i]}
                    delete cols[i].width
                    break
                }
                if (!('fixed' in cols[i]) && !cols[i].width) {
                    break
                }
            }
        }

        cols = TablePlugin.addAll({
            isNoneAction,
            isNoneNum,
            actionView: actionView,
            columns: cols,
            that: this,
            power: power,
            actionWidth: actionWidth,
            fixed: fixed || null,
            onSaveAddNewData: onSaveAddNewData,
            onSaveDeleteNewData: onSaveDeleteNewData,
            onDeleteItem: onDeleteItem,
            onEditItem: onEditItem,
            isPreventActionEvent: isPreventActionEvent,
            isShowActionDel,
            cusNumColRender,
            edittext
        })
      
        const allWidth = cols instanceof Array && cols.length && cols.reduce((pre, curr) => { /* 表格所有列宽度 */
            if (typeof curr.width === 'number') {
                return {width: pre.width + curr.width}
            } else if (typeof curr.minWidth === 'number') {
                return {width: pre.width + curr.minWidth}
            } else {
                return {width: pre.width + 100}
            }
        }).width
      
        return (
            <div 
                style={{...(noPadding ? { padding: 0 } : {}), ...style}} 
                className={this.props.className && `tableview-box ${this.props.className}` || 'tableview-box'}>
                <Table 
                    defaultExpandAllRows
                    bordered={(this.props.bordered === false) ? false : true}
                    size={this.props.size ? this.props.size : 'default'}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                if(onRowClick) {
                                    onRowClick(record, rowIndex)
                                }
                            } // 点击行
                        }
                    }}
                    title={
                        noTitlebar ? null : this.props.THeader ?
                        () => THeader
                        :
                        () => 
                        <THeader 
                            {...this.props}
                            getPopupContainer={getPopupContainer}
                            columns={columns} 
                            onChangeShowColumn={this.onChangeShowColumn} 
                            isNotFilter={isNotFilter}
                        />
                    }
                    scroll={isNoneScroll && {x: false, y: false} || ('scroll' in this.props && scroll || {y: tableHeight ? tableHeight + 20 : false, x: allWidth + ((tableWidth || tableWidth === 0) ? tableWidth : 350)})}
                    rowKey={(record, index) => {
                        if (rowKey) {
                            return rowKey(record, index)
                        }
                        // console.log('rowKey', record.id || (isForceKey ? `index${index}`: index))
                        return record.id || (isForceKey ? `index${index}`: index)
                    }}
                    dataSource={isCusSource ? sourceList : dataSource}
                    columns={
                        cols.map((col, index) => ({
                            ...col,
                            onHeaderCell: column => ({
                                width: column.width,
                                onResize: this.handleResize(column),
                            }),
                        }))
                    }
                    components={this.components}
                    loading={cusLoading || loading}
                    rowSelection={isNoneSelected ? null : rowSelection}
                    onChange={this.handleTableChange}
                    expandedRowRender={this.props.expandedRowRender}
                    pagination={
                        isNonePagination || isCustomPagination ?
                        false
                        :
                            'pagination' in this.props ? this.props.pagination :
                            {
                                ...this.state.pagination, 
                                onShowSizeChange: this.onShowSizeChange
                            }
                    }
                />
                <div>
                    {
                        isCustomPagination && !isNonePagination &&
                        <Pagination
                            className={'tb-custom-pagination'}
                            onChange={(page, pageSize) => this.handleTableChange({
                                ...this.state.pagination,
                                current: page
                            })}
                            onShowSizeChange={this.onShowSizeChange}
                            {...this.state.pagination} />
                    }
                </div>
            </div>
        )
    }
}
 
export default TableView;