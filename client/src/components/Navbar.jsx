import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import userLogo from '../assets/user.jpg'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa"
import { LiaCommentSolid } from 'react-icons/lia'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/redux/themeSlice'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setOpenNav(false)
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    navigate('/login')
    toast.success("Logout successfully")
  }

  const toggleNav = () => setOpenNav(!openNav)

return (
  <div className="fixed top-0 w-full z-50 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-2">
      {/* Logo + Search */}
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 dark:invert" />
          <span className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white">Logo</span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[280px] md:w-[320px] bg-gray-100 dark:bg-gray-800 text-sm pr-10"
          />
          <Button type="submit" size="icon" className="absolute right-1 top-1.5 h-7 w-7 p-1">
            <Search size={16} />
          </Button>
        </form>
      </div>

      {/* Nav Links */}
      <nav className="flex items-center gap-4 md:gap-6">
        <ul className="hidden md:flex gap-6 text-medium font-bold text-gray-700 dark:text-gray-100">
          <li><Link to="/" className="hover:text-red-500">Home</Link></li>
          <li><Link to="/blogs" className="hover:text-red-500">Blogs</Link></li>
          <li><Link to="/about" className="hover:text-red-500">About</Link></li>
        </ul>

        {/* Theme + Auth Controls */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoUrl || user?.logo || userLogo} />
                  <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-gray-800">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                    <User /> <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                    <ChartColumnBig /> <span>Your Blog</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                    <LiaCommentSolid /> <span>Comments</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                    <FaRegEdit /> <span>Write Blog</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut /> <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild size="sm"><Link to="/login">Login</Link></Button>
              <Button asChild size="sm" variant="outline"><Link to="/signup">Signup</Link></Button>
            </div>
          )}
        </div>

        {/* Mobile menu icon */}
        {openNav
          ? <HiMenuAlt3 onClick={toggleNav} className="w-6 h-6 md:hidden cursor-pointer" />
          : <HiMenuAlt1 onClick={toggleNav} className="w-6 h-6 md:hidden cursor-pointer" />}
      </nav>
    </div>

    {/* Mobile Nav Drawer */}
    {openNav && (
      <div className="md:hidden px-4 pt-4 pb-6 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800 pr-10"
          />
          <Button type="submit" className="absolute right-0 top-0"><Search size={16} /></Button>
        </form>
        <ul className="space-y-2 text-base font-medium text-gray-800 dark:text-white">
          <li><Link to="/" onClick={toggleNav} className="block hover:text-red-500">Home</Link></li>
          <li><Link to="/blogs" onClick={toggleNav} className="block hover:text-red-500">Blogs</Link></li>
          <li><Link to="/about" onClick={toggleNav} className="block hover:text-red-500">About</Link></li>
          {user ? (
            <li>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  handleLogout();
                  toggleNav();
                }}
              >
                Logout
              </Button>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={toggleNav} className="block hover:text-red-500">Login</Link></li>
              <li><Link to="/signup" onClick={toggleNav} className="block hover:text-red-500">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    )}
  </div>
);

}

export default Navbar
