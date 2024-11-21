import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import '../styles/Header.css'

const ActivityList = () => {

    return (
        <div class="header">
            <a href="/">Home</a>
            <a href="/stats">Stats</a>
            <a href="/activity">Add New Activity</a>
            <a href="/about">About</a>
        </div>
    )
}

export default ActivityList