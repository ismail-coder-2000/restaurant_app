import {Component} from 'react'
import './index.css'

class MenuCategory extends Component {
  render() {
    const {data, activeMenuId, onClick} = this.props
    return (
      <li className="menu-container">
        {data?.table_menu_list?.map(menu => {
          const isActive = menu.menu_category_id === activeMenuId
          return (
            <button
              className={`menu-category ${isActive ? 'active' : ''}`}
              key={menu.menu_category_id}
              onClick={() => onClick(menu.menu_category_id)}
              type="button"
            >
              {menu.menu_category}
            </button>
          )
        })}
      </li>
    )
  }
}

export default MenuCategory
