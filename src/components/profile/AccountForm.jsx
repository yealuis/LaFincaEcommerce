'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import styles from './profile.module.css'
import Button from '../UI/Button'
import Link from 'next/link'

// Datos de ubicación para los selects
const PAISES = [
  { id: '1', nombre: 'Venezuela' }
]

const ESTADOS = [
  { id: '1', nombre: 'Amazonas' },
  { id: '2', nombre: 'Anzoátegui' },
  { id: '3', nombre: 'Apure' },
  { id: '4', nombre: 'Aragua' },
  { id: '5', nombre: 'Barinas' },
  { id: '6', nombre: 'Bolívar' },
  { id: '7', nombre: 'Carabobo' },
  { id: '8', nombre: 'Cojedes' },
  { id: '9', nombre: 'Delta Amacuro' },
  { id: '10', nombre: 'Distrito Capital' },
  { id: '11', nombre: 'Falcón' },
  { id: '12', nombre: 'Guárico' },
  { id: '13', nombre: 'Lara' },
  { id: '14', nombre: 'Mérida' },
  { id: '15', nombre: 'Miranda' },
  { id: '16', nombre: 'Monagas' },
  { id: '17', nombre: 'Nueva Esparta' },
  { id: '18', nombre: 'Portuguesa' },
  { id: '19', nombre: 'Sucre' },
  { id: '20', nombre: 'Táchira' },
  { id: '21', nombre: 'Trujillo' },
  { id: '22', nombre: 'Vargas' },
  { id: '23', nombre: 'Yaracuy' },
  { id: '24', nombre: 'Zulia' }
]

const MUNICIPIOS = {
  '1': [ // Amazonas
    { id: '1', nombre: 'Alto Orinoco' },
    { id: '2', nombre: 'Atabapo' },
    { id: '3', nombre: 'Atures' },
    { id: '4', nombre: 'Autana' },
    { id: '5', nombre: 'Manapiare' },
    { id: '6', nombre: 'Maroa' },
    { id: '7', nombre: 'Río Negro' }
  ],
  '5': [ // Barinas
    { id: '1', nombre: 'Alberto Arvelo Torrealba' },
    { id: '2', nombre: 'Andrés Eloy Blanco' },
    { id: '3', nombre: 'Antonio José de Sucre' },
    { id: '4', nombre: 'Arismendi' },
    { id: '5', nombre: 'Barinas' },
    { id: '6', nombre: 'Bolívar' },
    { id: '7', nombre: 'Cruz Paredes' },
    { id: '8', nombre: 'Ezequiel Zamora' },
    { id: '9', nombre: 'Obispos' },
    { id: '10', nombre: 'Pedraza' },
    { id: '11', nombre: 'Rojas' },
    { id: '12', nombre: 'Sosa' }
  ],
  '13': [ // Lara
    { id: '1', nombre: 'Andrés Eloy Blanco' },
    { id: '2', nombre: 'Crespo' },
    { id: '3', nombre: 'Iribarren' },
    { id: '4', nombre: 'Jiménez' },
    { id: '5', nombre: 'Morán' },
    { id: '6', nombre: 'Palavecino' },
    { id: '7', nombre: 'Simón Planas' },
    { id: '8', nombre: 'Torres' },
    { id: '9', nombre: 'Urdaneta' }
  ],
  '14': [ // Mérida
    { id: '1', nombre: 'Alberto Adriani' },
    { id: '2', nombre: 'Andrés Bello' },
    { id: '3', nombre: 'Antonio Pinto Salinas' },
    { id: '4', nombre: 'Aricagua' },
    { id: '5', nombre: 'Arzobispo Chacón' },
    { id: '6', nombre: 'Campo Elías' },
    { id: '7', nombre: 'Caracciolo Parra Olmedo' },
    { id: '8', nombre: 'Cardenal Quintero' },
    { id: '9', nombre: 'Guaraque' },
    { id: '10', nombre: 'Julio César Salas' },
    { id: '11', nombre: 'Justo Briceño' },
    { id: '12', nombre: 'Libertador' },
    { id: '13', nombre: 'Miranda' },
    { id: '14', nombre: 'Obispo Ramos de Lora' },
    { id: '15', nombre: 'Padre Noguera' },
    { id: '16', nombre: 'Pueblo Llano' },
    { id: '17', nombre: 'Rangel' },
    { id: '18', nombre: 'Rivas Dávila' },
    { id: '19', nombre: 'Santos Marquina' },
    { id: '20', nombre: 'Sucre' },
    { id: '21', nombre: 'Tovar' },
    { id: '22', nombre: 'Tulio Febres Cordero' },
    { id: '23', nombre: 'Zea' }
  ],
  '24': [ // Zulia
    { id: '1', nombre: 'Almirante Padilla' },
    { id: '2', nombre: 'Baralt' },
    { id: '3', nombre: 'Cabimas' },
    { id: '4', nombre: 'Catatumbo' },
    { id: '5', nombre: 'Colón' },
    { id: '6', nombre: 'Francisco Javier Pulgar' },
    { id: '7', nombre: 'Jesús Enrique Lossada' },
    { id: '8', nombre: 'Jesús María Semprún' },
    { id: '9', nombre: 'La Cañada de Urdaneta' },
    { id: '10', nombre: 'Lagunillas' },
    { id: '11', nombre: 'Machiques de Perijá' },
    { id: '12', nombre: 'Mara' },
    { id: '13', nombre: 'Maracaibo' },
    { id: '14', nombre: 'Miranda' },
    { id: '15', nombre: 'Páez' },
    { id: '16', nombre: 'Rosario de Perijá' },
    { id: '17', nombre: 'San Francisco' },
    { id: '18', nombre: 'Santa Rita' },
    { id: '19', nombre: 'Simón Bolívar' },
    { id: '20', nombre: 'Sucre' },
    { id: '21', nombre: 'Valmore Rodríguez' }
  ]
}

