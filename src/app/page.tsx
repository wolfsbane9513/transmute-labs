'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { ArrowRight, Beaker, Bot, Code, Zap, Mail, MapPin, ExternalLink, Users, Briefcase, Clock, Target, TrendingUp, CheckCircle, Calendar, Globe, Star, Award, Github, Linkedin } from "lucide-react"

// Type definitions
interface ButtonProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  project: string;
  message: string;
}

// Component implementations
const Button: React.FC<ButtonProps> = ({ children, className = "", size = "default", variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const sizeClasses: Record<string, string> = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10"
  };
  
  const variantClasses: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent: React.FC<CardProps> = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "", ...props }) => {
  const variantClasses: Record<string, string> = {
    default: "bg-amber-500 text-slate-900 hover:bg-amber-400 border-amber-500",
    outline: "text-amber-400 border-2 border-amber-400 bg-slate-900/80 hover:bg-amber-400 hover:text-slate-900"
  };

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project: '',
    message: ''
  });

  const handleSubmit = (): void => {
    // In a real implementation, you'd send this to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', company: '', project: '', message: '' });
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="block text-sm font-medium text-slate-300 mb-2">Name</div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-300 mb-2">Email</div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="your.email@company.com"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="block text-sm font-medium text-slate-300 mb-2">Company</div>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            placeholder="Your company"
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-300 mb-2">Project Type</div>
          <select
            value={formData.project}
            onChange={(e) => handleChange('project', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Select project type</option>
            <option value="ai-automation">AI Automation</option>
            <option value="web-development">Web Development</option>
            <option value="data-analytics">Data Analytics</option>
            <option value="consulting">AI Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <div className="block text-sm font-medium text-slate-300 mb-2">Project Details</div>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="Tell us about your project goals and challenges..."
        />
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
      >
        Start Your AI Transformation
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default function HomePage(): React.ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Beaker className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">Transmute Labs</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-300 hover:text-amber-400 transition-colors">
                Services
              </a>
              <a href="#projects" className="text-slate-300 hover:text-amber-400 transition-colors">
                Case Studies
              </a>
              <a href="#team" className="text-slate-300 hover:text-amber-400 transition-colors">
                Team
              </a>
              <a href="#about" className="text-slate-300 hover:text-amber-400 transition-colors">
                About
              </a>
              <a href="#contact" className="text-slate-300 hover:text-amber-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="outline" className="mb-6 text-amber-300 border-amber-400 bg-slate-800/90 font-medium">
              AI-Powered Business Transformation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Turn AI Innovation Into{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Business Results
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Transmute Labs delivers production-ready AI solutions that drive measurable business impact. From enterprise chatbots to predictive analytics, we transform ambitious ideas into competitive advantages—in weeks, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                Book Free AI Strategy Call
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                View Success Stories
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-amber-400" />
                <span>12+ Years Enterprise Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-amber-400" />
                <span>$180K+ Annual Savings Delivered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>50% Faster Than Large Firms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Proven AI Solutions for Business Growth</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We don't just build AI systems—we deliver measurable business transformations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <Bot className="h-12 w-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Intelligent Automation</CardTitle>
                <CardDescription className="text-slate-300">
                  Deploy AI agents that eliminate manual processes and reduce operational costs by 30-50%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Enterprise chatbots (Llama 2, GPT-4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Document processing automation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Workflow optimization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Real-time decision engines</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Predictive Analytics</CardTitle>
                <CardDescription className="text-slate-300">
                  LSTM and SARIMA models that improve forecasting accuracy by 25-40%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Fraud detection systems</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Anomaly detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Time series forecasting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Risk management models</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <Code className="h-12 w-12 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-white">Full-Stack AI Platforms</CardTitle>
                <CardDescription className="text-slate-300">
                  End-to-end solutions from ML models to production-ready web applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Cloud-native architecture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">MLOps pipelines</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">Real-time dashboards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-300 text-sm">API development</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="projects" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories & Case Studies</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Real projects delivering measurable business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Enterprise AI Chatbot */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Bot className="h-8 w-8 text-amber-400" />
                  <Badge className="bg-green-600 text-white border-green-600 font-medium">Live Demo</Badge>
                </div>
                <CardTitle className="text-white">Enterprise AI Chatbot</CardTitle>
                <CardDescription className="text-slate-300">
                  Production-ready Llama 2 chatbot with 80-100x performance optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Performance Gain:</span>
                    <span className="text-amber-400 font-semibold">100x faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Technology:</span>
                    <span className="text-white text-sm">Meta Llama 2, Streamlit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Use Case:</span>
                    <span className="text-white text-sm">Customer Support</span>
                  </div>
                </div>
                <a
                  href="https://github.com/wolfsbane9513/Llama2_streamlit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Technical Implementation
                </a>
              </CardContent>
            </Card>

            {/* Aura Influence CRM */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Briefcase className="h-8 w-8 text-amber-400" />
                  <Badge className="bg-blue-600 text-white border-blue-600 font-medium">Production</Badge>
                </div>
                <CardTitle className="text-white">Aura Influence CRM</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete CRM solution for influencer marketing with automated workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Industry:</span>
                    <span className="text-white text-sm">Marketing Tech</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Features:</span>
                    <span className="text-white text-sm">Full-stack Platform</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Status:</span>
                    <span className="text-amber-400 font-semibold">Live & Scaling</span>
                  </div>
                </div>
                <a
                  href="https://aura-influence-crm.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Platform
                </a>
              </CardContent>
            </Card>

            {/* AdSynth Platform */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Target className="h-8 w-8 text-amber-400" />
                  <Badge className="bg-purple-600 text-white border-purple-600 font-medium">AI-Powered</Badge>
                </div>
                <CardTitle className="text-white">AdSynth AI Platform</CardTitle>
                <CardDescription className="text-slate-300">
                  Intelligent ad creation platform reducing creative time by 70%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Time Savings:</span>
                    <span className="text-amber-400 font-semibold">70% reduction</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">AI Models:</span>
                    <span className="text-white text-sm">Multi-agent LLM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Data Source:</span>
                    <span className="text-white text-sm">Reddit Mining</span>
                  </div>
                </div>
                <a
                  href="https://adsynth-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View AI Platform
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Results Banner */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-amber-500/10 to-purple-600/10 border-amber-400/30 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Proven Track Record</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">$180K+</div>
                    <div className="text-slate-300 text-sm">Annual Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">50%</div>
                    <div className="text-slate-300 text-sm">Reduction in Manual Work</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">30%</div>
                    <div className="text-slate-300 text-sm">Improvement in Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-2">12+</div>
                    <div className="text-slate-300 text-sm">Years Experience</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Expert Team with Proven Results</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Senior engineers with deep fintech and AI experience from Morgan Stanley, Barclays, and top firms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <CardTitle className="text-white text-lg">Ravi Prakash</CardTitle>
                <CardDescription className="text-slate-300">Founder & Senior Principal Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">Morgan Stanley VP</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">12+ Years ML/AI</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">$1M+ Log Analysis System</span>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/wolfsbane9513/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  <Linkedin className="mr-1 h-3 w-3" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <CardTitle className="text-white text-lg">Sai Dinesh D</CardTitle>
                <CardDescription className="text-slate-300">Full-Stack Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">20% Risk Accuracy Boost</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">15% Healthcare Cost Reduction</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">30% Processing Optimization</span>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/saidineshd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  <Linkedin className="mr-1 h-3 w-3" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <CardTitle className="text-white text-lg">Sruthi Vijayakumar</CardTitle>
                <CardDescription className="text-slate-300">Frontend Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Code className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">React/Next.js Expert</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Globe className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">UI/UX Design</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">Performance Optimization</span>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/sruthivijayakumar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  <Linkedin className="mr-1 h-3 w-3" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300 text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <CardTitle className="text-white text-lg">Abhiram Garuda</CardTitle>
                <CardDescription className="text-slate-300">Backend Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Bot className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">API Development</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Globe className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">Cloud Architecture</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-slate-400 text-xs">System Integration</span>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/abhiram-garuda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm"
                >
                  <Linkedin className="mr-1 h-3 w-3" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-slate-800/30 border-slate-700 max-w-5xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise & Certifications</h3>
                <div className="grid md:grid-cols-4 gap-6 text-left">
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-3">AI & Machine Learning</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• LangChain & LLM Systems</li>
                      <li>• LSTM, BERT, Transformers</li>
                      <li>• Computer Vision & NLP</li>
                      <li>• MLOps & Production AI</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-3">Financial Technology</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Fraud Detection Systems</li>
                      <li>• Risk Management Models</li>
                      <li>• Payment Processing</li>
                      <li>• Regulatory Compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-3">Cloud & Infrastructure</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• AWS, Azure, GCP</li>
                      <li>• Kubernetes & Docker</li>
                      <li>• CI/CD Pipelines</li>
                      <li>• Microservices Architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-3">Development Stack</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      <li>• Python, TypeScript, React</li>
                      <li>• Next.js, Node.js</li>
                      <li>• PostgreSQL, MongoDB</li>
                      <li>• REST APIs & GraphQL</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">The Transmute Labs Advantage</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                We're not just another AI consulting firm. Our team combines deep enterprise experience from Morgan Stanley and Barclays with cutting-edge AI innovation. We deliver production-ready solutions that create immediate business value.
              </p>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                While large consulting firms take months to deliver theoretical frameworks, we deploy working AI systems in weeks. Our boutique approach means you get partner-level attention with hands-on technical implementation.
              </p>
              <div className="flex items-center space-x-4">
                <Zap className="h-8 w-8 text-amber-400" />
                <span className="text-xl font-semibold text-white">Speed × Quality × Results</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-600/20 rounded-lg blur-xl"></div>
              <div className="relative bg-slate-800/50 p-8 rounded-lg border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-semibold">Proven Enterprise Experience</div>
                      <div className="text-slate-400 text-sm">12+ years at Morgan Stanley, Barclays, and top fintech firms</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-semibold">Rapid Implementation</div>
                      <div className="text-slate-400 text-sm">Deploy working AI systems in weeks, not months</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-semibold">Measurable ROI</div>
                      <div className="text-slate-400 text-sm">Track record of $180K+ annual savings and 30-50% efficiency gains</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-semibold">End-to-End Solutions</div>
                      <div className="text-slate-400 text-sm">From AI models to production deployment and maintenance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Start Your AI Transformation</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Book a free strategy call to discuss how AI can drive measurable results for your business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Get Started Today</CardTitle>
                <CardDescription className="text-slate-300">
                  Tell us about your project and we'll show you what's possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Mail className="h-5 w-5 text-amber-400" />
                    <span>ourtransmutelabs@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <MapPin className="h-5 w-5 text-amber-400" />
                    <span>Bengaluru, India</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-300">
                    <Clock className="h-5 w-5 text-amber-400" />
                    <span>Response time: 4-6 hours</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Our Process</CardTitle>
                  <CardDescription className="text-slate-300">How we deliver results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Strategic Assessment</h4>
                        <p className="text-slate-400 text-sm">Free 30-min consultation to identify AI opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Rapid Prototyping</h4>
                        <p className="text-slate-400 text-sm">Build working MVP in 1-2 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Production Deployment</h4>
                        <p className="text-slate-400 text-sm">Launch scalable solution with ongoing support</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Beaker className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold text-white">Transmute Labs</span>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p>&copy; 2024 Transmute Labs LLP. All rights reserved.</p>
              <p className="text-sm mt-1">transmutelabs.in</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}