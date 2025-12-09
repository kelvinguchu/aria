import * as React from 'react'
import { IoHome, IoBed, IoWater, IoCar, IoConstruct } from 'react-icons/io5'
import { BsBuildings } from 'react-icons/bs'

const stats = [
  {
    value: '200',
    label: 'Total Units',
    icon: IoHome,
  },
  {
    value: '1, 2 & 3 Beds',
    label: 'Types of Units',
    icon: IoBed,
  },
  {
    value: 'All Ensuite',
    label: 'All Bedrooms Include a Washroom',
    icon: IoWater,
  },
  {
    value: '5',
    label: 'Levels of Parking',
    icon: IoCar,
  },
  {
    value: '2027',
    label: 'Year of Completion',
    icon: IoConstruct,
  },
  {
    value: '24 floors',
    label: '2 Basements, Ground, 22 Typical & 2 Amenity Floors',
    icon: BsBuildings,
  },
]

export function About() {
  return (
    <section id="about" className="py-4 sm:py-6 lg:py-8 bg-gray-50 w-full">
      <div className="w-full px-2 sm:px-3">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-coral mb-2 sm:mb-3">
                  {stat.value}
                </h3>
                <div className="border-t border-gray-200 pt-2 sm:pt-3 flex items-center justify-between">
                  <p className="text-dark-blue text-xs sm:text-sm lg:text-base">{stat.label}</p>
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-dark-blue shrink-0 ml-2 sm:ml-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
