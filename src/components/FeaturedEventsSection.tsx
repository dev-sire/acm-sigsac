
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Award, Star } from 'lucide-react';

const FeaturedEventsSection = () => {
  // Core team data for Psyber Arena (8 members)
  const coreTeam = [
    {
      id: 1,
      name: "Abdul Wasay Khan",
      role: "Vice President",
      image: "/candidates/wasay-2.jpg",
      initials: "AWK"
    },
    {
      id: 2,
      name: "Rabia Ishtiaq",
      role: "Treasurer",
      image: "/candidates/rabia.jpg",
      initials: "RI"
    },
    {
      id: 3,
      name: "Syed Usaiym Junaid",
      role: "General Secretary",
      image: "/candidates/usaiym.jpg",
      initials: "SUJ"
    },
    {
      id: 4,
      name: "Hafsah Anwaar Ali",
      role: "Social Media Manager",
      image: "/candidates/hafsa.jpg",
      initials: "ER"
    },
    {
      id: 5,
      name: "Ammara Qazi",
      role: "Information Secretary",
      image: "/candidates/ammara.jpg",
      initials: "AQ"
    },
    {
      id: 6,
      name: "Sofia Asif",
      role: "Director of Treasurer",
      image: "/candidates/sofia.jpg",
      initials: "SA"
    },
    {
      id: 7,
      name: "Aman Shahid",
      role: "Tech Lead",
      image: "/candidates/my-profile.jpg",
      initials: "AS"
    },
    {
      id: 8,
      name: "Ubaid Raza",
      role: "Director of Photography",
      image: "/candidates/ubaid.jpg",
      initials: "UR"
    }
  ];

  // Top 10 teams for Hackemon CTF scoreboard
  const topTeams = [
    { position: 1, team: "Entr0py", members: ["Kazim Raza", "Hassan Raza", "Mehdi Badami"], points: 1020 },
    { position: 2, team: "Donions", members: ["Ammar Haq", "Muhammad Razzan", "Ibrahim Khan"], points: 910 },
    { position: 3, team: "Cyber Surfers", members: ["Sana", "Hooria Kashif", "Hiba Fatima"], points: 520 },
    { position: 4, team: "Depression", members: ["Eizza Sakina", "Amna Moqeet", "Ramsha Fatima"], points: 420 },
    { position: 5, team: "p4wxiÏ€", members: ["Muhammad Ali Khan", "Syed Uzaif Hussain", "Muhammad Anus"], points: 370 },
    { position: 6, team: "2G3ndersOnly", members: ["Fizza Ahmed", "Faizan nasir"], points: 370 },
    { position: 7, team: "Digital Dynamos", members: ["Talia Siddiqui", "Rukhsana", "Umer kz"], points: 360 },
    { position: 8, team: "RootRebels", members: ["Hassaan Mazhar", "Muhammad Razi Uddin Hashmi", "Abdur Rehman Azhar"], points: 300 },
    { position: 9, team: "Hackertistic", members: ["Nikhat Fatima", "Quratulain Mughal", "Kaniz Sukayna"], points: 270 },
    { position: 10, team: "Halal Hactivists", members: ["Saiba imran", "Abdul Wahab Soomro", "Sadia Shabbir"], points: 220 }
  ];

  // Event glimpses
  const eventGlimpses = [
    {
      id: 1,
      image: "/event_glimpses_2.jpeg",
      title: "Hacknowledge Seminars"
    },
    {
      id: 2,
      image: "/event_glimpses_3.jpeg",
      title: "Hackemon CTF"
    },
    {
      id: 3,
      image: "/event_glimpses_1.jpeg",
      title: "Shot of the Day"
    }
  ];

  return (
    <section className="py-16 border-b border-white/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-heading-md mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Psyber <span className="text-cyber-neon">Arena'25</span>
          </motion.h2>
          <motion.p 
            className="max-w-3xl mx-auto text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Meet the brilliant minds behind Psyber Arena and celebrate the champions of Hackemon CTF
          </motion.p>
        </div>

        {/* Core Team Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/5 border-cyber-neon/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-cyber-neon" size={28} />
                <h3 className="text-2xl font-bold text-cyber-neon">Core Team</h3>
              </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {coreTeam.map((member) => (
                  <motion.div 
                    key={member.id}
                    className="text-center group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 mx-auto border-2 border-cyber-neon/30 group-hover:border-cyber-neon transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyber-neon/30">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-cyber-neon/20 text-cyber-neon text-lg">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 rounded-full border border-cyber-neon/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                    </div>
                    <h4 className="font-semibold text-white text-lg mb-1">{member.name}</h4>
                    <p className="text-cyber-neon text-sm">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Event Glimpses and Winners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Glimpses */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/5 border-cyber-neon/30 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-cyber-neon mb-6">Event Glimpses</h3>
                <div className="space-y-4">
                  {eventGlimpses.map((glimpse, index) => (
                    <motion.div 
                      key={glimpse.id}
                      className="relative overflow-hidden rounded-lg group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video">
                        <img 
                          src={glimpse.image} 
                          alt={glimpse.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                        <div className="p-4">
                          <p className="text-white font-medium">
                            {glimpse.title}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-cyber-neon/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hackemon CTF Scoreboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/5 border-cyber-neon/30 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="text-cyber-neon" size={28} />
                  <h3 className="text-xl font-bold text-cyber-neon">Hackemon CTF Scoreboard</h3>
                </div>
                <div className="space-y-3 p-3 max-h-[64rem] overflow-y-auto">
                  {topTeams.map((team) => (
                    <motion.div 
                      key={team.position}
                      className={`p-4 rounded-lg border transition-all duration-300 hover:bg-white/10 ${
                        team.position <= 3 
                          ? 'bg-gradient-to-r from-cyber-neon/10 to-transparent border-cyber-neon/50' 
                          : 'bg-white/5 border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                              team.position === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                              team.position === 2 ? 'bg-gray-500/20 text-gray-300' :
                              team.position === 3 ? 'bg-amber-600/20 text-amber-400' :
                              'bg-cyber-neon/20 text-cyber-neon'
                            }`}>
                              {team.position}
                            </div>
                            <h4 className="font-bold text-white text-lg">{team.team}</h4>
                          </div>
                          <p className="text-white/70 text-sm mb-2">
                            {team.members.join(" • ")}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-cyber-neon font-medium text-lg">
                              {team.points} pts
                            </span>
                            {team.position <= 3 && (
                              <div className="flex items-center gap-1">
                                {team.position === 1 && <Trophy className="text-yellow-400" size={16} />}
                                {team.position === 2 && <Award className="text-gray-300" size={16} />}
                                {team.position === 3 && <Star className="text-amber-400" size={16} />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;