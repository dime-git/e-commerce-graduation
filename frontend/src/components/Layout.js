import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import CategoriesSidebar from './CategoriesSidebar';
import Footer from './Footer';

function Layout({ title, description, children, showSidebar = true }) {
  return (
    <div>
      <Helmet>
        <title>{title ? `${title} - Brendy` : 'Brendy'}</title>
        <meta
          name='description'
          content={description || 'E-commerce website'}
        />
      </Helmet>

      <Header />

      <div className='main-container'>
        {showSidebar && <CategoriesSidebar />}

        <main className='main-content'>{children}</main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
