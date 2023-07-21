import {AiOutlineShoppingCart} from 'react-icons/ai'

import {Component} from 'react'
import './index.css'

class Header extends Component {
  render() {
    const {data, cart} = this.props
    return (
      <div className="container">
        <h1 className="title">{data.restaurant_name}</h1>

        <div className="cart">
          <p className="cart-title">My Orders</p>
          <div className="cart-icon-container">
            <AiOutlineShoppingCart size={30} color="#585555" />
            <p className="cart-count">{cart.length}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
