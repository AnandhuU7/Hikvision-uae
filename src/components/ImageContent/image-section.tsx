'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export default function ImageContentSection() {
  return (
    <section className="py-12 md:py-2 lg:py-2 bg-primary text-primary-foreground bg-mute overflow-hidden">
      <div className="container py-12 mx-auto px-12">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="space-y-4 md:space-y-6 border-2 p-8">
            <motion.h2
              initial={{ y: '40%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl dark:text-primary font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Expert Fabrication Services in Coimbatore
            </motion.h2>
            <motion.p
              initial={{ y: '40%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-[600px] text-primary-foreground/70 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Architectural metal works
              <br />
              Structuaral works,Metal Stairway and Railing
              <br />
              Fcades & Claddigngs
              <br />
              Custom made Furnitures,Lights,Partitions,Garden bollards,Mirrors
              <br />
              Signage
              <br />
              Sculptures
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-2 min-[800px]:flex-row"
            >
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-primary text-lg">
                Learn More
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'anticipate' }}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last border-2 p-8"
          >
            <Image
              alt="Digital Transformation"
              className="object-cover"
              height={800}
              src={`/totaleng6.jpg`}
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
              width={1600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}