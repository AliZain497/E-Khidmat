import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        // Whenever route changes, refresh AOS
        AOS.refresh();
    }, [location.pathname]);

    return (
        <>
            {children}
        </>
    );
}

export default Layout;
