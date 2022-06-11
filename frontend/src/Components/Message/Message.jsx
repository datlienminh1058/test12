import React, { useState } from 'react'
import './Message.css'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import {  Typography } from "@mui/material";
import { useSelector } from 'react-redux'

export default  function Message ({message,own}) {
    const formatter = buildFormatter(frenchStrings);
    const {user} = useSelector((state) => state.user);
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={user.avatar?.url}
                    
                />
                
            <p className="messageText">
                {message.text}
            </p>
            </div>
            <div className="messageBottom"><TimeAgo date = {message.createdAt} formatter={formatter} /></div>

        </div>
    )
}

