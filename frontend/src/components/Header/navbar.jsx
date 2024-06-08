import React from 'react'
import {
    useState,
    useEffect,
    useRef
} from "react";
 import MenuItems from "./MenuItems"

// its displayu in menu
const menuItemsData = [
    {
      title: 'Home',
      url: '/',
    },
    {
        title: 'Services',
        url: '/services',
        submenu: [
          {
            title: 'Web Design',
            url: 'web-design',
          },
          {
            title: 'Web Development',
            url: 'web-dev',
            submenu: [
              {
                title: 'Frontend',
                url: 'frontend',
              },
              {
                title: 'Backend',
                submenu: [
                  {
                    title: 'NodeJS',
                    url: 'node',
                  },
                  {
                    title: 'PHP',
                    url: 'php',
                  },
                ],
              },
            ],
          },
          {
            title: 'SEO',
            url: 'seo',
          },
        ],
      },
    {
      title: 'About',
      url: '/about',
    },
  ];

const navbar = () => {
    const depthLevel = 0;

    return ( <nav className="desktop-nav">
        <ul className="menus">
          {menuItemsData.map((menu, index) => {
            return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          })}
        </ul>
      </nav>
    );
}

export default navbar