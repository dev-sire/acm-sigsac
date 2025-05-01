
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: "Hackemon CTF",
    date: "May 10, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Computer Science Building, Room 301",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: "hackemon-ctf"
  },
  {
    id: 2,
    title: "Demogoron Debuggers",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Virtual Event",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: "demogoron-debuggers"
  },
  {
    id: 3,
    title: "Cyber Security Career Panel",
    date: "May 20, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Main Auditorium",
    category: "Panel",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    slug: ""
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
            <div key={event.id} className="scroll-fx" style={{ transitionDelay: `${index * 0.1}s` }}>
              <Card className="bg-cyber-dark/60 border border-white/10 overflow-hidden card-hover h-full">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-0 right-0 m-4">
                    <Badge className="bg-cyber-neon text-cyber-dark font-semibold">
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
                    <Calendar className="h-4 w-4 mr-2 text-cyber-neon" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <p className="text-white/70 mb-4">
                    {event.location}
                  </p>
                  
                  {event.slug ? (
                    <Link to={`/registration/${event.slug}`}>
                      <button className="w-full py-2 border border-cyber-neon text-cyber-neon hover:bg-cyber-neon/10 transition-colors rounded-md mt-2">
                        Register Now
                      </button>
                    </Link>
                  ) : (
                    <button className="w-full py-2 border border-white/30 text-white/50 cursor-not-allowed rounded-md mt-2">
                      Coming Soon
                    </button>
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
