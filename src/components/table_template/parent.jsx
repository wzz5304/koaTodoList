import React, { Component } from 'react'
import update from 'immutability-helper'

class Parent extends Component {

    onChangeCheckbox = (checked, index) => {
        this.state.columns[index].isNoDisplay = !checked
        this.setState({columns: this.state.columns})
    }
    
    moveColumn = (dragIndex, hoverIndex, columnKey) => {
        // console.log('dragIndex', dragIndex, hoverIndex, columnKey)
        const columns = this.state[columnKey]
		const dragCard = columns[dragIndex]
		this.setState(
			update(this.state, {
                [columnKey]: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
    }

    /**
     * 搜索条件发生改变
     * @memberOf Parent
     */
    searchCriteria = (callback) => {
        if (this.tableView) {
            this.tableView.onSearch(callback)
        }
    }

    /**
     * 搜索条件发生改变
     * @memberOf Parent
     */
    refresh = (callback) => {
        if (this.tableView) {
            this.tableView.refresh(callback)
        }
    }

    // 更新 dataSource 数据
    updateDataTableSource = (dataSource, callback) => {
        if (this.tableView) {
            this.tableView.updateDataTableSource(dataSource, callback)
        }
    }

    upd = (dataSource, callback) => {
        if (this.tableView) {
            this.tableView.updateDataTableSource(dataSource, callback)
            if (!this.state._changeListForchRender) {
                this.setState({ _changeListForchRender: 'ttt' })
            }
        }
    }

    // 获取 dataSource 数据
    getTableSource = () => {
        if (this.tableView) {
            return this.tableView.getTableSource()
        }
        return []
    }

    gd = () => {
        if (this.tableView) {
            return this.tableView.getTableSource()
        }
        return []
    }

    onDeletes = () => {
        if (this.tableView) {
            this.tableView.onDeletes()
        }
    }

    onChangeShowColumn = (checked, index, columnKey) => {
        let columns = this.state[columnKey]
        this.setState(
			update(this.state, {
                [columnKey]: {
					[index]: {
                        $set: Object.assign({}, columns[index], {isNoDisplay: !checked})
                    }
				}
			})
		)
    }

}
 
export default Parent;