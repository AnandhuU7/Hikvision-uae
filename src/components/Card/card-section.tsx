'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Cardsection/card'
import { Database, ThumbsUp, User, Microscope, type LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

const specs = [
  {
    title: 'Quality',
    description:
      'We prioritize precision and quality in every project, ensuring that our products meet the highest standards',
    icon: ThumbsUp,
  },
  {
    title: 'Integrity',
    description:
      'We conduct our business with honesty and transparency, building trust with our clients and partners',
    icon: Database,
  },
  {
    title: 'Innovation',
    description:
      'We embrace new technologies and processes to enhance our services and deliver cutting-edge solutions.',
    icon: Microscope,
  },
  {
    title: 'Customer Focus',
    description:
      ' we specialize in custom steel fabrication tailored to bring your architectural vision to life.',
    icon: User,
  },
]

const SpecCard = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string
  description: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  index: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.1, transition: { duration: 0.1, ease: 'easeIn' } }}
    transition={{ duration: 0.3, delay: index * 0.15 }}
  >
    <Card className="h-full cursor-pointer pb-16 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <Icon className="mb-2 h-16 w-16 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

export default function CardSection() {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold text-primary sm:text-4xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Values and Goals
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec, index) => (
            <SpecCard key={spec.title} {...spec} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
