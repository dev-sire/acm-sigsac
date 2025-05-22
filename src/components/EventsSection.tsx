
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from './CountdownTimer';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: 1,
    title: "Hackemon CTF",
    date: "May 29, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Gulberg Campus Library",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: "hackemon-ctf",
    registrationEnds: "2025-05-28T09:00:00",
    isCompetition: true
  },
  {
    id: 2,
    title: "Demogoron Debuggers",
    date: "May 29, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Gulberg Campus Library",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: "demogoron-debuggers",
    registrationEnds: "2025-05-28T08:00:00", // One day before the event
    isCompetition: true
  },
  {
    id: 3,
    title: "Cyber Security Seminars",
    date: "May 27, 2025 & May 27, 2025",
    time: "1:00 PM - 2:00 PM",
    location: "Main Campus Seminar Hall",
    category: "Panel",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: "seminars",
    registrationEnds: "2025-05-27T15:00:00", // Two days before the event
    isCompetition: false
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-heading-md mb-4 circuit-line inline-block">
            Upcoming <span className="text-cyber-neon">Events</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Join us for our upcoming events where you'll learn new skills, 
            network with professionals, and participate in hands-on activities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className="scroll-fx" 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="bg-cyber-dark/60 border border-white/10 overflow-hidden card-hover h-full relative group">
                {/* Binary animation overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none overflow-hidden">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i}
                      className="binary-rain"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `-${Math.random() * 20}px`,
                        animationDuration: `${4 + Math.random() * 8}s`,
                        animationDelay: `${Math.random() * 5}s`
                      }}
                    >
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div key={j} className="text-cyber-neon/20 text-xs">
                          {Math.round(Math.random()) === 1 ? '1' : '0'}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                
                {/* Circuit animation overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="circuit-path-animated"></div>
                </div>
                
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <Badge className="bg-cyber-neon text-cyber-dark font-semibold animate-pulse-glow">
                      <Binary className="h-3 w-3 mr-1" />
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl text-white group">
                    <span className="hover-underline cursor-pointer">
                      {event.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center mb-3 text-white/70">
                    <Calendar className="h-4 w-4 mr-2 text-cyber-neon animate-pulse-glow" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <p className="text-white/70 mb-4">
                    {event.location}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-white/50 mb-1">
                      {new Date(event.registrationEnds) < new Date() ? 
                        "Registration status:" : 
                        "Registration closes in:"}
                    </p>
                    <CountdownTimer 
                      endDate={event.registrationEnds} 
                      className="justify-center mt-1" 
                    />
                  </div>
                  
                  {event.slug && new Date(event.registrationEnds) > new Date() ? (
                    <Link to={`/registration/${event.slug}`}>
                      <Button 
                        variant="outline" 
                        className="w-full border border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 transition-colors"
                      >
                        Register Now
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full border border-white/30 text-white/50 cursor-not-allowed bg-red-900/20"
                      disabled
                    >
                      {event.slug ? "Registration Closed" : "Coming Soon"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/registration" className="text-cyber-neon hover:text-cyber-neon/80 hover-underline transition-all">
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
