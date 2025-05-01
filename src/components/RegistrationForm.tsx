
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registrationService, RegistrationData } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  rollNo: z.string().min(1, "Roll number is required."),
  department: z.string().min(1, "Department is required."),
  university: z.string().min(1, "University is required."),
  teamMemberName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  eventType: string;
}

const RegistrationForm = ({ eventType }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      email: "",
      phone: "",
      rollNo: "",
      department: "",
      university: "",
      teamMemberName: "",
    },
  });

  const showTeamMember = eventType === 'hackemon-ctf' || eventType === 'demogoron-debuggers';

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Normalize event type for database table naming
      const normalizedEventType = eventType === 'general' ? 'general' : 
        eventType === 'hackemon-ctf' ? 'hackemon_ctf' : 
        eventType === 'demogoron-debuggers' ? 'demogoron_debuggers' : 'general';
      
      // Submit registration to Supabase
      await registrationService.submitRegistration(normalizedEventType, data as RegistrationData);
      
      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted successfully.",
      });
      
      form.reset();
      
      // Redirect to home after successful registration
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Show specific error messages
      if (error.message?.includes('limit reached')) {
        toast({
          title: "Registration Failed",
          description: "Registration limit for this event has been reached (100 participants maximum).",
          variant: "destructive",
        });
      } else if (error.message?.includes('already registered')) {
        toast({
          title: "Already Registered",
          description: "You have already registered for this event with this email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "There was a problem submitting your registration. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scroll-fx bg-cyber-dark/60 border border-white/10 p-6 md:p-8 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Father's Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your father's name" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="you@example.com" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="rollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Roll Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your university roll number" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Department</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your department" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">University</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your university" 
                    className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {showTeamMember && (
            <FormField
              control={form.control}
              name="teamMemberName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Team Member Name (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your team member's name if applicable" 
                      className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-white/50">
                    If you're registering as a team, provide your team member's name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-cyber-neon hover:bg-cyber-neon/80 text-cyber-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : "Register Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
