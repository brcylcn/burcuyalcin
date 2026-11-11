import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventDetail from '../components/events/EventDetail';
import NotFoundPage from './NotFoundPage';

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  
  const event = events.find(e => e.id === (id ?? ""));
  
  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
      <br />
      <Link className="link-button" to="/events">&larr; Listeye dön</Link> | 
      <Link className="link-button" style={{ marginLeft: '10px' }} to={`/admin/${event.id}/edit`}>Güncelle</Link>
    </>
  );
}

export default EventDetailPage;