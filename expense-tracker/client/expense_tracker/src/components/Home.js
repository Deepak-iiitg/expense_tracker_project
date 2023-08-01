import React from 'react';
import Login from './Login';
function Home() {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">ExpenseTracker</span>
                </div>
            </nav>
            <Login />
        </>
    )
}
export default Home;