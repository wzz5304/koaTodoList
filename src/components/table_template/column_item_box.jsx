import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class ColumnItemBox extends Component {
    static propTypes = {
        isModeTag: PropTypes.bool, //是否 tag 模式显示
        tagBgc: PropTypes.string, //tag背景色
        pStyle: PropTypes.object, //cell样式
        style: PropTypes.object, //样式
        name: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        tagName: PropTypes.string, //tag字符
        active: PropTypes.bool, //是否 选中 状态
        className: PropTypes.string, //样式名
        isFormChild: PropTypes.bool, //是否表单子元素
        hasPoint: PropTypes.bool, //是否带圆点
        pointBgc: PropTypes.string, //圆点背景色
        boxClass: PropTypes.string, //div样式class名
    }
    
    static defaultProps = {
        isModeTag: false,
        tagBgc: '#2db7f5',
        pStyle: {},
        style: {},
        name: '',
        tagName: null,
        active: false,
        className: '',
        boxClass: '',
        isFormChild: false,
        hasPoint: false,
        pointBgc: '#87D068'
    }

    render() {
        let { className, boxClass, pStyle, active, name, style, isModeTag, tagBgc, tagName, tagStyle, children, isFormChild, hasPoint, pointBgc } = this.props
        return(
            <div
                className={`text-overflow-ellipsis ${className} ${active && 'cus-table-cell-active'}`}
                style={{ position: 'absolute', width: '100%', left: 0, right: 0, top: 0, bottom: 1, padding: 10, ...pStyle}}
            >
                <div
                    title={name}
                    className={`text-overflow-ellipsis ${boxClass}`}
                    style={{ width: '100%', margin: isFormChild ? '-6px 0 -7px' : 0, ...style}}
                >
                    {
                        children ?
                        children
                        :
                        <Fragment>
                            {
                                hasPoint ?
                                <span style={{width: 8, height: 8, marginRight: 6, display: 'inline-block', borderRadius: '50%', backgroundColor: pointBgc}}></span> : null
                            }
                             <span 
                                className="text-overflow-ellipsis"
                                style={{width: `calc(100% - 62)`}}
                            >
                                {(name || !isNaN(name) || name === 0) ? name : tagName ? '' : '-'}
                            </span>
                            {
                                isModeTag ? <span style={{
                                    height: 18,
                                    lineHeight: '18px',
                                    color: '#fff',
                                    padding: '2px 7px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    backgroundColor: tagBgc,
                                    marginLeft: name ? 4 : 0,
                                    ...tagStyle
                                }}>{tagName}</span> : null
                            }
                        </Fragment>
                    }
                </div>
                &emsp;
            </div>
        )
    }
}