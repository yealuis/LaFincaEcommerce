import styles from './button.module.css'
import Link from 'next/link'

const Button = ({ children, variant = 'primary', href, onClick, className = '', disabled }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={buttonClass} onClick={onClick}>
        {children}
      </Link>
    )
  }
  
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button