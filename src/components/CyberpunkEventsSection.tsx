import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Binary, Users, Trophy, Zap } from 'lucide-react';
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
    registrationEnds: "2025-05-29T12:00:00",
    isCompetition: true,
    participants: 75,
    prize: "10000 PKR"
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
    isCompetition: true,
    participants: 100,
    prize: "10000 PKR"
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
    registrationEnds: "2025-05-25T15:00:00", // Two days before the event
    isCompetition: false,
    participants: 300,
    prize: null
  },
];

const CyberpunkEventsSection = () => {
  return (
    <section id="events" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-coastal-900 to-coastal-800"></div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(97, 165, 194, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(97, 165, 194, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-drift 20s linear infinite reverse'
          }}
        />
      </div>

      {/* Cyber Scan Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cyber-scan" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="cyber-button px-6 py-3 rounded-lg">
              <span className="font-tech text-coastal-200 text-sm tracking-wider">
                ./EVENTS_DIRECTORY/
              </span>
            </div>
          </div>

          <h2 className="text-heading-lg font-orbitron mb-6 cyber-text">
            PAST <span className="hologram-text">CYBER</span> EVENTS
          </h2>

          <p className="max-w-3xl mx-auto text-coastal-300 text-lg font-rajdhani leading-relaxed">
            Join our elite cybersecurity events where cutting-edge knowledge meets
            practical application. Compete, learn, and network with industry leaders.
          </p>

          {/* Decorative Lines */}
          <div className="flex justify-center mt-8">
            <div className="w-64 h-0.5 bg-gradient-to-r from-transparent via-coastal-200 to-transparent"></div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="event-card group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="cyber-button bg-coastal-800/60 border-coastal-700 overflow-hidden h-full hover:bg-coastal-700/60 transition-all duration-500 group">

                {/* Holographic Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-coastal-200/5 via-transparent to-coastal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Cyber Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-coastal-900/80 via-transparent to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="cyber-button bg-coastal-200/90 text-coastal-900 font-orbitron font-bold text-xs px-3 py-1">
                      <Binary className="h-3 w-3 mr-1" />
                      {event.category.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Competition Prize */}
                  {event.prize && (
                    <div className="absolute top-4 left-4">
                      <div className="cyber-button bg-coastal-400/90 text-coastal-900 px-3 py-1 rounded-md flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        <span className="font-orbitron font-bold text-xs">{event.prize}</span>
                      </div>
                    </div>
                  )}

                  {/* Participant Count */}
                  <div className="absolute bottom-4 left-4">
                    <div className="cyber-button bg-coastal-800/90 text-coastal-200 px-3 py-1 rounded-md flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span className="font-tech text-xs">{event.participants}+ REGISTERED</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-coastal-100 font-orbitron group-hover:text-coastal-50 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Date & Time */}
                  <div className="flex items-center mb-4 text-coastal-300">
                    <Calendar className="h-4 w-4 mr-2 text-coastal-200" />
                    <span className="font-rajdhani">{event.date} • {event.time}</span>
                  </div>

                  {/* Location */}
                  <p className="text-coastal-300 mb-6 font-rajdhani">
                    📍 {event.location}
                  </p>

                  {/* Countdown Timer */}
                  <div className="mb-6">
                    <p className="text-sm text-coastal-400 mb-2 font-tech tracking-wider">
                      {new Date(event.registrationEnds) < new Date() ?
                        "REGISTRATION_STATUS:" :
                        "REGISTRATION_CLOSES_IN:"}
                    </p>
                    <div className="cyber-button p-3 rounded-md">
                      <CountdownTimer
                        endDate={event.registrationEnds}
                        className="justify-center"
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  {event.slug && new Date(event.registrationEnds) > new Date() ? (
                    <Link to={`/registration/${event.slug}`}>
                      <Button
                        className="w-full cyber-button bg-gradient-to-r from-coastal-400 to-coastal-200 text-coastal-900 hover:from-coastal-200 hover:to-coastal-100 font-orbitron font-semibold"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        INITIALIZE_REGISTRATION
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full cyber-button border-coastal-700 text-coastal-400 cursor-not-allowed bg-coastal-900/50 font-orbitron"
                      disabled
                    >
                      {event.slug ? "REGISTRATION_CLOSED" : "COMING_SOON"}
                    </Button>
                  )}
                </CardContent>

                {/* Bottom Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-coastal-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* View All Events CTA */}
        <div className="text-center mt-16">
          <div className="inline-block cyber-button p-6 rounded-lg">
            <Link
              to="/registration"
              className="text-coastal-200 hover:text-coastal-100 transition-colors font-orbitron font-medium text-lg group"
            >
              <span className="flex items-center gap-3">
                <Binary className="h-5 w-5 group-hover:animate-pulse" />
                  VIEW_ALL_EVENTS.exe
                <Zap className="h-5 w-5 group-hover:animate-pulse" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberpunkEventsSection;