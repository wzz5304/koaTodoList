import React from 'react'
import { ColumnItemBox } from '@src/components/table_template'

// /* 
// // 表格列工厂
// columnItem: [key, title, width, render], render: 'default' || ({ key, val, row, rowIndex, ColumnItemBox, defaultRender }) => {}
// */

const ColumnFactory = (function () {
    const defaultRender = (val) => (
        <ColumnItemBox name={val} />
    )
    const strategy = ([key, title, width, render, opt]) => {
        const titleStyle = opt && opt.tStyle ? opt.tStyle : {}
        const t = (
            <span
                className='text-overflow-ellipsis'
                style={{
                    width: width ? width - 22 : width,
                    display: 'inline-block',
                    lineHeight: 1,
                    ...titleStyle
                }}
                title={title}
            >
                {title}
            </span>
        )
        const Action = {
            textCell: ([key, title, width, render]) => ({
                className: 'text-overflow-ellipsis',
                title: t,
                dataIndex: key,
                key,
                width,
                ...opt,
                render: (val) => (
                    <ColumnItemBox name={val} />
                )
            }),
            renderCell: ([key, title, width, render]) => ({
                className: `text-overflow-ellipsis`,
                title: t,
                dataIndex: key,
                key,
                width,
                ...opt,
                render: (val, row, rowIndex) => render({ key, title, val, row, rowIndex, ColumnItemBox, defaultRender: defaultRender })
            })
        }
        if (render === 'default') {
            return Action['textCell']([key, title, width, render])
        } else {
            return Action['renderCell']([key, title, width, render])
        }
    }
    return {
        execute (columns) {
            if (columns.length) {
                return columns.map((col) => strategy(col))
            }
            return []
        }
    }
})()

export default ColumnFactory