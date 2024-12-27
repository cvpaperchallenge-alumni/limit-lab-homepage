'use client'

import Image from 'next/image'
import testImage from '../../public/paper-ocean.png'

export function PaperOceanDesign() {
  return (
    <div className='relative min-w-64 h-64'>
      <Image
        src={testImage}
        alt="paper ocean"
        width={256}
        height={256}
        className='absolute filter blur-[3px] contrast-75 object-cover h-64 w-64 rounded-2xl pointer-events-none'
      />
      <Image
        src={testImage}
        alt="paper ocean"
        width={256}
        height={256}
        className='absolute object-cover h-64 w-64 rounded-2xl pointer-events-none [clip-path:_circle(30px_at_50%_50%)]'
      />
    </div>
  )
}