/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { detroyJWT } from '@/lib/actions';

export default function useHeader() {
  const headerRef = React.useRef<HTMLHeadElement | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (!headerRef.current) return;
    let _fixedHeader = false
    const handleScroll = () => {
      const header = headerRef.current!
      if (!_fixedHeader && window.scrollY > header!.offsetHeight) {
        _fixedHeader = true
        document.body.style.paddingTop = header!.offsetHeight + "px"
        header.style.position = "fixed"
        header.style.top = "-100%"
        header.style.left = "0"
        header.style.right = "0"
        header.classList.add("animate-fromup")
      } else if (window.scrollY === 0) {
        document.body.style.paddingTop = "0"
        header.style.position = "initial"
        header.classList.remove("animate-fromup")
        _fixedHeader = false
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => { window.removeEventListener("scroll", handleScroll) }
  }, [])

  const handleLogOut = async () => {
    await detroyJWT()
  }

  return {
    headerRef,
    router,
    handleLogOut,
  }
}