
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
import { supabase } from "@/integrations/supabase/client";
import { sendSeminarEmail } from '@/utils/seminarEmailSend';
import { motion } from 'framer-motion';

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
      // Insert data into Supabase
      const { data: registrationData, error } = await supabase
        .from('event_registrations')
        .insert({
          event_type: eventType,
          name: data.name,
          father_name: data.fatherName,
          email: data.email,
          phone: data.phone,
          roll_no: data.rollNo,
          department: data.department,
          university: data.university,
        })
        .select();

      if (error) throw error;

      await sendSeminarEmail({
        teamName: data.rollNo,
        leaderName: data.name,
        leaderEmail: data.email,
        eventName: "Cyber Seminars",
      });
      
      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted successfully.",
      });
      
      form.reset();

    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "There was a problem submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="scroll-fx bg-cyber-dark/60 border border-white/10 p-6 md:p-8 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div 
            className="bg-cyber-dark/80 border border-cyber-neon/30 p-4 rounded-md mb-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-cyber-neon font-semibold text-lg mb-2">2 Days hands on workshops on Offensive and Defensive Security</h3>
            {/* <p className="text-white/70 text-sm mb-4">
              Please make the payment to the following accounts before submitting your registration.
            </p> */}
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex flex-col">
                <span className="font-semibold">Monday, 26 May, 2025</span>
                <span>Blue Team: The guardians of the digital frontier.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Tuesday, 27 May, 2025</span>
                <span>Red Team: Because complacency is not an option.</span>
              </div>
              {/* <div className="flex flex-col">
                <span className="font-semibold">Bank Account:</span>
                <span>Account #: 3714 496353 98431</span>
                <span>Card Name: American Express</span>
                <span>Company: Corning Incorporated Asia</span>
              </div> */}
            </div>
          </motion.div>
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
            {isSubmitting ? "Submitting..." : "Register Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;