import Header from './Header'
import Head from 'next/head'

const App = ({ children }: { children?: any }) => (
  <main>
    <Head>
      <link rel={'manifest'} href={'/manifest.json'} />
    </Head>
    <Header />
    {children}
  </main>
)

export default App
