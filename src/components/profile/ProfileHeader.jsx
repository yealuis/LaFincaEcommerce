import Button from '../UI/Button'
import styles from './profile.module.css'

const ProfileHeader = () => {
  return (
  <>
    {/* Encabezado */}
    <div className={styles.profileHeader}>
      <div className={styles.headerBackground}>
        {/* Gradiente Superpuesto */}
        <div className={styles.mask}></div>
        
        {/* Contenedor principal del encabezado */}
        <div className={styles.headerContainer}>
          <div className={styles.headerRow}>
            <div className={styles.headerCol}>
              <h1 className={styles.heading}>Hola Luis</h1>
              <p className={styles.subheading}>
                Esta es tu pagina de perfil. Puedes ver tus datos personales y modificarlos, ademas de poder ver cuentas por pagar y facturas anteriores.
              </p>
              <Button variant='edit'>Editar Perfil</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default ProfileHeader