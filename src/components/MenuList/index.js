import {Component} from 'react'
import './index.css'

class MenuList extends Component {
  render() {
    const {data, activeMenuId, cart, onRemoveClick, onAddClick} = this.props
    const menu = data?.table_menu_list?.find(
      menu_ => menu_.menu_category_id === activeMenuId,
    )

    return (
      <li className="menu-list-container">
        {menu?.category_dishes?.map(item => {
          // length of this items dish_id in cart
          const cartCount = cart.filter(id => id === item.dish_id).length

          return (
            <div className="menu-list-item" key={item.dish_id}>
              {item.dish_Type === 2 && (
                <div className="menu-list-item-vlabel-container">
                  <img
                    src="/images/veg.png"
                    alt="veg"
                    className="menu-list-item-vlabel-image"
                  />
                </div>
              )}

              {item.dish_Type === 1 && (
                <div className="menu-list-item-vlabel-container">
                  <img
                    src="/images/non-veg.png"
                    alt="non-veg"
                    className="menu-list-item-vlabel-image"
                  />
                </div>
              )}
              <div className="menu-list-item-details">
                <h1 className="menu-list-item-name">{item.dish_name}</h1>
                <p className="menu-list-item-price">
                  {item.dish_currency} {item.dish_price}
                </p>
                <p className="menu-list-item-description">
                  {item.dish_description}
                </p>

                {item.dish_Availability && (
                  <div className="menu-list-item-action-buttons">
                    <button
                      className="menu-list-item-action-button"
                      onClick={() => onRemoveClick(item.dish_id)}
                      type="button"
                    >
                      -
                    </button>

                    <p className="menu-list-item-cart-count">{cartCount}</p>

                    <button
                      className="menu-list-item-action-button"
                      onClick={() => onAddClick(item.dish_id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                )}

                {item.addonCat.length > 0 && item.dish_Availability && (
                  <p className="menu-list-item-addoncat">
                    Customizations available
                  </p>
                )}

                {!item.dish_Availability && (
                  <p className="menu-list-item-unavailable">Not available</p>
                )}
              </div>
              <p className="menu-list-item-calories">
                {item.dish_calories} calories
              </p>
              <div className="menu-list-item-image-container">
                <img
                  src={item.dish_image}
                  alt={item.dish_name}
                  className="menu-list-item-image"
                />
              </div>
            </div>
          )
        })}
      </li>
    )
  }
}

export default MenuList
