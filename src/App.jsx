import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Button } from 'react-bootstrap'

import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom'

import { useLocalStorage } from 'usehooks-ts'

import Apartment from './pages/Apartment'
import ErrorPage from './pages/ErrorPage'
import Landing from './pages/Landing'
import Saved from './pages/Saved'

function Layout() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar className="af-navbar">
        <Container className="af-navbar-inner">
          <Navbar.Brand className="af-brand">ApartFind</Navbar.Brand>
          <div className="af-nav-links">
            {/* Open the list of apartments. */}
            <Button
              className="af-nav-btn af-nav-btn-outline"
              onClick={() => navigate('/apartments')}
            >
              Browse
            </Button>

            {/* Open the saved apartments. */}
            <Button
              className="af-nav-btn af-nav-btn-fill"
              onClick={() => navigate('/saved')}
            >
              Saved
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container className="af-page">
        <Outlet />
      </Container>
    </>
  )
}


function App() {
  const [saved, setSaved] = useLocalStorage('apartfind-saved', [])

  // what happens when user saves/unsaves an apartment
  function toggleSave(apartment) {
    const isAlreadySaved = saved.some((item) => item.id === apartment.id)
    if (isAlreadySaved) {
      // filter it out (Remove)
      setSaved(saved.filter((item) => item.id !== apartment.id))
    }
    else {
      // append it to the list (Save)
      setSaved([...saved, apartment])
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="apartments" element={<Apartment saved={saved} onSave={toggleSave} />} />
          <Route path="saved" element={<Saved saved={saved} onSave={toggleSave} />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;