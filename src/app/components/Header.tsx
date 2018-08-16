import Link from 'next/link'

export default ({ pathname }: { pathname?: any }) => (
  <header>
    <h1>{pathname}</h1>
    <Link href={'/'}>
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
  </header>
)
