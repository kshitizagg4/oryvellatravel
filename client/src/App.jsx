import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cruises from './pages/Cruises.jsx';
import CruiseDetail from './pages/CruiseDetail.jsx';
import CruiseLines from './pages/CruiseLines.jsx';
import CruiseLineDetail from './pages/CruiseLineDetail.jsx';
import Destinations from './pages/Destinations.jsx';
import DestinationDetail from './pages/DestinationDetail.jsx';
import Deals from './pages/Deals.jsx';
import ShipDetail from './pages/ShipDetail.jsx';
import Book from './pages/Book.jsx';
import Confirmation from './pages/Confirmation.jsx';
import MyBookings from './pages/MyBookings.jsx';
import StaticPage from './pages/Static.jsx';
import Contact from './pages/Contact.jsx';
import Guides from './pages/Guides.jsx';
import GuideDetail from './pages/GuideDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminLogin from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ResourceList from './pages/admin/ResourceList.jsx';
import ResourceForm from './pages/admin/ResourceForm.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cruises" element={<Cruises />} />
          <Route path="/cruises/:id" element={<CruiseDetail />} />
          <Route path="/cruise-lines" element={<CruiseLines />} />
          <Route path="/cruise-lines/:slug" element={<CruiseLineDetail />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/ships/:slug" element={<ShipDetail />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/booking/:ref" element={<Confirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<StaticPage page="about" />} />
          <Route path="/privacy" element={<StaticPage page="privacy" />} />
          <Route path="/terms" element={<StaticPage page="terms" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuideDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path=":resource" element={<ResourceList />} />
            <Route path=":resource/new" element={<ResourceForm />} />
            <Route path=":resource/:id/edit" element={<ResourceForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
