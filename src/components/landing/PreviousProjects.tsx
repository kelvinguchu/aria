import * as React from 'react'
import Image from 'next/image'

const projects = [
  {
    name: 'Enzi Heights',
    location: 'Nextgen, MBS Rd.',
    image: '/PREVIOUS PROJECTS/Enzi Heights_001_Front option.jpg',
    status: 'Completed',
    year: '2021',
  },
  {
    name: 'Capital Rise',
    location: 'Kilimani',
    image: '/PREVIOUS PROJECTS/Capita Rise.webp',
    status: 'Completed',
    year: '2024',
  },
  {
    name: 'Capital Garden',
    location: 'Kilimani',
    image: '/PREVIOUS PROJECTS/Cap-Garden.webp',
    status: 'Ongoing',
    year: '2026',
  },
]

export function PreviousProjects() {
  return (
    <section id="projects" className="bg-neutral-100">
      {/* First Section - The Developer + Description */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-8 py-12 sm:py-16 md:min-h-screen">
        <h2 className="text-coral text-5xl md:text-8xl lg:text-[150px] font-bold text-center leading-tight mb-6 sm:mb-8 lg:mb-12">
          The
          <br />
          Developer
        </h2>
        <Image
          src="/ETD-Vertical-Logomark.png"
          alt="Elemental Terra Developers Ltd."
          width={500}
          height={380}
          className="w-40 sm:w-56 md:w-72 lg:w-100 h-auto mb-8 sm:mb-12 lg:mb-16"
        />
        {/* Description */}
        <p className="text-dark-blue/50 text-center text-base sm:text-lg md:text-2xl font-semibold leading-relaxed max-w-4xl">
          We are a distinguished property group with over 10 years of experience delivering boutique
          residential apartment projects across Nairobi. Known for meticulous planning, on-schedule
          delivery and a commitment to quality. We have built a solid reputation among homeowners
          and investors alike. Our past projects include:
        </p>
      </div>

      {/* Second Section - Projects Cards (90vh height) */}
      <div className="min-h-[90vh] flex flex-col justify-center px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white rounded-xl sm:rounded-2xl border-2 border-coral p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Image */}
              <div className="relative flex-1 min-h-[200px] sm:min-h-[280px] lg:min-h-[400px] rounded-lg sm:rounded-xl overflow-hidden">
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              </div>

              {/* Content */}
              <div className="pt-5 sm:pt-8 lg:pt-10 pb-2 sm:pb-4 text-center">
                <h3 className="text-dark-blue text-lg sm:text-xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">
                  {project.name} -
                </h3>
                <p className="text-dark-blue text-base sm:text-lg lg:text-2xl xl:text-3xl font-medium mb-2 sm:mb-4">
                  {project.location}
                </p>
                <p className="text-dark-blue/70 text-sm sm:text-base lg:text-xl mb-2 sm:mb-3">
                  Status: {project.status}
                </p>
                <p className="text-coral text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold">
                  {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
