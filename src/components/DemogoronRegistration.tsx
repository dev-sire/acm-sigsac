
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FileUpload from './FileUpload';
import { supabase } from "@/integrations/supabase/client";
import { sendRegistrationEmail } from '@/utils/emailService';

const formSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters."),
  // Leader information
  leaderName: z.string().min(2, "Name must be at least 2 characters."),
  leaderContact: z.string().min(10, "Please enter a valid phone number."),
  leaderCnic: z.string().min(13, "Please enter a valid CNIC number."),
  leaderEmail: z.string().email("Please enter a valid email address."),
  leaderDepartment: z.string().min(1, "Department is required."),
  leaderUniversity: z.string().min(1, "University is required."),
  // Member information
  memberName: z.string().optional(),
  memberContact: z.string().optional(),
  memberCnic: z.string().optional(),
  memberEmail: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  memberUniversity: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CompetitionRegistrationFormProps {
  eventType: string;
}

const DemogoronRegistrationForm = ({ eventType }: CompetitionRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      leaderContact: "",
      leaderCnic: "",
      leaderEmail: "",
      leaderDepartment: "",
      leaderUniversity: "",
      memberName: "",
      memberContact: "",
      memberCnic: "",
      memberEmail: "",
      memberUniversity: "",
    },
  });

  const handleUploadComplete = (url: string) => {
    setPaymentScreenshotUrl(url);
    toast({
      title: "Payment screenshot uploaded",
      description: "Your payment screenshot has been uploaded successfully.",
    });
  };

  const onSubmit = async (data: FormValues) => {
    if (!paymentScreenshotUrl) {
      toast({
        title: "Payment screenshot required",
        description: "Please upload a screenshot of your payment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Insert data into Supabase
      const { data: registrationData, error } = await supabase
        .from('demogoron_debuggers')
        .insert({
          event_type: eventType,
          team_name: data.teamName,
          leader_name: data.leaderName,
          leader_contact: data.leaderContact,
          leader_cnic: data.leaderCnic,
          leader_email: data.leaderEmail,
          leader_department: data.leaderDepartment,
          leader_university: data.leaderUniversity,
          member_name: data.memberName || null,
          member_contact: data.memberContact || null,
          member_cnic: data.memberCnic || null,
          member_email: data.memberEmail || null,
          member_university: data.memberUniversity || null,
          payment_screenshot_url: paymentScreenshotUrl,
        })
        .select();

      if (error) throw error;

      await sendRegistrationEmail({
        teamName: data.teamName,
        leaderName: data.leaderName,
        leaderEmail: data.leaderEmail,
        eventName: "Demogoron Debuggers",
      });
      
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered successfully.",
      });
      
      form.reset();
      setPaymentScreenshotUrl(null);

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
          <div className="bg-cyber-dark/80 border border-cyber-neon/30 p-4 rounded-md mb-6">
            <h3 className="text-cyber-neon font-semibold text-lg mb-2">Registration Fee: 1000 PKR per team</h3>
            <p className="text-white/70 text-sm mb-4">
              Please make the payment to any of the following accounts before submitting your registration.
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex flex-col">
                <span className="font-semibold">EasyPaisa:</span>
                <span>03212053324 (Account Holder: ABDUL WASI KHAN )</span>
              </div>
              {/* <div className="flex flex-col">
                <span className="font-semibold">Bank Account:</span>
                <span>Account #: 3714 496353 98431</span>
                <span>Card Name: American Express</span>
                <span>Company: Corning Incorporated Asia</span>
              </div> */}
            </div>
          </div>
          
          {/* Team Name */}
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Team Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your team name" 
                    className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border border-white/10 p-4 rounded-md">
            <h3 className="text-white font-medium mb-4">Team Leader Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Leader Name */}
              <FormField
                control={form.control}
                name="leaderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Leader Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter leader's full name" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Leader Contact */}
              <FormField
                control={form.control}
                name="leaderContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Contact Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter leader's contact number" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Leader CNIC */}
              <FormField
                control={form.control}
                name="leaderCnic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">CNIC Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter leader's CNIC number" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Leader Email */}
              <FormField
                control={form.control}
                name="leaderEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter leader's email address" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Leader Department */}
              <FormField
                control={form.control}
                name="leaderDepartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Department</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter leader's department" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Leader University */}
              <FormField
                control={form.control}
                name="leaderUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">University</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter leader's university" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="border border-white/10 p-4 rounded-md">
            <h3 className="text-white font-medium mb-4">Team Member Information (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Member Name */}
              <FormField
                control={form.control}
                name="memberName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Member Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's full name" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Member Contact */}
              <FormField
                control={form.control}
                name="memberContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Contact Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's contact number" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Member CNIC */}
              <FormField
                control={form.control}
                name="memberCnic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">CNIC Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's CNIC number" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Member Email */}
              <FormField
                control={form.control}
                name="memberEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter member's email address" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Member University */}
            <div className="mt-4">
              <FormField
                control={form.control}
                name="memberUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">University</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's university" 
                        className="bg-cyber-dark/80 text-white border-white/20 focus-visible:ring-cyber-neon" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Payment Screenshot Upload */}
          <div className="border border-white/10 p-4 rounded-md">
            <h3 className="text-white font-medium mb-4">Payment Verification</h3>
            <FormItem>
              <FormLabel className="text-white">Upload Payment Screenshot</FormLabel>
              <FormDescription className="text-white/60">
                Please upload a screenshot of your payment receipt/transaction.
              </FormDescription>
              <div className="mt-2">
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  bucketName="payment_screenshots"
                  fileNamePrefix={`${form.getValues().teamName || 'team'}_${eventType}`}
                  acceptedFileTypes="image/*"
                />
              </div>
              {paymentScreenshotUrl && (
                <div className="mt-2">
                  <p className="text-xs text-cyber-neon">✓ Screenshot uploaded successfully</p>
                </div>
              )}
            </FormItem>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-cyber-neon hover:bg-cyber-neon/80 text-cyber-dark"
            disabled={isSubmitting || !paymentScreenshotUrl}
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DemogoronRegistrationForm;
