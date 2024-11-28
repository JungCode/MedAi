import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Header = () => {
  return (
    <div className="flex justify-end">
    <div className="w-full">
      <h1 className="font-medium text-xl ">Health Overvirew</h1>
      <p className="text-xs text-gray-600 font-medium">August 12, 2021</p>
    </div>
    <div>
      <div className="bg-white px-2 py-1 rounded-lg border mr-3">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
    <div>
      <div className="bg-white px-2 py-1 rounded-lg border">
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  </div>
  )
}

export default Header;