import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json()
    
    const instanceId = process.env.ULTRAMSG_INSTANCE_ID
    const token = process.env.ULTRAMSG_TOKEN
    
    const response = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        to: to,
        body: message,
        priority: 10
      })
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}