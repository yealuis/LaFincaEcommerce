import { useEffect } from "react"
import styles from './notification.module.css'

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={styles.notification}>
      <div className={styles.notificationContent}>
        {message}
      </div>
    </div>
  )
}

export default Notification