import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { ThemeToggle } from '../ThemeToggle'

import './navbar.css'

interface MenuOption {
  title: string
  to?: string
  href?: string
}

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  const htmlDocument: HTMLHtmlElement | null =
    typeof window === 'undefined' ? null : document.querySelector('html')

  const handleToggleMenu = () => {
    setOpen(!open)

    htmlDocument?.classList.toggle('no-scroll')
  }

  const menuOptions: MenuOption[] = [
    { title: 'Home', to: '/' },
    { title: 'Blog', to: '/blog' },
    { title: 'Projects', to: '/projects' },
    { title: 'GitHub', href: 'https://www.github.com/SPDUK' },
  ]

  const createMenuLinks = ({ title, to, href }: MenuOption) =>
    href ? (
      <a key={title} href={href} aria-label="title">
        {title}
      </a>
    ) : (
      <Link key={title} to={to} aria-label="title">
        {title}
      </Link>
    )

  const menu = menuOptions.map(createMenuLinks)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        htmlDocument?.classList.remove('no-scroll')
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // clean up on page change by removing no-scroll
    return () => {
      htmlDocument?.classList.remove('no-scroll')
      window.removeEventListener('resize', handleResize)
    }
  }, [htmlDocument])

  const navbarClass = open ? 'navbar navbar--open' : 'navbar'

  return (
    <nav className={navbarClass}>
      <div className="container navbar__container">
        <div className="navbar__desktop-menu">{menu}</div>
        <button
          onClick={handleToggleMenu}
          className="navbar__toggle"
          type="button"
          data-toggle="modal"
          data-target=".navbar__mobile-menu"
          aria-label={`${open ? 'Open' : 'Close'} navigation`}
        >
          <svg
            className={`navbar__burger ${open ? 'navbar__burger--active' : ''}`}
            viewBox="0 0 100 100"
            width="80"
          >
            <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
            <path d="m 30,50 h 40" />
            <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
          </svg>
        </button>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div className="navbar__mobile-menu">{menu}</div>
    </nav>
  )
}
