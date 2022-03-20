import React from 'react'
import Icon from '@ant-design/icons'
const PauseSvg = () => (
    <svg fill="#ffffff" role="img" height="20" width="20" viewBox="0 0 24 24">
      <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>
    </svg>
  );
const PauseIcon = (props) => <Icon component={PauseSvg} {...props} />

export default PauseIcon