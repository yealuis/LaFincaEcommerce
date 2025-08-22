import fs from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import styles from './page.module.css'
import AdminServerGuard from '@/components/admin/AdminServerGuard'

export const dynamic = 'force-dynamic'

async function getOrdenes() {
  const ordenesDir = path.join(process.cwd(), 'data', 'ordenes')
  try {
    const files = await fs.readdir(ordenesDir)
    const ordenes = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async (file) => {
        const content = await fs.readFile(path.join(ordenesDir, file), 'utf-8')
        return JSON.parse(content)
      })
    )
    // Ordenar por fecha descendente
    return ordenes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch {
    return []
  }
}

async function AdminOrdenesPageContent() {
  const ordenes = await getOrdenes()
  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Órdenes Manuales</h1>
      {ordenes.length === 0 ? (
        <p className={styles.emptyMsg}>No hay órdenes registradas.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.ordenesTable}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Método</th>
                <th>Total</th>
                <th>Capture</th>
                <th>Ver Carrito</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(orden => (
                <tr key={orden.id}>
                  <td>{new Date(orden.createdAt).toLocaleString()}</td>
                  <td>{orden.name}</td>
                  <td>{orden.email}</td>
                  <td>{orden.paymentMethod}</td>
                  <td>${orden.total}</td>
                  <td>
                    <Link href={orden.capturePath} target="_blank" rel="noopener noreferrer">
                      <Image src={orden.capturePath} alt="capture" width={60} height={60} style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #aaa' }} unoptimized />
                    </Link>
                  </td>
                  <td>
                    <details>
                      <summary>Ver</summary>
                      <pre className={styles.cartPreview}>{JSON.stringify(orden.cart, null, 2)}</pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default async function AdminOrdenesPage() {
  return (
    <AdminServerGuard>
      <AdminOrdenesPageContent />
    </AdminServerGuard>
  )
}