import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const foundError = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(foundError);
    setSent(foundError === "");
  }

  return (
    <div className="auth-page">
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent && <p className="mesaj-basari">Bağlantı {email} adresine gönderildi (demo).</p>}
      
      <form className="form-container" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-posta</label>
        <input type="email" id="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} aria-invalid={error ? true : undefined} />
        {error && <span className="hata-metni">{error}</span>}

        <button type="submit" className="btn-primary">Bağlantı gönder</button>
      </form>
      <br/>
      <p><Link to="/login">&larr; Girişe dön</Link></p>
    </div>
  );
}

export default ForgotPasswordPage;