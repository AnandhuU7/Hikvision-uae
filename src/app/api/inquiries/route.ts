import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    
    // Validation
    const { name, mobile, email, product, message } = body
    
    if (!name || !mobile || !email) {
      return NextResponse.json(
        { error: 'Name, mobile and email are required' },
        { status: 400 }
      )
    }
    
    // Create new inquiry in Payload
    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        name,
        mobile,
        email,
        product,
        message,
        status: 'new',
      },
    })
    
    return NextResponse.json({ success: true, data: inquiry })
    
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(request.url)
    
    // Extract the IDs directly from the URL
    const searchParams = new URLSearchParams(url.search)
    
    // Get all entries from searchParams
    const entries = Array.from(searchParams.entries())
    
    // Find the document IDs from the complex query structure
    const docIds = entries
      .filter(([key]) => key.includes('[id][in]'))
      .map(([_, value]) => value)
    
    if (docIds.length === 0) {
      return NextResponse.json({ error: 'No document IDs found' }, { status: 400 })
    }
    
    // Delete each document individually
    const results = []
    for (const id of docIds) {
      try {
        const result = await payload.delete({
          collection: 'inquiries',
          id,
        })
        results.push(result)
      } catch (err) {
        console.error(`Error deleting document ${id}:`, err)
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${results.length} documents deleted successfully`,
      data: results 
    })
    
  } catch (error) {
    console.error('Error in DELETE handler:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process delete request', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    )
  }
}