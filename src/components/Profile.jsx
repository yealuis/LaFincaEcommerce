import styles from './profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileColumns}>
        <h1 className={styles.title}>Perfil</h1>
        <form className={styles.profileForm}>
          <input type="text" hidden name="id" />
          <label className={styles.label}>Documento</label>
          <input type="text" name="document" placeholder={"V-1234567"} className={styles.input} />
          <label className={styles.label}>Empresa</label>
          <input type="text" name="company" placeholder={"La Finca"} className={styles.input} />
          <label className={styles.label}>Representante</label>
          <input type="text" name="firstName" placeholder={"Luis Perez"} className={styles.input} />
          <label className={styles.label}>Direccion 1</label>
          <input type="text" name="direction1" placeholder={"Ubr. Buenos Aires"} className={styles.input} />
          <label className={styles.label}>Direccion 2</label>
          <input type="text" name="direction2" placeholder={"El Vigia Edo Merida"} className={styles.input} />
          <label className={styles.label}>Telefono</label>
          <input type="text" name="phone" placeholder={"+1234567"} className={styles.input} />
          <label className={styles.label}>E-mail</label>
          <input type="email" name="email" placeholder={"ejemplo@gmail.com"} className={styles.input} />
          {/*<UpdateButton />*/}
        </form>
      </div>
      <div className={styles.profileColumns}>
        <h1 className={styles.title}>Pedidos</h1>
        <div className={styles.profileForm}>
          {/*orderRes.orders.map((order) => (
            <Link href={`/orders/${order._id}`} key={order._id} className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100" >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ${order.priceSummary?.subtotal?.amount}
              </span>
              {order._createdDate && (
                <span className="w-1/4">{format(order._createdDate)}</span>
              )}
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))*/}
        </div>
      </div>
    </div>
  )
}

export default Profile