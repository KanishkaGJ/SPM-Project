import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import logo2 from '../Images/matchy.png'
import {useHistory} from 'react-router-dom'

export const SellerNavBar = () => {

    const history = useHistory();

    // const handleLogout=()=>{
    //     auth.signOut().then(()=>{
    //         history.push('/login');
    //     })
    // }

    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <Link className='navlink' to="/">
                    <img src={logo2} alt="logo"/>
                    </Link>
                </div>
            </div>
            <div className='rightside'>
           
                    <div><Link className='navlink' to="">My Shop</Link></div>
                    <div><Link className='navlink' to="">Add Products</Link></div>
                    <div><Link className='navlink' to="">LOGOUT</Link></div>

            </div>
            
        </div>

    )
}
