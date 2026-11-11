import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <br />
      <Link to="/" className="btn-primary">Ana sayfaya dön</Link>
    </div>
  );
}

export default NotFoundPage;