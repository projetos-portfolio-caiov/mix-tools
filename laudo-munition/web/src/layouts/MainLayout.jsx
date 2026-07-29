import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

function MainLayout() {

    return (

        <div className={styles.mainContainer}>
            
            <Navbar />

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout