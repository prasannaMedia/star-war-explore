import React from 'react';
import { API_ENDPOINTS } from '../constants/api';

const Menu = ({ selectedMenu, setSelectedMenu ,setPage}) => {
  const menuItems = Object.keys(API_ENDPOINTS);


  return (
    <nav>
      {menuItems.map((item) => (
        <button
          key={item}
          onClick={() => {
            setPage(1)
            window.history.replaceState({}, document.title);

            setSelectedMenu(item);

            return () => {
              navigate(location.pathname, { replace: true, state: null });
            };

          }}
          style={{
            marginRight: '10px',
            padding: '8px 12px',
            cursor: 'pointer',
            background: selectedMenu === item ? '#4CAF50' : '#ccc',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default Menu;
