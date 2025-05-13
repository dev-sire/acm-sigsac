
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { copyInviteLink, generateInviteLink } from '@/utils/inviteUtils';

const InviteLinkGenerator = () => {
  const [name, setName] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    if (!name || !event) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and event name",
        variant: "destructive",
      });
      return;
    }
    
    const link = generateInviteLink(name, event, date);
    setGeneratedLink(link);
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    
    try {
      await copyInviteLink(generatedLink);
      toast({
        title: "Link Copied!",
        description: "Invite link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-cyber-dark/60 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-cyber-neon">Create Personal Invite Link</CardTitle>
        <CardDescription className="text-white/70">
          Generate personalized invitation links to share with potential attendees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visitor-name" className="text-white">Visitor Name</Label>
            <Input 
              id="visitor-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe" 
              className="bg-cyber-dark/80 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-name" className="text-white">Event Name</Label>
            <Input 
              id="event-name" 
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              placeholder="e.g. Cyber Security Conference" 
              className="bg-cyber-dark/80 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-date" className="text-white">Event Date (Optional)</Label>
            <Input 
              id="event-date" 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-cyber-dark/80 border-white/20 text-white"
            />
          </div>
          
          <Button 
            onClick={handleGenerateLink}
            className="w-full bg-cyber-neon text-cyber-dark hover:bg-cyber-neon/80"
          >
            Generate Invite Link
          </Button>
          
          {generatedLink && (
            <div className="pt-4 space-y-3">
              <Label className="text-white">Generated Link:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  readOnly 
                  value={generatedLink}
                  className="bg-cyber-dark/90 border-cyber-neon/30 text-white overflow-x-auto"
                />
                <Button onClick={handleCopyLink} className="shrink-0">
                  Copy
                </Button>
              </div>
              
              <div className="pt-2 text-center">
                <a 
                  href={generatedLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyber-neon hover:underline"
                >
                  Preview Invite
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteLinkGenerator;