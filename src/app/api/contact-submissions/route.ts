import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    
    // Validation
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject and message are required' },
        { status: 400 }
      )
    }
    
    // Create new contact submission in Payload
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        subject: body.subject,
        message: body.message,
        department: body.department || 'sales',
        status: 'new',
        submitDate: new Date().toISOString(),
      },
    })
    
    console.log('Successfully created contact submission with ID:', submission.id)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your message has been submitted.',
      id: submission.id 
    })
    
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit your message. Please try again later.',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Optional: Add DELETE method if you want to allow deleting submissions via API
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
          collection: 'contact-submissions',
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