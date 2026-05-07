import './OrdersPage.css'
import { Header } from '../../components/Header'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

export function OrdersPage({ cart, loadCart }) {

  const [orders, setOrders] = useState([])

  const addToCart = async (productId) => {
    await axios.post('/api/cart-items', {
      productId: productId,
      quantity: 1
    });
    await loadCart();
  }

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
      })
  }, [])

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">

                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>

                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>$ {(order.totalCostCents / 100).toFixed(2)}</div>
                    </div>

                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products?.map((OrderProduct) => {
                    return (
                      <Fragment key={OrderProduct.product.id}>

                        <div className="product-image-container">
                          <img src={OrderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {OrderProduct.product.name}
                          </div>

                          <div className="product-delivery-date">
                            Arriving on: {dayjs(OrderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>

                          <div className="product-quantity">
                            Quantity: {OrderProduct.quantity}
                          </div>

                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="/images/icons/buy-again.png"
                            />
                            <span className="buy-again-message" onClick={()=>{addToCart(OrderProduct.productId)}}>
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>

                      </Fragment>
                    )
                  })}
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}