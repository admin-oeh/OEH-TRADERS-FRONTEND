import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const TawkToIntegration = () => {
  const { user, dealer, admin } = useApp();

  useEffect(() => {
    const updateTawkVisitorData = () => {
      if (!window.setTawkVisitorData) return;

      if (user) {
        const userData = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          company: user.company_name || 'Individual Customer',
          phone: user.phone || '',
          user_id: user.id.toString(),
          hash: btoa(user.email).substring(0, 16),
        };
        window.setTawkVisitorData(userData);
      } else if (dealer) {
        const dealerData = {
          name: dealer.contact_name,
          email: dealer.email,
          company: dealer.company_name,
          phone: dealer.phone || '',
          user_id: `dealer_${dealer.id}`,
          user_type: 'dealer',
          hash: btoa(dealer.email).substring(0, 16),
        };
        window.setTawkVisitorData(dealerData);
      } else if (admin) {
        const adminData = {
          name: admin.username,
          email: 'admin@oehtraders.com',
          company: 'OEH TRADERS',
          user_id: `admin_${admin.id}`,
          user_type: 'admin',
          hash: btoa(admin.username).substring(0, 16),
        };
        window.setTawkVisitorData(adminData);
      }
    };

    const storeUserData = () => {
      if (user) {
        const userData = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          company_name: user.company_name,
          phone: user.phone,
          id: user.id,
        };
        localStorage.setItem('user_data', JSON.stringify(userData));
      } else if (dealer) {
        const dealerData = {
          name: dealer.contact_name,
          email: dealer.email,
          company_name: dealer.company_name,
          phone: dealer.phone,
          id: `dealer_${dealer.id}`,
        };
        localStorage.setItem('user_data', JSON.stringify(dealerData));
      } else {
        localStorage.removeItem('user_data');
      }
    };

    updateTawkVisitorData();
    storeUserData();

    // Track page view for Tawk.to
    const trackPageView = () => {
      if (window.Tawk_API && window.Tawk_API.page) {
        window.Tawk_API.page();
      }
    };

    trackPageView();
  }, [user, dealer, admin]);

  return null;
};

export default TawkToIntegration;
