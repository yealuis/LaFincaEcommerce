'use client'
import { createContext, useState, useContext, useCallback, useMemo, useEffect } from "react"
import Notification from "@/components/cart/Notification"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.codprod)
      const existencias = product.existen|| 0
      const currentQty = existingItemIndex !== -1 ? prev[existingItemIndex].quantity : 0
      const newQty = currentQty + quantity
      
      if (newQty > existencias) {
      setNotification('Cantidad de unidades supera a las existencias')
      setTimeout(() => setNotification(null), 3000)
      return prev
    }

      if (existingItemIndex !== -1) {
        const updatedItems = [...prev]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQty
        }
        setNotification(`${quantity} unidad${quantity > 1 ? 'es' : ''} de ${product.descrip} agregada${quantity > 1 ? 's' : ''} al carrito`)
        setTimeout(() => { setNotification(null)}, 3000)
        return updatedItems
      } else {
        setNotification(`${quantity} unidad${quantity > 1 ? 'es' : ''} de ${product.descrip} agregada${quantity > 1 ? 's' : ''} al carrito`)
        setTimeout(() => { setNotification(null)}, 3000)
        return [...prev, { 
          id: product.codprod,
          name: product.descrip,
          price: Number(product.precio1ds),
          image: product.imagen1 ? `data:image/webp;base64,${product.imagen1}` : "/NO-DISPONIBLE.webp",
          quantity: quantity,
          max: product.existen
        }]
      }
    })
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }, [])

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
  }
  
  setCartItems(prev => 
    prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    )
  )}
  

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0), 0
  )}, [cartItems])

  const value = {cartItems, addToCart, removeFromCart, subtotal, notification, updateQuantity}

  return (
    <CartContext.Provider value={ value }>
      {children}
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)