// Función helper para obtener nombre por ID
const getNombreById = (array, id) => {
  const item = array.find(item => item.id === id)
  return item ? item.nombre : ''
}

// Función helper para obtener ID por nombre
const getIdByNombre = (array, nombre) => {
  const item = array.find(item => item.nombre === nombre)
  return item ? item.id : ''
}

const AccountForm = () => {
  const { data: session, status } = useSession()
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // Memorizar el estado de autenticación para evitar re-renders innecesarios
  const isAuthenticated = useMemo(() => {
    return status === "authenticated" && session?.user?.email
  }, [status, session?.user?.email])

  // Verificar si el usuario es admin
  const isAdmin = useMemo(() => {
    console.log('Debug - session.user:', session?.user)
    console.log('Debug - esadmin value:', session?.user?.esadmin)
    console.log('Debug - esadmin type:', typeof session?.user?.esadmin)
    return session?.user?.esadmin === true || session?.user?.esadmin === 1
  }, [session?.user?.esadmin])

  // Memorizar la función de fetch para evitar recrearla en cada render
  const fetchPerfil = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/perfil")
      if (!res.ok) throw new Error("No se pudo obtener el perfil")
      const data = await res.json()
      setPerfil(data)
      setFormData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Solo ejecutar si realmente cambió el estado de autenticación
    if (isAuthenticated && !perfil) {
      fetchPerfil()
    } else if (status === "unauthenticated") {
      setLoading(false)
      setError("Debes iniciar sesión para ver tu perfil.")
    }
  }, [isAuthenticated, perfil, fetchPerfil, status])

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleSelectChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
    setFormData(perfil)
    setSuccessMessage('')
    setError(null)
  }, [perfil])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setFormData(perfil)
    setSuccessMessage('')
    setError(null)
  }, [perfil])

  const handleSave = useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      
      // Detectar solo los campos que han cambiado
      const changedFields = {}
      let hasChanges = false
      
      // Comparar cada campo con el perfil original
      Object.keys(formData).forEach(key => {
        const originalValue = perfil[key]
        const newValue = formData[key]
        
        // Solo incluir campos que realmente han cambiado
        if (originalValue !== newValue) {
          // Convertir cadenas vacías a null para campos de texto
          if (newValue === '') {
            changedFields[key] = null
          } else {
            changedFields[key] = newValue
          }
          hasChanges = true
        }
      })
      
      // Si no hay cambios, no hacer nada
      if (!hasChanges) {
        setIsEditing(false)
        setSuccessMessage("No hay cambios para guardar")
        setTimeout(() => setSuccessMessage(''), 3000)
        return
      }

      // Mapear nombres a IDs para estado y municipio
      if (changedFields.estado) {
        changedFields.estado = getIdByNombre(ESTADOS, changedFields.estado)
      }
      if (changedFields.municipio) {
        const estadoId = formData.estado ? getIdByNombre(ESTADOS, formData.estado) : perfil.estado
        const municipios = MUNICIPIOS[estadoId] || []
        changedFields.municipio = getIdByNombre(municipios, changedFields.municipio)
      }

      const res = await fetch("/api/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedFields)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Error al actualizar el perfil")
      }

      const updatedPerfil = await res.json()
      setPerfil(updatedPerfil)
      setFormData(updatedPerfil)
      setIsEditing(false)
      setSuccessMessage("Perfil actualizado exitosamente")
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }, [formData, perfil])

  // Función para obtener el nombre del estado actual
  const getEstadoNombre = useCallback((estadoId) => {
    return getNombreById(ESTADOS, estadoId)
  }, [])

  // Función para obtener el nombre del municipio actual
  const getMunicipioNombre = useCallback((estadoId, municipioId) => {
    const municipios = MUNICIPIOS[estadoId] || []
    return getNombreById(municipios, municipioId)
  }, [])

  // Función para obtener municipios disponibles según el estado seleccionado
  const getMunicipiosDisponibles = useCallback((estadoNombre) => {
    if (!estadoNombre) return []
    const estadoId = getIdByNombre(ESTADOS, estadoNombre)
    return MUNICIPIOS[estadoId] || []
  }, [])

  // Función para verificar si un campo ha sido modificado
  const isFieldModified = useCallback((fieldName) => {
    if (!perfil || !formData) return false
    return perfil[fieldName] !== formData[fieldName]
  }, [perfil, formData])

  // Función para obtener la clase CSS del campo
  const getFieldClassName = useCallback((fieldName) => {
    const baseClass = styles.formInput
    return isFieldModified(fieldName) ? `${baseClass} ${styles.modifiedField}` : baseClass
  }, [isFieldModified])

  // Memoizar el contenido del formulario para evitar re-renders
  const formContent = useMemo(() => {
    if (loading) {
      return <div className={styles.loading}>Cargando perfil...</div>
    }

    if (error) {
      return <div className={styles.error}>{error}</div>
    }

    if (!perfil) {
      return <div className={styles.error}>No se pudo cargar el perfil</div>
    }

    return (
      <div className={styles.accountFormCard}>
        <div className={styles.accountFormHeader}>
          <h3 className={styles.accountTitle}>Información de la Cuenta</h3>
          <div className={styles.formActions}>
            {!isEditing ? (
              <Button onClick={handleEdit} variant="primary">
                Editar Perfil
              </Button>
            ) : (
              <div className={styles.editActions}>
                <Button onClick={handleCancel} variant="secondary">
                  Cancelar
                </Button>
                <Button onClick={handleSave} variant="primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            )}
          </div>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}
        <div className={styles.accountFormBody}>
        <form className={styles.accountForm}>
          <h6 className={styles.formSectionTitle}>Información de la Empresa</h6>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-descrip">
                Nombre de la Empresa
              </label>
              <input 
                className={getFieldClassName('descrip')} 
                id="input-descrip" 
                placeholder="Nombre de la Empresa" 
                type="text" 
                value={formData?.descrip || ''} 
                onChange={(e) => handleInputChange('descrip', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-id3">
                Documento de Identidad
              </label>
              <input className={styles.formInput} id="input-id3" placeholder="Documento de Identidad" type="text" value={formData?.id3 || ''} disabled />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-represent">
                Representante de la Empresa
              </label>
              <input 
                className={getFieldClassName('represent')} 
                id="input-represent" 
                placeholder="Representante" 
                type="text" 
                value={formData?.represent || ''} 
                onChange={(e) => handleInputChange('represent', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <hr className={styles.formDivider} />
          
          <h6 className={styles.formSectionTitle}>Información de Dirección</h6>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="input-direc1">
                Dirección 1
              </label>
              <input 
                className={getFieldClassName('direc1')} 
                id="input-direc1" 
                placeholder="Dirección 1" 
                type="text" 
                value={formData?.direc1 || ''} 
                onChange={(e) => handleInputChange('direc1', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.formLabel} htmlFor="input-direc2">
                Dirección 2
              </label>
              <input 
                className={getFieldClassName('direc2')} 
                id="input-direc2" 
                placeholder="Dirección 2" 
                type="text" 
                value={formData?.direc2 || ''} 
                onChange={(e) => handleInputChange('direc2', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-pais">
                País
              </label>
              <select 
                className={styles.formSelect} 
                id="input-pais" 
                value="1" 
                disabled={true}
              >
                <option value="1">Venezuela</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-estado">
                Estado
              </label>
              <select 
                className={getFieldClassName('estado')} 
                id="input-estado" 
                value={getEstadoNombre(formData?.estado) || ''} 
                onChange={(e) => {
                  const estadoNombre = e.target.value
                  handleSelectChange('estado', estadoNombre)
                  // Limpiar municipio cuando cambia el estado
                  handleSelectChange('municipio', '')
                }}
                disabled={!isEditing}
              >
                <option value="">Seleccione un estado</option>
                {ESTADOS.map(estado => (
                  <option key={estado.id} value={estado.nombre}>
                    {estado.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-ciudad">
                Ciudad
              </label>
              <input 
                className={getFieldClassName('ciudad')} 
                id="input-ciudad" 
                placeholder="Ciudad" 
                type="text" 
                value={formData?.ciudad || ''} 
                onChange={(e) => handleInputChange('ciudad', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-municipio">
                Municipio
              </label>
              <select 
                className={getFieldClassName('municipio')} 
                id="input-municipio" 
                value={getMunicipioNombre(formData?.estado, formData?.municipio) || ''} 
                onChange={(e) => handleSelectChange('municipio', e.target.value)}
                disabled={!isEditing || !getEstadoNombre(formData?.estado)}
              >
                <option value="">Seleccione un municipio</option>
                {getMunicipiosDisponibles(getEstadoNombre(formData?.estado)).map(municipio => (
                  <option key={municipio.id} value={municipio.nombre}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-zipcode">
                Código Postal
              </label>
              <input 
                className={getFieldClassName('zipcode')} 
                id="input-zipcode" 
                placeholder="Código Postal" 
                type="text" 
                value={formData?.zipcode || ''} 
                onChange={(e) => handleInputChange('zipcode', e.target.value)} 
                disabled={!isEditing}
              />
            </div>
          </div>

          <hr className={styles.formDivider} />
          
          <h6 className={styles.formSectionTitle}>Información de Contacto</h6>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-telef">
                Teléfono
              </label>
              <input 
                className={getFieldClassName('telef')} 
                id="input-telef" 
                placeholder="Teléfono" 
                type="tel" 
                value={formData?.telef || ''} 
                onChange={(e) => {
                  const value = e.target.value
                  // Permitir números, espacios, guiones y paréntesis
                  if (value === '' || /^[\d\s\-\(\)]+$/.test(value)) {
                    handleInputChange('telef', value)
                  }
                }}
                disabled={!isEditing}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-movil">
                Móvil
              </label>
              <input 
                className={getFieldClassName('movil')} 
                id="input-movil" 
                placeholder="Móvil" 
                type="tel" 
                value={formData?.movil || ''} 
                onChange={(e) => {
                  const value = e.target.value
                  // Permitir números, espacios, guiones y paréntesis
                  if (value === '' || /^[\d\s\-\(\)]+$/.test(value)) {
                    handleInputChange('movil', value)
                  }
                }}
                disabled={!isEditing}
              />
            </div>
          </div>

          <hr className={styles.formDivider} />
          
          <h6 className={styles.formSectionTitle}>Información de Crédito</h6>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-escredito">
                Crédito Activo
              </label>
              <input 
                className={styles.formInput} 
                id="input-escredito" 
                type="text" 
                value={formData?.escredito === 1 ? 'Sí' : 'No'} 
                disabled 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-limitecred">
                Límite de Crédito
              </label>
              <input 
                className={styles.formInput} 
                id="input-limitecred" 
                type="text" 
                value={`${formData?.limitecred || '0.00'} Bs`} 
                disabled 
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-diascred">
                Días de Crédito
              </label>
              <input 
                className={styles.formInput} 
                id="input-diascred" 
                type="text" 
                value={`${formData?.diascred || '0'} días`} 
                disabled 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="input-saldo">
                Saldo Actual
              </label>
              <input 
                className={styles.formInput} 
                id="input-saldo" 
                type="text" 
                value={`${formData?.saldo || '0.00'} Bs`} 
                disabled 
              />
            </div>
          </div>
        </form>
        </div>

        {/* Botones de Admin */}
        {isAdmin && (
          <div className={styles.adminSection}>
            <h6 className={styles.adminSectionTitle}>Panel de Administración</h6>
            <div className={styles.adminButtons}>
              <Link href="/admin/ordenes">
                <Button variant="primary">
                  📋 Gestionar Órdenes
                </Button>
              </Link>
              <Link href="/admin/productos">
                <Button variant="primary">
                  🛍️ Gestionar Productos
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }, [
    loading, 
    error, 
    perfil, 
    isEditing, 
    saving, 
    successMessage, 
    formData, 
    isAdmin,
    handleEdit, 
    handleCancel, 
    handleSave, 
    handleInputChange, 
    handleSelectChange,
    getFieldClassName, 
    getEstadoNombre, 
    getMunicipioNombre, 
    getMunicipiosDisponibles
  ])

  return formContent
}

export default AccountForm