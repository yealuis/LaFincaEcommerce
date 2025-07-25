import styles from './profile.module.css'
import Button from '../UI/Button'
import auth from '../../auth'

const AccountForm = () => {
  return (
    <div className={styles.accountFormCard}>
      <div className={styles.accountFormHeader}>
        <h3 className={styles.accountTitle}>Mi Cuenta</h3>
        <Button variant="primary">Configuracion</Button>
      </div>
      
      <div className={styles.accountFormBody}>
        <form className={styles.accountForm}>
          <h6 className={styles.formSectionTitle}>Informacion de Usuario</h6>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-username">
                Nombre de Usuario
              </label>
              <input className={styles.formInput} id="input-username" placeholder="Nombre de Usuario" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-email">
                Email
              </label>
              <input className={styles.formInput} id="input-email" placeholder="lafinca@ejemplo.com" type="email"/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-document">
                Documento
              </label>
              <input className={styles.formInput} id="input-document" placeholder="Documento" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-company">
                Empresa
              </label>
              <input className={styles.formInput} id="input-company" placeholder="Empresa" type="text"/>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-first-name">
                Primer Nombre
              </label>
              <input className={styles.formInput} id="input-first-name" placeholder="Nombre" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-last-name">
                Apellido
              </label>
              <input className={styles.formInput} id="input-last-name" placeholder="Apellido" type="text"/>
            </div>
          </div>
          
          <hr className={styles.formDivider} />
          
          <h6 className={styles.formSectionTitle}>Informacion de contacto</h6>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="input-address">
                Direccion
              </label>
              <input className={styles.formInput} id="input-address" placeholder="Direccion 1" type="text"/>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="input-address2">
                Direccion 2
              </label>
              <input className={styles.formInput} id="input-address" placeholder="Direccion 2" type="text"/>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-city">
                Ciudad
              </label>
              <input className={styles.formInput} id="input-city" placeholder="Ciudad" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-country">
                Estado
              </label>
              <input className={styles.formInput} id="input-country" placeholder="Estado" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-postal-code">
                Codigo Postal
              </label>
              <input className={styles.formInput} id="input-postal-code" placeholder="Codigo Postal" type="number"/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-phone-number">
                Telefono
              </label>
              <input className={styles.formInput} id="input-phone-number" placeholder="Telefono" type="text"/>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-mobile">
                Movil
              </label>
              <input className={styles.formInput} id="input-mobile" placeholder="movil" type="text"/>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AccountForm