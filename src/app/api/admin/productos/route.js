import { query } from '@/lib/db'

export async function GET() {
  // Devuelve todos los productos con info extendida
  const result = await query(`
    SELECT s.codprod, s.descrip, s.marca, s.existen, s.pedido, s.fechauv, s.fechauc, s1.precio1ds as precio1, s1.precio2ds as precio2, s1.precio3ds as precio3,
           p.composicion, p.indicaciones, p.administracion, p.unidadesxcaja,
           encode(p.imagen, 'base64') as imagen1, encode(p.imagen2, 'base64') as imagen2, encode(p.imagen3, 'base64') as imagen3
    FROM saprod s
    JOIN saprod_01 s1 ON s.codprod = s1.codprod
    JOIN productosinfo p ON s.codprod = p.codprod
    ORDER BY s.codprod ASC
  `)
  return new Response(JSON.stringify(result.rows), {
    headers: { 'content-type': 'application/json' }
  })
}

export async function PUT(req) {
  // Actualiza un producto existente
  const data = await req.formData()
  const codprod = data.get('codprod')
  const descrip = data.get('descrip')
  const marca = data.get('marca')
  const existen = data.get('existen')
  const pedido = data.get('pedido')
  const fechauv = data.get('fechauv')
  const fechauc = data.get('fechauc')
  const precio1 = data.get('precio1')
  const precio2 = data.get('precio2')
  const precio3 = data.get('precio3')
  const composicion = data.get('composicion')
  const indicaciones = data.get('indicaciones')
  const administracion = data.get('administracion')
  const unidadesxcaja = data.get('unidadesxcaja')
  // Imágenes (pueden ser null)
  const imagen1 = data.get('imagen1')
  const imagen2 = data.get('imagen2')
  const imagen3 = data.get('imagen3')

  // Actualizar saprod y saprod_01
  await query(`
    UPDATE saprod SET descrip=$1, marca=$2, existen=$3, pedido=$4, fechauv=$5, fechauc=$6 WHERE codprod=$7
  `, [descrip, marca, existen, pedido, fechauv, fechauc, codprod])
  await query(`
    UPDATE saprod_01 SET precio1ds=$1, precio2ds=$2, precio3ds=$3 WHERE codprod=$4
  `, [precio1, precio2, precio3, codprod])

  // Actualizar productosinfo (con imágenes si se envían)
  let imgFields = []
  let imgValues = []
  if (imagen1 && typeof imagen1 !== 'string') {
    const buffer1 = Buffer.from(await imagen1.arrayBuffer())
    imgFields.push('imagen=$1')
    imgValues.push(buffer1)
  }
  if (imagen2 && typeof imagen2 !== 'string') {
    const buffer2 = Buffer.from(await imagen2.arrayBuffer())
    imgFields.push('imagen2=$2')
    imgValues.push(buffer2)
  }
  if (imagen3 && typeof imagen3 !== 'string') {
    const buffer3 = Buffer.from(await imagen3.arrayBuffer())
    imgFields.push('imagen3=$3')
    imgValues.push(buffer3)
  }
  // Campos de texto
  const textFields = [composicion, indicaciones, administracion, unidadesxcaja, codprod]
  let setImgs = ''
  if (imgFields.length > 0) {
    setImgs = ', ' + imgFields.join(', ')
  }
  await query(`
    UPDATE productosinfo SET composicion=$1, indicaciones=$2, administracion=$3, unidadesxcaja=$4${setImgs} WHERE codprod=$5
  `, [...textFields, ...imgValues])

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'content-type': 'application/json' }
  })
}

export async function POST(req) {
  // Crea un nuevo producto
  const data = await req.formData()
  const codprod = data.get('codprod')
  const descrip = data.get('descrip')
  const marca = data.get('marca')
  const existen = data.get('existen')
  const pedido = data.get('pedido')
  const fechauv = data.get('fechauv')
  const fechauc = data.get('fechauc')
  const precio1 = data.get('precio1')
  const precio2 = data.get('precio2')
  const precio3 = data.get('precio3')
  const composicion = data.get('composicion')
  const indicaciones = data.get('indicaciones')
  const administracion = data.get('administracion')
  const unidadesxcaja = data.get('unidadesxcaja')
  // Imágenes (pueden ser null)
  const imagen1 = data.get('imagen1')
  const imagen2 = data.get('imagen2')
  const imagen3 = data.get('imagen3')

  // Insertar en saprod y saprod_01
  await query(`
    INSERT INTO saprod (codprod, descrip, marca, existen, pedido, fechauv, fechauc) VALUES ($1,$2,$3,$4,$5,$6,$7)
  `, [codprod, descrip, marca, existen, pedido, fechauv, fechauc])
  await query(`
    INSERT INTO saprod_01 (codprod, precio1ds, precio2ds, precio3ds) VALUES ($1,$2,$3,$4)
  `, [codprod, precio1, precio2, precio3])

  // Insertar en productosinfo
  let buffer1 = null, buffer2 = null, buffer3 = null
  if (imagen1 && typeof imagen1 !== 'string') buffer1 = Buffer.from(await imagen1.arrayBuffer())
  if (imagen2 && typeof imagen2 !== 'string') buffer2 = Buffer.from(await imagen2.arrayBuffer())
  if (imagen3 && typeof imagen3 !== 'string') buffer3 = Buffer.from(await imagen3.arrayBuffer())
  await query(`
    INSERT INTO productosinfo (codprod, composicion, indicaciones, administracion, unidadesxcaja, imagen, imagen2, imagen3) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  `, [codprod, composicion, indicaciones, administracion, unidadesxcaja, buffer1, buffer2, buffer3])

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'content-type': 'application/json' }
  })
}
