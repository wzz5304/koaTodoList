import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class CellBox extends Component {
    // static propTypes = {
    //     children: PropTypes.element
    // }


    render() {
        const { boxClass, parentStyle, boxStyle, children } = this.props
        return(
            <div
                className='flex flex-vertical-center'
                style={{ position: 'absolute', width: '100%', left: 0 , top: 0, padding: '0 10px', height: '100%', ...parentStyle}}
            >
                <div
                    className={`text-overflow-ellipsis ${boxClass}`}
                    style={{ width: '100%', ...boxStyle}}
                >
                    {
                        children
                    }
                </div>
            </div>
        )
    }
}