import { useState } from 'react';
import { useEvents } from '../context/EventsContext';
import { filterEvents } from '../utils/filter-events';
import EventList from '../components/events/EventList';
import EventFilter from '../components/events/EventFilter';

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<string>("");

  const categories = [...new Set(events.map(e => e.category))];
  const filtered = filterEvents(events, searchText, category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
      <EventFilter 
        searchText={searchText} 
        category={category} 
        categories={categories} 
        onSearchChange={setSearchText} 
        onCategoryChange={setCategory} 
      />
      <p className="sonuc">{filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : 'Aramanıza uygun etkinlik bulunamadı.'}</p>
      <EventList events={filtered} />
    </>
  );
}

export default EventsPage;