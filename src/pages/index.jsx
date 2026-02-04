import Layout from "./Layout.jsx";
import Home from "./Home";
import Gallery from "./Gallery";
import Contact from "./Contact";
import About from "./About";
import Articles from "./Articles";
import Admin from "../Admin";
import Customer from "../Customer";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    Home: Home,
    Gallery: Gallery,
    Contact: Contact,
    About: About,
    Articles: Articles,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    const pathname = location.pathname.toLowerCase();

    // Check if we're on admin pages (no Layout wrapper needed)
    const isAdminPage = pathname.startsWith('/admin');

    // Check if we're on customer/auth pages (login, register, account)
    const isCustomerPage = pathname.startsWith('/login') ||
                           pathname.startsWith('/register') ||
                           pathname.startsWith('/account') ||
                           pathname === '/admin-login';

    if (isAdminPage) {
        return <Admin />;
    }

    if (isCustomerPage) {
        return <Customer />;
    }

    return (
        <Layout currentPageName={currentPage}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Gallery" element={<Gallery />} />
                <Route path="/About" element={<About />} />
                <Route path="/Articles" element={<Articles />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
