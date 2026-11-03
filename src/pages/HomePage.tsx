import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventList from '../components/events/EventList';

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <h2 className="bolum-baslik">Ana Sayfa</h2>
      <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      
      <h3>Yaklaşan 2 Etkinlik</h3>
      <EventList events={upcoming} limit={2} />
      <br />
      <Link className="link-button" to="/events">Tüm etkinlikleri gör &rarr;</Link>
    </>
  );
}

export default HomePage;