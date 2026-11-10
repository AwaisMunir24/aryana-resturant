export const metadata = { title: "Contact | Aryana Restaurant" };
export default function Contact() {
  return (
    <section className="sec">
      <h2>Visit Aryana</h2>
      <div className="feat">
        <div><h3>Address</h3><p>Your restaurant address here</p></div>
        <div><h3>Opening hours</h3><p>Mon–Sun: 12:00 – 23:00</p></div>
        <div><h3>Order by WhatsApp</h3><p><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}>Message us</a></p></div>
      </div>
      <h2 style={{ marginTop: 44 }}>About us</h2>
      <p className="mut" style={{ maxWidth: 680 }}>Aryana brings the warmth of Afghan hospitality to your table. Our family recipes use traditional spices and slow cooking to create dishes that taste like home.</p>
    </section>
  );
}
