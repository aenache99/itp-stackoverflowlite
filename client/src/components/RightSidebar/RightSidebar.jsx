import React from 'react'
import './RightSidebar.css'
import Widget from './Widget'
import WidgetTags from './WidgetTags'
import WidgetMetrics from "./WidgetMetrics";

const RightSidebar = () => {
    return (
        <aside className='right-sidebar'>
            <Widget />
            <WidgetMetrics />
            <WidgetTags />
        </aside>
    )
}

export default RightSidebar