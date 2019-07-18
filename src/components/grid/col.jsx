import React, { Component } from 'react'
import { Col} from 'antd'
import './index.less'
class ColItem extends Component {

    static defaultProps = {
        propsStyle: {},
        style: {},
        contentStyle: {}
    }

    state = {
    }

    constructor(props) {
        super(props);
    }

    render() { 
        let props = this.props
        const style1 = { ...props.type === 2 ? {padding: '5px 0px', fontSize: '12px', margin: '5px 0'} : {padding: '5px 0px'}, ...props.contentStyle}
        const style2 = { ...props.type === 2 ? {padding: '0px 8px', borderBottom: '1px solid #eee'} : {}, ...props.contentStyle}
        // const style1 = props.type === 2 ? {padding: '5px 0px', fontSize: '14px', margin: '5px 0'} : {padding: '5px 0px'}
        // const style2 = props.type === 2 ? {padding: '0px 8px', borderBottom: '1px solid #eee'} : {}
        //console.log('props.style', props.style, style1, style2)
        if (!props.label && props.children) {
            return (
                <Col offset={props.offset} span={props.span}>
                    {
                        props.children
                    }
                </Col>
            )
        }
        // console.log('props.children', props.children)
        return (
            <Col offset={props.offset} span={props.span}>
                {
                    props.label  ?
                        <div className={props.isNoCenter || props.labelInTop ? 'flex' : 'flex flex-vertical-center'} style={Object.assign({}, style1, props.propsStyle)}>
                            <div>
                                {
                                    props.isRequired ?
                                    <span style={{position: 'relative'}}>
                                        <i style={{color: 'red', fontWeight: 'bold', position: 'absolute', left: -8}}>*</i>
                                    </span>
                                    :
                                    null
                                }
                                <span style={{color: '#888888'}}>
                                {
                                    React.isValidElement(props.label) ?
                                        props.label
                                    :
                                    props.label ? 
                                        `${props.label}${props.colon === true ? ' ' : '：'}` 
                                    : 
                                        ''
                                }
                                </span> 
                            </div>
                            <div className={ props.isWrap ? 'flex1' : 'flex1 text-overflow-ellipsis'} style={style2} >
                                {
                                    //props.children
                                    props.type === 2 ? 
                                    <span
                                        className={props.isWrap ? '' : 'text-overflow-ellipsis'}
                                        style={{color: '#484848'}}
                                        title={props.text}>
                                        {props.text ? props.text : '无'}&nbsp;
                                    </span>
                                    :
                                    props.children
                                }
                            </div>
                        </div>
                    :
                    <div className='flex flex-vertical-center' style={Object.assign({}, style1, props.style)}>
                    </div>
                }
            </Col>
        )
    }
}
 
export default ColItem;