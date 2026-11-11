import { useState, ChangeEvent, FormEvent } from "react";
import { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Etkinlik Adı <span className="zorunlu">*</span></label>
      <input type="text" id="title" name="title" value={data.title} onChange={handleChange} placeholder="Etkinlik adını girin" aria-invalid={errors.title ? true : undefined} />
      {errors.title && <span className="hata-metni">{errors.title}</span>}

      <label htmlFor="category">Kategori <span className="zorunlu">*</span></label>
      <select id="category" name="category" value={data.category} onChange={handleChange} aria-invalid={errors.category ? true : undefined}>
        <option value="">Seçiniz</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>
      {errors.category && <span className="hata-metni">{errors.category}</span>}

      <label htmlFor="date">Tarih <span className="zorunlu">*</span></label>
      <input type="date" id="date" name="date" value={data.date} onChange={handleChange} aria-invalid={errors.date ? true : undefined} />
      {errors.date && <span className="hata-metni">{errors.date}</span>}
      
      <label htmlFor="time">Saat <span className="zorunlu">*</span></label>
      <input type="time" id="time" name="time" value={data.time} onChange={handleChange} aria-invalid={errors.time ? true : undefined} />
      {errors.time && <span className="hata-metni">{errors.time}</span>}

      <label htmlFor="location">Yer <span className="zorunlu">*</span></label>
      <input type="text" id="location" name="location" value={data.location} onChange={handleChange} placeholder="Örn: A Blok Konferans Salonu" aria-invalid={errors.location ? true : undefined} />
      {errors.location && <span className="hata-metni">{errors.location}</span>}
      
      <label htmlFor="capacity">Kontenjan</label>
      <input type="number" id="capacity" name="capacity" min="1" max="1000" value={data.capacity} onChange={handleChange} aria-invalid={errors.capacity ? true : undefined} />
      {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" value={data.description} onChange={handleChange} placeholder="Etkinlik detayı..." aria-invalid={errors.description ? true : undefined}></textarea>
      {errors.description && <span className="hata-metni">{errors.description}</span>}

      <button type="submit" className="btn-primary">{submitText}</button>
    </form>
  );
}

export default EventForm;