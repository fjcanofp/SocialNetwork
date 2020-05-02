import React from 'react';

export const AlertTypes = {
    WARN : 1 , 
    SUCCESS : 2,
    ERROR : 3,
}

export default function Alert({ type, messages }, ...props) {  
    
    
    switch (type) {
        case AlertTypes.WARN:
            return (
                <div class="alert alert-warning" role="alert">
                    {messages}
                </div>
            )
            break;
        case AlertTypes.SUCCESS:
            return (
                <div class="alert alert-success" role="alert">
                    {messages}
                </div>
            )
            break
        case AlertTypes.ERROR:
            return (
                <div class="alert alert-danger" role="alert">
                    {messages}
                </div>
            )
            break
        default:
            return (<></>)
                break;
        }

}