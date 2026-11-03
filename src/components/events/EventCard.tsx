import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p>
        {event.category}<br/>
        Tarih: {formatDate(event.date)}, {event.time}<br/>
        Yer: {event.location}<br/>
        Kontenjan: {event.capacity || "Belirtilmemiş"} kişi
      </p>
      <p>{event.description}</p>
      <Link className="link-button" to={`/events/${event.id}`}>
        Detayları gör &rarr;
      </Link>
    </article>
  );
}

export default EventCard;