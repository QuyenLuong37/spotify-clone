import React from 'react'
import Icon from '@ant-design/icons'
const PlaySvg = () => (
    <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="#ffffff"
        height="100%"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
    >
        <path d="M4.018 14L14.41 8 4.018 2z"></path>
    </svg>
)
const PlayIcon = (props) => <Icon component={PlaySvg} {...props} />

export default PlayIcon