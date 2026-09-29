export default function CampaignCard({ campaign }) {
  const progress = Math.min(100, Math.max(0, Number(campaign.progress) || 0));
  return (
    <article className="campaign-card">
      <img src={campaign.image} alt={`${campaign.title} campaign`} />
      <div className="campaign-content">
        <div className="campaign-heading">
          <h3>{campaign.title}</h3>
          <span>Ongoing</span>
        </div>
        <p>{campaign.text}</p>
        <div className="progress" role="progressbar" aria-label={`${campaign.title} donation progress`} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="campaign-meta">
          <strong>₹{campaign.raised} raised</strong>
          <span>of ₹{campaign.goal}</span>
        </div>
        <a className="button button-primary small" href={campaign.donateHref || "/donate"}>
          Donate Now
        </a>
      </div>
    </article>
  );
}
