import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"

function Layout() {
    return (
        <div>
            <Navbar/>
            <Outlet>
                
            </Outlet>
            
        </div>
    )
}

export default Layout
