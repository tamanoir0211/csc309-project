import {Link, Outlet} from "react-router-dom";
// import './style.css'

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/studios/search">Studio Search</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;