import React from 'react'
import { Badge } from '../ui/badge'

const Experience = () => {
  return (
    <main>
    <h1 className='py-2'>latest blog 📔</h1>
    <hr />
    <div className='py-2 text-sm tracking-wide mb-3'>
        <h1>what I&apos;m up to?</h1>
        <p className='text-slate-400'>checkout out some latest projects updates <span className='text-blue-500'>
        <a
            href="https://markdownblog-iota.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
          here.</a>
          </span></p>
    </div>
    <h1 className='py-2'>skills ⚙️</h1>
    <hr />
    <div className='pt-4 py-2 text-sm tracking-wide mb-3 flex gap-2 flex-wrap'>
    <Badge>Javascript</Badge>
    <Badge>Typescript</Badge>
    <Badge>Reactjs</Badge>
    <Badge>Tailwind</Badge>
    <Badge>Nodejs</Badge>
    <Badge>Express</Badge>
    <Badge>MongoDB</Badge>
    <Badge>Postgres</Badge>
    <Badge>Prisma</Badge>
    <Badge>Nextjs</Badge>
    <Badge>Docker</Badge>
    <Badge>GrapQL</Badge>
    </div>
    <h1 className='py-2'>works 🧱</h1>
    <hr />
    <div className='py-2 text-sm tracking-wide'>
        <h1>404</h1>
        <p className='text-slate-400'>coming soon...</p>
    </div>
    </main>

  )
}

export default Experience