import { useEffect, useState } from "react";
import { Heart, Info, ShieldCheck } from "lucide-react";
import SectionHeading from "../../components/public/SectionHeading";
import {
  createDonationOrder,
  failDonationPayment,
  verifyDonationPayment,
} from "../../services/donationService";

const amounts = [100, 250, 500, 1000, 2000, 5000];
const initialForm = {
  donorName: "",
  email: "",
  phone: "",
  pinCode: "",
  address: "",
  city: "",
  state: "",
};

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Unable to load the payment gateway."));
    document.body.appendChild(script);
  });
}

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(amounts[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRazorpay().catch(() => undefined);
  }, []);

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const chooseAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleCustomAmount = (event) => {
    const value = event.target.value;
    setCustomAmount(value);
    setSelectedAmount(value ? Number(value) : 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");
    setIsSubmitting(true);

    let donationId;
    try {
      await loadRazorpay();
      const order = await createDonationOrder({ ...form, amount: selectedAmount });
      donationId = order.donationId;

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Sevoday Foundation",
        description: "Donation to Sevoday Foundation",
        order_id: order.orderId,
        prefill: { name: form.donorName, email: form.email, contact: form.phone },
        notes: { donationId: order.donationId },
        theme: { color: "#1f4a2c" },
        handler: async (payment) => {
          try {
            await verifyDonationPayment({ donationId, ...payment });
            setStatus("Thank you. Your donation was completed successfully.");
            setForm(initialForm);
            setCustomAmount("");
            setSelectedAmount(amounts[0]);
          } catch (verificationError) {
            setError(verificationError.message);
          }
        },
        modal: {
          ondismiss: async () => {
            await failDonationPayment(donationId);
            setStatus("Payment was cancelled. You can try again whenever you are ready.");
          },
        },
      });

      checkout.on("payment.failed", async () => {
        await failDonationPayment(donationId);
        setError("Payment failed. No donation was completed.");
      });
      checkout.open();
    } catch (submitError) {
      if (donationId) await failDonationPayment(donationId).catch(() => undefined);
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="section">
          <span className="eyebrow">Give with purpose</span>
          <h1>Your generosity helps communities move forward.</h1>
          <p>Every contribution supports practical work in education, healthcare and sustainable community development.</p>
        </div>
      </section>

      <section className="section donate-layout">
        <div>
          <SectionHeading eyebrow="Make a difference" title="Choose your contribution" />
          <p className="donate-copy">Your donation is processed securely through Razorpay. Please enter your details to continue.</p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label className="custom-amount" htmlFor="donation-amount">
              Donation Amount <span aria-hidden="true">*</span>
              <div className="amount-grid" role="group" aria-label="Donation amount">
                {amounts.map((amount) => (
                  <button
                    className={`amount-button ${selectedAmount === amount ? "is-selected" : ""}`}
                    type="button"
                    aria-pressed={selectedAmount === amount}
                    key={amount}
                    onClick={() => chooseAmount(amount)}
                  >
                    ₹{amount.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <div className="custom-amount-input">
                <span aria-hidden="true">₹</span>
                <input id="donation-amount" type="number" min="1" value={customAmount} placeholder="Enter amount" onChange={handleCustomAmount} />
              </div>
            </label>

            <div className="form-section-grid">
              <label className="form-field">Full Name <span aria-hidden="true">*</span><input name="donorName" value={form.donorName} onChange={updateForm} placeholder="Your name" required /></label>
              <label className="form-field">Email <span aria-hidden="true">*</span><input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required /></label>
              <label className="form-field">Phone <span aria-hidden="true">*</span><input name="phone" value={form.phone} onChange={updateForm} placeholder="+91 98765 43210" required /></label>
              <label className="form-field">Pincode <span aria-hidden="true">*</span><input name="pinCode" value={form.pinCode} onChange={updateForm} placeholder="e.g. 110001" required /></label>
              <label className="form-field file-field">Address <span aria-hidden="true">*</span><input name="address" value={form.address} onChange={updateForm} placeholder="House / Flat / Street" required /></label>
              <label className="form-field">City <span aria-hidden="true">*</span><input name="city" value={form.city} onChange={updateForm} placeholder="City" required /></label>
              <label className="form-field">State <span aria-hidden="true">*</span><input name="state" value={form.state} onChange={updateForm} placeholder="State" required /></label>
            </div>

            {error ? <p className="form-error" role="alert">{error}</p> : null}
            {status ? <p className="auth-status" role="status">{status}</p> : null}
            <p className="secure-note"><Info size={16} aria-hidden="true" /> Your information is secure and used only for donation receipt purposes.</p>
            <button className="button button-primary donate-submit" type="submit" disabled={isSubmitting}>
              <Heart size={17} fill="currentColor" aria-hidden="true" />
              {isSubmitting ? "Preparing payment..." : "Donate Now"}
            </button>
            <p className="secure-note"><ShieldCheck size={16} aria-hidden="true" /> Payments are securely processed by Razorpay.</p>
          </form>
        </div>

        <div className="donate-panel">
          <Heart size={30} aria-hidden="true" />
          <h3>Where your support goes</h3>
          <ul>
            <li>Learning resources for children</li>
            <li>Community health outreach</li>
            <li>Local environmental action</li>
            <li>Support for self-reliant families</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
