import React from 'react'

function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <p className='text-dark style-footer'>
        Copyright © {currentYear}
    </p>
  )
}

export default Footer
