import React, { Component } from 'react';
import { Row } from 'antd'
import { isArray } from '@src/utils'
import PropTypes from 'prop-types'
class CRow extends Component {
    static propTypes = {
        
    }

    static defaultProps = {
        
    }

    render() { 
        const props = this.props
        const type = props.type
        let view = props.children
        // console.log('props.children', props.children)
        if (!props.children) {
            //console.error('children is null in custom row, props is', props)
            return null
        }
        if (isArray(view)) {
            view = []
            let i = 0
            props.children.forEach((item) => {
                i++
                if (isArray(item)) {
                    return item.map(ele => {
                        //console.log('item map', ele)
                        view.push(React.cloneElement(ele, { type: type, key: i }))
                        i++
                    })
                } else {
                    if (item) {
                        view.push(React.cloneElement(item, { type: type, key: i }))
                    } else {
                        view.push(item)
                    }
                    //console.log('children item', item)
                }
            })
        } else if (view) {
            view = React.cloneElement(view, { type: type})
        }

        return (
            <Row
                {...Object.assign({}, props, { style: Object.assign({}, { marginLeft: 0, marginRight: 0 }, props.style)})}
                type="flex"
                align="middle"
                justify={type === 2 ? 'start' : 'space-between'}
                gutter={'gutter' in props ? props.gutter: 24}
            >
                {
                    view
                }
            </Row>
        )
    }
}
 
export default CRow;