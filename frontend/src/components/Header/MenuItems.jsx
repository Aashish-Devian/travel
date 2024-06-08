import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    // dropdown closes after clicking in other area
    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
       }, [dropdown]);

       const onMouseEnter = () => {
        setDropdown(true);
       };
       
       const onMouseLeave = () => {
        setDropdown(false);
       };

       const closeDropdown = () => {
        dropdown && setDropdown(false);
      };

      const toggleDropdown = (e) => {
        e.stopPropagation();
        setDropdown((prev) => !prev);
      };

  return (
    <li className="menu-items" 
    ref={ref} 
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave} 
    onClick={closeDropdown} >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}>
            <Link to={items.url}>{items.title}</Link>
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
       ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {items.title}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  );
};


export default MenuItems;