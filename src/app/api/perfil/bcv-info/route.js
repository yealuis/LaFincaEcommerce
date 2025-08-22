import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function GET(request) {
  try {
    // Verificar autenticación
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener información del BCV desde múltiples endpoints
    const [bcvResponse, bcvHistoryResponse] = await Promise.allSettled([
      fetch('https://pydolarve.org/api/v2/dollar?page=bcv'),
      fetch('https://pydolarve.org/api/v2/dollar/history?page=bcv&start_date=01-01-2024&end_date=31-12-2024&order=desc')
    ])

    let bcvData = null
    let bcvHistory = null
    let error = null

    // Procesar respuesta principal del BCV
    if (bcvResponse.status === 'fulfilled' && bcvResponse.value.ok) {
      try {
        const data = await bcvResponse.value.json()
        bcvData = data.monitors?.find(monitor => 
          monitor.key === 'bcv' || 
          monitor.title?.toLowerCase().includes('banco central') ||
          monitor.title?.toLowerCase().includes('bcv')
        )
      } catch (parseError) {
        console.error('Error parseando respuesta del BCV:', parseError)
      }
    }

    // Procesar historial del BCV
    if (bcvHistoryResponse.status === 'fulfilled' && bcvHistoryResponse.value.ok) {
      try {
        const historyData = await bcvHistoryResponse.value.json()
        bcvHistory = historyData.monitors?.slice(0, 10) // Últimos 10 registros
      } catch (parseError) {
        console.error('Error parseando historial del BCV:', parseError)
      }
    }

    // Si no hay datos del BCV, usar endpoint alternativo
    if (!bcvData) {
      try {
        const alternativeResponse = await fetch('https://pydolarve.org/api/v2/dollar?monitor=bcv')
        if (alternativeResponse.ok) {
          const altData = await alternativeResponse.json()
          bcvData = altData.monitors?.[0]
        }
      } catch (altError) {
        console.error('Error con endpoint alternativo:', altError)
      }
    }

    if (!bcvData) {
      return NextResponse.json({
        error: 'No se pudo obtener información del BCV',
        availableEndpoints: [
          'https://pydolarve.org/api/v2/dollar?page=bcv',
          'https://pydolarve.org/api/v2/dollar?monitor=bcv',
          'https://pydolarve.org/api/v2/dollar/history?page=bcv'
        ]
      }, { status: 404 })
    }

    // Preparar respuesta con información completa
    const response = {
      current: {
        price: parseFloat(bcvData.price),
        change: parseFloat(bcvData.change || 0),
        percent: parseFloat(bcvData.percent || 0),
        lastUpdate: bcvData.last_update,
        title: bcvData.title,
        key: bcvData.key
      },
      history: bcvHistory ? bcvHistory.map(item => ({
        price: parseFloat(item.price),
        date: item.last_update,
        change: parseFloat(item.change || 0),
        percent: parseFloat(item.percent || 0)
      })) : [],
      source: 'pyDolarVenezuela API',
      endpoints: {
        current: 'https://pydolarve.org/api/v2/dollar?page=bcv',
        history: 'https://pydolarve.org/api/v2/dollar/history?page=bcv',
        monitor: 'https://pydolarve.org/api/v2/dollar?monitor=bcv'
      },
      documentation: 'https://github.com/fcoagz/api-pydolarvenezuela'
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error en GET /api/perfil/bcv-info:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    )
  }
}
