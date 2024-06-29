import Link from 'next/link'
import { FaRankingStar } from 'react-icons/fa6'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { IoPerson } from 'react-icons/io5'

const Navigation = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <header className="hidden md:contents">
        <div className="fixed top-0 left-0 h-16 container mx-auto flex p-5 items-center border-b border-solid border-gray-300 bg-white">
          <Link
            href="/"
            className="w-48 title-font font-medium text-gray-900 mb-0 ml-3 text-xl"
          >
            T-League Poker
          </Link>
          <nav className="w-full flex gap-20 items-center text-base justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-gray-900"
            >
              <FaRankingStar />
              <span>Rank</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-gray-900"
            >
              <HiMiniPencilSquare />
              <span>Record</span>
            </Link>
            <Link
              href="/player"
              className="flex items-center gap-2 hover:text-gray-900"
            >
              <IoPerson />
              <span>Player</span>
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <div className="h-16 hidden md:contents" />
      <div className="md:hidden">
        <div className="fixed bottom-0 left-0 h-16 container mx-auto flex p-5 items-center bg-gray-50">
          <nav className="w-full p-12 flex gap-16 items-center text-base justify-around">
            <Link
              href="/"
              className="flex flex-col gap-1 items-center text-gray-500"
            >
              <FaRankingStar className="text-3xl" />
            </Link>
            <Link
              href="/"
              className="flex flex-col gap-1 items-center text-gray-500"
            >
              <HiMiniPencilSquare className="text-3xl" />
            </Link>
            <Link
              href="/player"
              className="flex flex-col gap-1 items-center text-gray-500"
            >
              <IoPerson className="text-3xl" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navigation
