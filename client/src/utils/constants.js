export const HOME_IMAGES = {
	children: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=85',
	childLearning: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=85',
	healthcare: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
	planting: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
	school: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85',
	meal: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=85',
}

export const PROJECTS = [
	{ title: 'Project Udaan', type: 'Education', text: 'Providing quality education and learning resources to underprivileged children.', image: HOME_IMAGES.childLearning, icon: 'education', color: 'blue' },
	{ title: 'Project Sehat', type: 'Healthcare', text: 'Supporting better healthcare access and health awareness in rural areas.', image: HOME_IMAGES.healthcare, icon: 'healthcare', color: 'red' },
	{ title: 'Project Hariyali', type: 'Environment', text: 'Tree plantation and environmental awareness for a greener tomorrow.', image: HOME_IMAGES.planting, icon: 'environment', color: 'green' },
]

export const CAMPAIGNS = [
	{ title: 'School Kit Drive', image: HOME_IMAGES.school, raised: '25,000', goal: '50,000', progress: 50, text: 'Help us provide essential school kits to underprivileged children and support their education.' },
	{ title: 'Food for Every Child', image: HOME_IMAGES.meal, raised: '40,000', goal: '75,000', progress: 53, text: 'Support our mission to provide nutritious meals to children in need.' },
]

export const HOME_STATS = [
	{ icon: 'community', value: '2,500+', label: 'Lives Impacted' },
	{ icon: 'education', value: '12+', label: 'Projects' },
	{ icon: 'healthcare', value: '₹12.5L+', label: 'Donations Received' },
	{ icon: 'community', value: '500+', label: 'Community Members' },
]

export const IMPACT_STATS = [
	{ icon: 'education', value: '1,200+', label: 'Children Educated' },
	{ icon: 'healthcare', value: '3,000+', label: 'Medical Support' },
	{ icon: 'community', value: '800+', label: 'Families Supported' },
	{ icon: 'environment', value: '5,000+', label: 'Trees Planted' },
]

export const GALLERY_IMAGES = [
	HOME_IMAGES.childLearning,
	HOME_IMAGES.healthcare,
	HOME_IMAGES.children,
	HOME_IMAGES.planting,
	HOME_IMAGES.meal,
]

export const FOCUS_AREAS = [
	{ title: 'Education', icon: 'education', text: 'Helping children learn, grow and build a confident future.' },
	{ title: 'Healthcare', icon: 'healthcare', text: 'Improving access to essential care and health awareness.' },
	{ title: 'Community Development', icon: 'community', text: 'Building resilient communities through local action.' },
	{ title: 'Women Empowerment', icon: 'women', text: 'Creating opportunities for women to lead and thrive.' },
	{ title: 'Youth Development', icon: 'youth', text: 'Equipping young people with skills and purpose.' },
	{ title: 'Environment', icon: 'environment', text: 'Protecting natural spaces for generations to come.' },
]

export const NEWS = [
	{ title: 'A new school year begins with hope', date: '12 Aug 2025', image: HOME_IMAGES.childLearning, excerpt: 'Our education team distributed learning kits and spent a joyful day with local students.' },
	{ title: 'Community health camp reaches 300 families', date: '28 Jul 2025', image: HOME_IMAGES.healthcare, excerpt: 'Volunteers and healthcare workers came together to offer check-ups and practical guidance.' },
	{ title: 'Growing greener communities together', date: '05 Jun 2025', image: HOME_IMAGES.planting, excerpt: 'This World Environment Day, children and families planted new trees in their neighbourhood.' },
]
