
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Heart, Moon } from 'lucide-react';
import { copyGreetingLink, generateGreetingLink } from '@/utils/greetUtils';

const GreetingLinkGenerator = () => {
  const [name, setName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for the greeting",
        variant: "destructive",
      });
      return;
    }
    
    const link = generateGreetingLink(name);
    setGeneratedLink(link);
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;
    
    try {
      await copyGreetingLink(generatedLink);
      toast({
        title: "Link Copied!",
        description: "Eid greeting link has been copied to clipboard",
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
    <Card className="bg-gradient-to-br from-yellow-400/10 to-orange-400/10 border-yellow-400/30 text-white backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Moon size={24} />
          Create Eid Greeting Link
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate personalized Eid ul Adha greeting links to share with friends and family
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="greeting-name" className="text-white">Person's Name</Label>
            <Input 
              id="greeting-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmed, Fatima, Muhammad" 
              className="bg-white/10 border-yellow-400/30 text-white placeholder:text-white/50"
            />
          </div>
          
          <Button 
            onClick={handleGenerateLink}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-cyber-dark hover:from-yellow-500 hover:to-orange-500 font-semibold"
          >
            <Heart className="mr-2" size={16} />
            Generate Eid Greeting Link
          </Button>
          
          {generatedLink && (
            <div className="pt-4 space-y-3">
              <Label className="text-white">Generated Greeting Link:</Label>
              <div className="flex items-center gap-2">
                <Input 
                  readOnly 
                  value={generatedLink}
                  className="bg-white/10 border-yellow-400/30 text-white overflow-x-auto"
                />
                <Button 
                  onClick={handleCopyLink} 
                  className="shrink-0 bg-yellow-400 text-cyber-dark hover:bg-yellow-500"
                >
                  Copy
                </Button>
              </div>
              
              <div className="pt-2 text-center">
                <a 
                  href={generatedLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  Preview Eid Greeting
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GreetingLinkGenerator;