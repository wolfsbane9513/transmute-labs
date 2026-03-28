export const technologies = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenAI', 'LangChain', 
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'FastAPI'
];

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    icon: 'Bot' as const,
    title: 'Intelligent Automation',
    description: 'Deploy AI agents that eliminate manual processes and reduce operational costs by 30-50%',
    features: [
      'Enterprise chatbots (Llama 2, GPT-4)',
      'Document processing automation',
      'Workflow optimization',
      'Real-time decision engines',
    ],
  },
  {
    icon: 'TrendingUp' as const,
    title: 'Predictive Analytics',
    description: 'LSTM and SARIMA models that improve forecasting accuracy by 25-40%',
    features: [
      'Fraud detection systems',
      'Anomaly detection',
      'Time series forecasting',
      'Risk management models',
    ],
  },
  {
    icon: 'Code' as const,
    title: 'Full-Stack AI Platforms',
    description: 'End-to-end solutions from ML models to production-ready web applications',
    features: [
      'Cloud-native architecture',
      'MLOps pipelines',
      'Real-time dashboards',
      'API development',
    ],
  },
];

export const caseStudies = [
  {
    icon: 'Bot' as const,
    badge: { text: 'Live Demo', variant: 'green' as const },
    title: 'Enterprise AI Chatbot',
    description: 'Production-ready Llama 2 chatbot with 80-100x performance optimization',
    stats: [
      { label: 'Performance Gain:', value: '100x faster' },
      { label: 'Technology:', value: 'Meta Llama 2, Streamlit' },
      { label: 'Use Case:', value: 'Customer Support' },
    ],
    link: {
      url: 'https://github.com/wolfsbane9513/Llama2_streamlit',
      text: 'View Technical Implementation',
      icon: 'Github' as const,
    },
  },
  {
    icon: 'Briefcase' as const,
    badge: { text: 'Production', variant: 'blue' as const },
    title: 'Aura Influence CRM',
    description: 'Complete CRM solution for influencer marketing with automated workflows',
    stats: [
      { label: 'Industry:', value: 'Marketing Tech' },
      { label: 'Features:', value: 'Full-stack Platform' },
      { label: 'Status:', value: 'Live & Scaling' },
    ],
    link: {
      url: 'https://aura-influence-crm.vercel.app/',
      text: 'View Live Platform',
      icon: 'ExternalLink' as const,
    },
  },
  {
    icon: 'Target' as const,
    badge: { text: 'AI-Powered', variant: 'purple' as const },
    title: 'AdSynth AI Platform',
    description: 'Intelligent ad creation platform reducing creative time by 70%',
    stats: [
      { label: 'Time Savings:', value: '70% reduction' },
      { label: 'AI Models:', value: 'Multi-agent LLM' },
      { label: 'Data Source:', value: 'Reddit Mining' },
    ],
    link: {
      url: 'https://adsynth-frontend.vercel.app/',
      text: 'View AI Platform',
      icon: 'ExternalLink' as const,
    },
  },
];

export const stats = [
  { value: '$180K+', label: 'Annual Cost Savings' },
  { value: '50%', label: 'Reduction in Manual Work' },
  { value: '30%', label: 'Improvement in Accuracy' },
  { value: '12+', label: 'Years Combined Experience' },
];

export const teamMembers = [
  {
    name: 'Sruthi Vijayakumar',
    role: 'Co-Founder & Lead Data Scientist',
    achievements: [
      { icon: 'Award' as const, text: 'Expert Data Scientist' },
      { icon: 'Star' as const, text: 'ML Engineering Expert' },
      { icon: 'TrendingUp' as const, text: 'Proven Track Record' },
    ],
    linkedin: 'https://www.linkedin.com/in/sruthivijayakumar/',
  },
  {
    name: 'Ravi Prakash',
    role: 'Co-Founder & Senior Principal Engineer',
    achievements: [
      { icon: 'Award' as const, text: 'Senior Principal Engineer' },
      { icon: 'Star' as const, text: '12+ Years ML/AI' },
      { icon: 'TrendingUp' as const, text: '$1M+ Log Analysis System' },
    ],
    linkedin: 'https://www.linkedin.com/in/wolfsbane9513/',
  },
  {
    name: 'Sai Dinesh D',
    role: 'Full Stack AI Engineer',
    achievements: [
      { icon: 'CheckCircle' as const, text: '20% Risk Accuracy Boost' },
      { icon: 'TrendingUp' as const, text: '15% Healthcare Cost Reduction' },
      { icon: 'Zap' as const, text: '30% Processing Optimization' },
    ],
    linkedin: 'https://www.linkedin.com/in/saidineshd/',
  },
  {
    name: 'Abhiram Garuda',
    role: 'Backend Engineer',
    achievements: [
      { icon: 'Bot' as const, text: 'API Development' },
      { icon: 'Globe' as const, text: 'Cloud Architecture' },
      { icon: 'CheckCircle' as const, text: 'System Integration' },
    ],
    linkedin: 'https://www.linkedin.com/in/abhiram-garuda/',
  },
];

export const expertise = [
  {
    title: 'AI & Machine Learning',
    items: ['LangChain & LLM Systems', 'LSTM, BERT, Transformers', 'Computer Vision & NLP', 'MLOps & Production AI'],
  },
  {
    title: 'Financial Technology',
    items: ['Fraud Detection Systems', 'Risk Management Models', 'Payment Processing', 'Regulatory Compliance'],
  },
  {
    title: 'Cloud & Infrastructure',
    items: ['AWS, Azure, GCP', 'Kubernetes & Docker', 'CI/CD Pipelines', 'Microservices Architecture'],
  },
  {
    title: 'Development Stack',
    items: ['Python, TypeScript, React', 'Next.js, Node.js', 'PostgreSQL, MongoDB', 'REST APIs & GraphQL'],
  },
];

export const processSteps = [
  {
    number: 1,
    title: 'Strategic Assessment',
    description: 'Free 30-min consultation to identify AI opportunities',
  },
  {
    number: 2,
    title: 'Rapid Prototyping',
    description: 'Build working MVP in 1-2 weeks',
  },
  {
    number: 3,
    title: 'Production Deployment',
    description: 'Launch scalable solution with ongoing support',
  },
];

export const trustIndicators = [
  { icon: 'CheckCircle' as const, text: '12+ Years Enterprise Experience' },
  { icon: 'TrendingUp' as const, text: '$180K+ Annual Savings Delivered' },
  { icon: 'Clock' as const, text: '50% Faster Than Large Firms' },
];

export const advantages = [
  {
    title: 'Proven Enterprise Experience',
    description: '12+ years in fintech, AI, and data science with proven track record',
  },
  {
    title: 'Rapid Implementation',
    description: 'Deploy working AI systems in weeks, not months',
  },
  {
    title: 'Measurable ROI',
    description: 'Track record of $180K+ annual savings and 30-50% efficiency gains',
  },
  {
    title: 'End-to-End Solutions',
    description: 'From AI models to production deployment and maintenance',
  },
];
