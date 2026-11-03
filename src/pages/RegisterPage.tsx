import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string; email?: string; password?: string; password2?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "Ad Soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password !== password2) found.password2 = "Şifreler aynı değil.";
    
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div className="auth-page">
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      {sent && <p className="mesaj-basari">Kayıt başarılı! Gerçek kayıt Sprint 10'da aktif edilecek.</p>}
      
      <form className="form-container" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Ad Soyad</label>
        <input type="text" id="name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} />
        {errors.name && <span className="hata-metni">{errors.name}</span>}

        <label htmlFor="email">E-posta</label>
        <input type="email" id="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} />
        {errors.email && <span className="hata-metni">{errors.email}</span>}

        <label htmlFor="password">Şifre</label>
        <input type="password" id="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} aria-invalid={errors.password ? true : undefined} />
        {errors.password && <span className="hata-metni">{errors.password}</span>}

        <label htmlFor="password2">Şifre (tekrar)</label>
        <input type="password" id="password2" value={password2} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)} aria-invalid={errors.password2 ? true : undefined} />
        {errors.password2 && <span className="hata-metni">{errors.password2}</span>}

        <button type="submit" className="btn-primary">Kayıt ol</button>
      </form>
      <br/>
      <p><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></p>
    </div>
  );
}

export default RegisterPage;