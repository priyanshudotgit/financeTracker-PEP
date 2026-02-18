import React from 'react';
import StaggeredMenu from './StaggeredMenu';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../controllers/authController';

const Navbar = () => {
    const { theme } = useTheme();
    const { toggleTheme } = useTheme();
    const { logout } = useAuth();

    const menuItems = [
        { label: 'Dashboard', ariaLabel: 'Go to Dashboard', link: '/dashboard' },
        { label: 'Profile', ariaLabel: 'View Profile', link: '/profile' },
    ];

    const socialItems = [
        { label: 'ToggleTheme', action: 'toggleTheme' },
        { label: 'Logout', action: 'logout' }
    ];

    return (
        <StaggeredMenu
        theme={theme}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        onToggleTheme={toggleTheme}
        onLogout={logout}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={theme === 'dark' ? '#ffffff' : '#0f172a'}
        openMenuButtonColor={theme === 'dark' ? '#ffffff' : '#0f172a'}
        changeMenuColorOnOpen={true}
        colors={['#10b981', '#059669', '#ffffff']}
        logoUrl={theme === 'dark' ? '/logo-white.svg' : '/logo-dark.svg'}
        accentColor="#10b981" 
        isFixed={true}
        />
    );
};

export default Navbar;