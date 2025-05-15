
'use client'

import { useState } from 'react'
import InquiryFormModal from '../InquiryFormModal'

interface SalesEnquiryButtonProps {
  productName: string
}

export default function SalesEnquiryButton({ productName }: SalesEnquiryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-900 py-3 px-8 rounded font-medium text-center transition-colors duration-200"
      >
        Sales Enquiry
      </button>
      
      <InquiryFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={productName}
      />
    </>
  )
}