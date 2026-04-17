import { useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const EVENT = {
  name: "TechSpark 2026",
  department: "Department of Computer Science & Engineering",
  date: "Saturday, 26 April 2025",
  time: "10:00 AM – 5:00 PM",
  venue: "Dr. APJ Abdul Kalam Auditorium, Block-C",
  price: 150,
  totalTickets: 200,
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ─── Sub-components ─────────────────────────────────────────────────────────

function EventDetails({ available }) {
  const sold = EVENT.totalTickets - available;
  const pct = Math.round((sold / EVENT.totalTickets) * 100);

  return (
    <div className="event-card">
      <div className="event-badge">LIVE EVENT</div>
      <h1 className="event-title">{EVENT.name}</h1>
      <p className="event-dept">{EVENT.department}</p>

      <div className="event-grid">
        <Detail icon="📅" label="Date" value={EVENT.date} />
        <Detail icon="⏰" label="Time" value={EVENT.time} />
        <Detail icon="📍" label="Venue" value={EVENT.venue} />
        <Detail icon="🎟️" label="Ticket Price" value={`₹${EVENT.price} / person`} />
      </div>

      <div className="availability-box">
        <div className="avail-row">
          <span className="avail-label">Tickets Available</span>
          <span className={`avail-count ${available === 0 ? "sold-out" : ""}`}>
            {available === 0 ? "SOLD OUT" : `${available} / ${EVENT.totalTickets}`}
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${pct}%`, background: pct > 80 ? "#ef4444" : "var(--accent)" }}
          />
        </div>
        <p className="avail-note">{sold} tickets already booked · {pct}% filled</p>
      </div>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-icon">{icon}</span>
      <div>
        <p className="detail-label">{label}</p>
        <p className="detail-value">{value}</p>
      </div>
    </div>
  );
}

function BookingForm({ available, onBook }) {
  const [form, setForm] = useState({ name: "", email: "", dept: "", tickets: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState(null);

  const departments = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "MBA / Management",
    "Faculty / Staff",
    "Other",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    else if (form.name.trim().length < 3) e.name = "Name must be at least 3 characters.";

    if (!form.email.trim()) e.email = "Email ID is required.";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address.";

    if (!form.dept) e.dept = "Please select your department.";

    if (!form.tickets) e.tickets = "Number of tickets is required.";
    else if (isNaN(form.tickets) || Number(form.tickets) < 1)
      e.tickets = "Enter a positive number of tickets.";
    else if (Number(form.tickets) > available)
      e.tickets = `Only ${available} ticket${available !== 1 ? "s" : ""} left.`;
    else if (Number(form.tickets) > 10)
      e.tickets = "Maximum 10 tickets per booking.";

    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const count = Number(form.tickets);
    const summary = {
      name: form.name.trim(),
      email: form.email.trim(),
      dept: form.dept,
      tickets: count,
      total: count * EVENT.price,
      bookingId: "TS" + Date.now().toString().slice(-6),
    };
    onBook(count);
    setBooking(summary);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", dept: "", tickets: "" });
    setErrors({});
    setSubmitted(false);
    setBooking(null);
  };

  if (submitted && booking) {
    return (
      <div className="form-card confirmation">
        <div className="confetti-ring">🎉</div>
        <h2 className="confirm-title">Booking Confirmed!</h2>
        <p className="confirm-sub">Your spot is reserved. See you there!</p>

        <div className="summary-box">
          <SummaryRow label="Booking ID" value={booking.bookingId} highlight />
          <SummaryRow label="Name" value={booking.name} />
          <SummaryRow label="Email" value={booking.email} />
          <SummaryRow label="Department" value={booking.dept} />
          <SummaryRow label="Event" value={EVENT.name} />
          <SummaryRow label="Tickets" value={`${booking.tickets} ticket${booking.tickets > 1 ? "s" : ""}`} />
          <div className="summary-divider" />
          <SummaryRow label="Total Amount" value={`₹${booking.total}`} highlight />
        </div>

        <p className="confirm-note">
          A confirmation will be sent to <strong>{booking.email}</strong>
        </p>
        <button className="btn-reset" onClick={handleReset}>
          Book Another Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Book Your Ticket</h2>
      <p className="form-sub">Fill in the details below to reserve your seat.</p>

      {available === 0 && (
        <div className="alert-soldout">
          ⚠️ All tickets are sold out. No more bookings accepted.
        </div>
      )}

      <div className="field-group">
        <label className="field-label">Full Name <span className="req">*</span></label>
        <input
          className={`field-input ${errors.name ? "error" : ""}`}
          placeholder="e.g. Arjun Sharma"
          value={form.name}
          onChange={handleChange("name")}
          disabled={available === 0}
        />
        {errors.name && <p className="field-error">⚠ {errors.name}</p>}
      </div>

      <div className="field-group">
        <label className="field-label">Email ID <span className="req">*</span></label>
        <input
          className={`field-input ${errors.email ? "error" : ""}`}
          placeholder="e.g. arjun@college.edu"
          value={form.email}
          onChange={handleChange("email")}
          disabled={available === 0}
          type="email"
        />
        {errors.email && <p className="field-error">⚠ {errors.email}</p>}
      </div>

      <div className="field-group">
        <label className="field-label">Department <span className="req">*</span></label>
        <select
          className={`field-input ${errors.dept ? "error" : ""}`}
          value={form.dept}
          onChange={handleChange("dept")}
          disabled={available === 0}
        >
          <option value="">— Select your department —</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.dept && <p className="field-error">⚠ {errors.dept}</p>}
      </div>

      <div className="field-group">
        <label className="field-label">
          Number of Tickets <span className="req">*</span>
          <span className="field-hint"> (max 10 per booking)</span>
        </label>
        <input
          className={`field-input ${errors.tickets ? "error" : ""}`}
          placeholder="e.g. 2"
          value={form.tickets}
          onChange={handleChange("tickets")}
          disabled={available === 0}
          type="number"
          min="1"
          max="10"
        />
        {errors.tickets && <p className="field-error">⚠ {errors.tickets}</p>}
        {form.tickets && !errors.tickets && Number(form.tickets) > 0 && (
          <p className="field-preview">
            💰 Total: ₹{Number(form.tickets) * EVENT.price}
          </p>
        )}
      </div>

      <div className="btn-row">
        <button className="btn-submit" onClick={handleSubmit} disabled={available === 0}>
          Confirm Booking →
        </button>
        <button className="btn-clear" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }) {
  return (
    <div className={`summary-row ${highlight ? "highlight" : ""}`}>
      <span className="sum-label">{label}</span>
      <span className="sum-value">{value}</span>
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
export default function App() {
  const [available, setAvailable] = useState(EVENT.totalTickets);

  const handleBook = (count) => {
    setAvailable((a) => a - count);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --bg: #0d0e14;
          --surface: #13141c;
          --surface2: #1a1b26;
          --border: rgba(255,255,255,0.07);
          --accent: #f5a623;
          --accent2: #e8622c;
          --text: #f0f0f5;
          --muted: #7a7a9a;
          --success: #22c55e;
          --error: #f87171;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(245,166,35,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 110%, rgba(232,98,44,0.10) 0%, transparent 60%);
        }

        .app-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }

        /* NAV */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0 2.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2.5rem;
        }
        .topbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .topbar-tag {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 0.3rem 0.85rem;
          letter-spacing: 0.05em;
        }

        /* LAYOUT */
        .layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media(max-width: 768px) {
          .layout { grid-template-columns: 1fr; }
        }

        /* EVENT CARD */
        .event-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .event-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
        }
        .event-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent);
          border: 1px solid rgba(245,166,35,0.35);
          background: rgba(245,166,35,0.08);
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          margin-bottom: 1rem;
          animation: pulse-badge 2s ease-in-out infinite;
        }
        @keyframes pulse-badge {
          0%,100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .event-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #ffffff 40%, var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.4rem;
        }
        .event-dept {
          font-size: 0.85rem;
          color: var(--muted);
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }
        .event-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .detail-item {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.85rem;
        }
        .detail-icon { font-size: 1.1rem; margin-top: 1px; }
        .detail-label {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }
        .detail-value {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text);
          line-height: 1.35;
        }

        /* AVAILABILITY */
        .availability-box {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.1rem 1.2rem;
        }
        .avail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.7rem;
        }
        .avail-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--muted);
          text-transform: uppercase;
        }
        .avail-count {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent);
        }
        .avail-count.sold-out { color: var(--error); }
        .progress-track {
          height: 5px;
          background: rgba(255,255,255,0.07);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 0.55rem;
        }
        .progress-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s cubic-bezier(0.34,1.2,0.64,1);
        }
        .avail-note { font-size: 0.73rem; color: var(--muted); }

        /* FORM CARD */
        .form-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem;
          position: sticky;
          top: 1.5rem;
        }
        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
        }
        .form-sub { font-size: 0.83rem; color: var(--muted); margin-bottom: 1.5rem; }

        .alert-soldout {
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.25);
          color: var(--error);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          margin-bottom: 1.2rem;
        }

        /* FIELDS */
        .field-group { margin-bottom: 1.1rem; }
        .field-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #b0b0c8;
          margin-bottom: 0.45rem;
          text-transform: uppercase;
        }
        .req { color: var(--accent); }
        .field-hint { color: var(--muted); font-weight: 400; text-transform: none; font-size: 0.74rem; }
        .field-input {
          width: 100%;
          background: var(--surface2);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          padding: 0.7rem 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .field-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(245,166,35,0.12);
        }
        .field-input.error {
          border-color: var(--error);
          box-shadow: 0 0 0 3px rgba(248,113,113,0.1);
        }
        .field-input:disabled { opacity: 0.45; cursor: not-allowed; }
        .field-input option { background: #1a1b26; }
        .field-error {
          font-size: 0.75rem;
          color: var(--error);
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .field-preview {
          font-size: 0.78rem;
          color: var(--success);
          margin-top: 0.3rem;
          font-weight: 500;
        }

        /* BUTTONS */
        .btn-row {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .btn-submit {
          flex: 1;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none;
          border-radius: 10px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.8rem 1.2rem;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-submit:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-clear {
          background: var(--surface2);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          padding: 0.8rem 1.1rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-clear:hover { border-color: rgba(255,255,255,0.2); color: var(--text); }

        /* CONFIRMATION */
        .confirmation { text-align: center; }
        .confetti-ring {
          font-size: 3rem;
          margin-bottom: 0.75rem;
          display: inline-block;
          animation: bounce 0.8s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes bounce {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .confirm-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
          background: linear-gradient(90deg, var(--accent), var(--success));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .confirm-sub { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem; }
        .summary-box {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.1rem 1.2rem;
          text-align: left;
          margin-bottom: 1.2rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.45rem 0;
        }
        .summary-row.highlight .sum-value {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--accent);
        }
        .sum-label { font-size: 0.78rem; color: var(--muted); }
        .sum-value { font-size: 0.85rem; font-weight: 500; color: var(--text); }
        .summary-divider {
          height: 1px;
          background: var(--border);
          margin: 0.5rem 0;
        }
        .confirm-note {
          font-size: 0.78rem;
          color: var(--muted);
          margin-bottom: 1.2rem;
          line-height: 1.5;
        }
        .confirm-note strong { color: var(--text); }
        .btn-reset {
          background: transparent;
          border: 1.5px solid var(--accent);
          border-radius: 10px;
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .btn-reset:hover {
          background: rgba(245,166,35,0.1);
        }

        /* FOOTER */
        .footer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          text-align: center;
          font-size: 0.75rem;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="app-wrapper">
        <nav className="topbar">
          <span className="topbar-logo">⚡ TechSpark Portal</span>
          <span className="topbar-tag">Internal Event · 2025</span>
        </nav>

        <div className="layout">
          <EventDetails available={available} />
          <BookingForm available={available} onBook={handleBook} />
        </div>

        <footer className="footer">
          Department of Computer Science &amp; Engineering · Internal Ticket Booking System
        </footer>
      </div>
    </>
  );
}
