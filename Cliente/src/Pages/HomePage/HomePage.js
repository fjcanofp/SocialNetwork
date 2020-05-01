import React from 'react';
import './homePage.css';
import AuthService from '../../Services/AuthService';

export default function Home() {

    const User = AuthService.getUserInfo();

    return (
        <div>
            <nav></nav>

        </div>
    )
}