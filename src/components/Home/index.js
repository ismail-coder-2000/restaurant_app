import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import MenuCategory from '../MenuCategory'
import MenuList from '../MenuList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restaurantsData: [],
    apiStatus: apiStatusConstants.initial,
    cart: [],
    activeMenuId: 0,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        restaurantsData: fetchedData[0],
        activeMenuId: fetchedData[0].table_menu_list[0].menu_category_id,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = isDarkTheme => {
    const errorImageURL = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <div>
        <img alt="failure view" src={errorImageURL} />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble completing your request. Please try again.
        </p>
        <button type="button" onClick={this.getRestaurantDetails}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderRestaurantsListView = () => {
    const {restaurantsData, cart, activeMenuId} = this.state
    return (
      <>
        <Header data={restaurantsData} cart={cart} />
        <ul className="menu-category-container-ul">
          <MenuCategory
            data={restaurantsData}
            activeMenuId={activeMenuId}
            onClick={menuId => {
              this.setState({activeMenuId: menuId})
            }}
          />
        </ul>
        <ul className="menu-list-container-ul">
          <MenuList
            data={restaurantsData}
            activeMenuId={activeMenuId}
            onAddClick={dishId => {
              const newCart = [...cart, dishId]
              this.setState({cart: newCart})
            }}
            onRemoveClick={dishId => {
              // remove first item from cart with dishId
              const newCart = [...cart]
              const index = newCart.indexOf(dishId)
              if (index !== -1) {
                newCart.splice(index, 1)
              }
              this.setState({cart: newCart})
            }}
            cart={cart}
          />
        </ul>
      </>
    )
  }

  renderRestaurantData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderRestaurantData()}</div>
  }
}

export default Home
