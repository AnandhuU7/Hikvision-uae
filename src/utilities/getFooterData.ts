export async function getFooterData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/globals/footer`,
      { 
        cache: 'no-store',
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    )
    
    if (!res.ok) {
      console.error('Failed to fetch footer data')
      return {}
    }
    
    return await res.json()
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return {}
  }
}