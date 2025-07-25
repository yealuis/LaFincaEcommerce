import { headers } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  export async function POST(req) {
    const { items, email } = await req.json()
    
    const line_items = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {name: item.name},
        unit_amount: item.price * 100, // Convertir a centavos
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      costumer_email: email,
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/carrito/checkout`
    })

    return new Response(JSON.stringify({ url: session.url})), {
      headers: { 'content-type': 'application/json' },
    }
  }