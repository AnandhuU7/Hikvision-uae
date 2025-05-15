'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Divsection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <motion.section
      className="text-center bg-muted border-2 py-12 px-4 rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl text-primary font-semibold mb-4">Ready to innovate with us?</h2>
      <p className="mb-6 text-muted-foreground">
        Join us in shaping the future of technology. Let&apos;s work together to bring your ideas to
        life.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}