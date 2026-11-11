import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import EventForm from '../components/forms/EventForm';
import NotFoundPage from './NotFoundPage';

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = events.find(e => e.id === (id ?? ""));
  
  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm 
        initialData={{ ...event, capacity: event.capacity ? String(event.capacity) : "" }} 
        submitText="Güncelle" 
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }} 
      />
    </>
  );
}

export default EditEventPage;