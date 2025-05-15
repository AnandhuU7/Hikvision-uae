'use client'

import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import type { Media } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
// import { useHeaderTheme } from '@/providers/HeaderTheme'

const dropdownMenus = {
  technologies: [
    { title: 'Tandemvu-technology', href: 'Tandemvu' },
    { title: 'Acusense-technology', href: 'Acusense' },
    { title: 'Darkfighter-technology', href: 'Darkfighter' },
    { title: 'Colorvu-technology', href: 'Colorvu' },
  ],
  solutions: [
    { title: 'Manufacturing solution in Dubai', href: 'Manufacturing' },
    { title: 'Retail solution in Dubai', href: 'Retail' },
    { title: 'Healthcare solution in Dubai', href: 'Healthcare' },
    { title: 'Education Solution in Dubai', href: 'Education' },
  ],
}