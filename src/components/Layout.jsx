import TopBar from "./TopBar"

const Layout = ({children}) => {
  return (
    <main><TopBar/>
    {children}</main>
  )
}

export default Layout