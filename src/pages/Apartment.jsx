import { Container } from 'react-bootstrap'

import apartments from '../data/apartment.json'
import ApartmentCard from '../components/ApartmentCard'

function Apartment({ saved, onSave }) {
  return (
    <Container className="af-apartments" fluid={false}>
      <h1 className="af-page-title">Apartments</h1>

      {/* Use an inline grid until the full CSS is added. */}
      <div
        className="af-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Render one card for every apartment in the JSON file. */}
        {apartments.map((apartment) => (
          <div key={apartment.id} className="af-grid-col">
            <ApartmentCard
              apartment={apartment}
              saved={saved}
              onSave={onSave}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Apartment
