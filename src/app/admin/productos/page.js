"use client"
import { useEffect, useState, useRef } from "react"
import styles from "./page.module.css"
import AdminGuard from "@/components/admin/AdminGuard"
import Button from "@/components/UI/Button"

const API_URL = "/api/admin/productos"

const emptyProduct = {
  codprod: "",
  descrip: "",
  marca: "",
  existen: 0,
  pedido: 0,
  fechauv: "",
  fechauc: "",
  precio1: 0,
  precio2: 0,
  precio3: 0,
  composicion: "",
  indicaciones: "",
  administracion: "",
  unidadesxcaja: "",
  imagen1: null,
  imagen2: null,
  imagen3: null
}

function AdminProductosPageContent() {
  const [productos, setProductos] = useState([])
  const [editing, setEditing] = useState(null)
  const [editData, setEditData] = useState({})
  const [adding, setAdding] = useState(false)
  const [addData, setAddData] = useState(emptyProduct)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const fileInputs = useRef({})

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setProductos)
      .finally(() => setLoading(false))
  }, [])

  const handleEdit = (codprod) => {
    setEditing(codprod)
    const prod = productos.find(p => p.codprod === codprod)
    setEditData({ ...prod, imagen1: null, imagen2: null, imagen3: null })
  }

  const handleEditChange = (e) => {
    const { name, value, files } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleEditSave = async () => {
    setError("")
    const form = new FormData()
    Object.entries(editData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) form.append(k, v)
    })
    form.append("codprod", editing)
    const res = await fetch(API_URL, { method: "PUT", body: form })
    if (res.ok) {
      const updated = productos.map(p => p.codprod === editing ? { ...p, ...editData } : p)
      setProductos(updated)
      setEditing(null)
    } else {
      setError("Error al guardar cambios")
    }
  }

  const handleAddChange = (e) => {
    const { name, value, files } = e.target
    setAddData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setError("")
    const form = new FormData()
    Object.entries(addData).forEach(([k, v]) => {
      if (v !== null && v !== undefined) form.append(k, v)
    })
    const res = await fetch(API_URL, { method: "POST", body: form })
    if (res.ok) {
      setAddData(emptyProduct)
      setAdding(false)
      setLoading(true)
      fetch(API_URL).then(res => res.json()).then(setProductos).finally(() => setLoading(false))
    } else {
      setError("Error al agregar producto")
    }
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Administrar Productos</h1>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? <p>Cargando productos...</p> : (
        <>
          <Button variant="primary" className={styles.addBtn} onClick={() => setAdding(a => !a)}>{adding ? "Cancelar" : "Agregar Producto"}</Button>
          {adding && (
            <form className={styles.addForm} onSubmit={handleAddProduct} encType="multipart/form-data">
              <h3>Nuevo Producto</h3>
              <div className={styles.formRow}>
                <input name="codprod" placeholder="Código" value={addData.codprod} onChange={handleAddChange} required />
                <input name="descrip" placeholder="Descripción" value={addData.descrip} onChange={handleAddChange} required />
                <input name="marca" placeholder="Marca" value={addData.marca} onChange={handleAddChange} required />
                <input name="existen" type="number" placeholder="Existencias" value={addData.existen} onChange={handleAddChange} required />
                <input name="pedido" type="number" placeholder="Pedido" value={addData.pedido} onChange={handleAddChange} />
                <input name="fechauv" type="date" placeholder="Fecha UV" value={addData.fechauv} onChange={handleAddChange} />
                <input name="fechauc" type="date" placeholder="Fecha UC" value={addData.fechauc} onChange={handleAddChange} />
                <input name="precio1" type="number" step="0.01" placeholder="Precio 1" value={addData.precio1} onChange={handleAddChange} required />
                <input name="precio2" type="number" step="0.01" placeholder="Precio 2" value={addData.precio2} onChange={handleAddChange} />
                <input name="precio3" type="number" step="0.01" placeholder="Precio 3" value={addData.precio3} onChange={handleAddChange} />
              </div>
              <div className={styles.formRow}>
                <input name="composicion" placeholder="Composición" value={addData.composicion} onChange={handleAddChange} />
                <input name="indicaciones" placeholder="Indicaciones" value={addData.indicaciones} onChange={handleAddChange} />
                <input name="administracion" placeholder="Administración" value={addData.administracion} onChange={handleAddChange} />
                <input name="unidadesxcaja" placeholder="Unidades x Caja" value={addData.unidadesxcaja} onChange={handleAddChange} />
              </div>
              <div className={styles.formRow}>
                <label>Imagen 1 <input name="imagen1" type="file" accept="image/*" onChange={handleAddChange} /></label>
                <label>Imagen 2 <input name="imagen2" type="file" accept="image/*" onChange={handleAddChange} /></label>
                <label>Imagen 3 <input name="imagen3" type="file" accept="image/*" onChange={handleAddChange} /></label>
              </div>
              <button className={styles.saveBtn} type="submit">Guardar Producto</button>
            </form>
          )}
          <div className={styles.tableWrapper}>
            <table className={styles.productosTable}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Marca</th>
                  <th>Existencias</th>
                  <th>Pedido</th>
                  <th>Fecha UV</th>
                  <th>Fecha UC</th>
                  <th>Precio 1</th>
                  <th>Precio 2</th>
                  <th>Precio 3</th>
                  <th>Composición</th>
                  <th>Indicaciones</th>
                  <th>Administración</th>
                  <th>Unidades x Caja</th>
                  <th>Imagen 1</th>
                  <th>Imagen 2</th>
                  <th>Imagen 3</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(prod => (
                  <tr key={prod.codprod}>
                    {editing === prod.codprod ? (
                      <>
                        <td>{prod.codprod}</td>
                        <td><input name="descrip" value={editData.descrip} onChange={handleEditChange} /></td>
                        <td><input name="marca" value={editData.marca} onChange={handleEditChange} /></td>
                        <td><input name="existen" type="number" value={editData.existen} onChange={handleEditChange} /></td>
                        <td><input name="pedido" type="number" value={editData.pedido} onChange={handleEditChange} /></td>
                        <td><input name="fechauv" type="date" value={editData.fechauv} onChange={handleEditChange} /></td>
                        <td><input name="fechauc" type="date" value={editData.fechauc} onChange={handleEditChange} /></td>
                        <td><input name="precio1" type="number" step="0.01" value={editData.precio1} onChange={handleEditChange} /></td>
                        <td><input name="precio2" type="number" step="0.01" value={editData.precio2} onChange={handleEditChange} /></td>
                        <td><input name="precio3" type="number" step="0.01" value={editData.precio3} onChange={handleEditChange} /></td>
                        <td><input name="composicion" value={editData.composicion} onChange={handleEditChange} /></td>
                        <td><input name="indicaciones" value={editData.indicaciones} onChange={handleEditChange} /></td>
                        <td><input name="administracion" value={editData.administracion} onChange={handleEditChange} /></td>
                        <td><input name="unidadesxcaja" value={editData.unidadesxcaja} onChange={handleEditChange} /></td>
                        <td><input name="imagen1" type="file" accept="image/*" onChange={handleEditChange} /></td>
                        <td><input name="imagen2" type="file" accept="image/*" onChange={handleEditChange} /></td>
                        <td><input name="imagen3" type="file" accept="image/*" onChange={handleEditChange} /></td>
                        <td>
                          <button className={styles.saveBtn} onClick={handleEditSave}>Guardar</button>
                          <button className={styles.cancelBtn} onClick={() => setEditing(null)}>Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{prod.codprod}</td>
                        <td>{prod.descrip}</td>
                        <td>{prod.marca}</td>
                        <td>{prod.existen}</td>
                        <td>{prod.pedido}</td>
                        <td>{prod.fechauv ? prod.fechauv.slice(0,10) : ""}</td>
                        <td>{prod.fechauc ? prod.fechauc.slice(0,10) : ""}</td>
                        <td>{prod.precio1}</td>
                        <td>{prod.precio2}</td>
                        <td>{prod.precio3}</td>
                        <td>{prod.composicion}</td>
                        <td>{prod.indicaciones}</td>
                        <td>{prod.administracion}</td>
                        <td>{prod.unidadesxcaja}</td>
                        <td>{prod.imagen1 && <img src={`data:image/jpeg;base64,${prod.imagen1}`} alt="img1" className={styles.imgThumb} />}</td>
                        <td>{prod.imagen2 && <img src={`data:image/jpeg;base64,${prod.imagen2}`} alt="img2" className={styles.imgThumb} />}</td>
                        <td>{prod.imagen3 && <img src={`data:image/jpeg;base64,${prod.imagen3}`} alt="img3" className={styles.imgThumb} />}</td>
                        <td>
                          <Button variant="primary" className={styles.editBtn} onClick={() => handleEdit(prod.codprod)}>Editar</Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default function AdminProductosPage() {
  return (
    <AdminGuard>
      <AdminProductosPageContent />
    </AdminGuard>
  )
}


