import SectionHeading from '../../components/public/SectionHeading'
import CampaignCard from '../../components/public/CampaignCard'
import DonationCTA from '../../components/public/DonationCTA'
import { CAMPAIGNS } from '../../utils/constants'

export default function Campaigns() {
  return <main className="inner-page"><section className="page-hero"><div className="section"><span className="eyebrow">Take action</span><h1>Small acts can create a lasting ripple.</h1><p>Support a campaign that speaks to you and help move essential work forward for children and families.</p></div></section><section className="section"><SectionHeading eyebrow="Current campaigns" title="Make an impact today" /><div className="campaign-grid campaign-grid-page">{CAMPAIGNS.map((campaign) => <CampaignCard key={campaign.title} campaign={campaign} />)}</div></section><DonationCTA /></main>
}
