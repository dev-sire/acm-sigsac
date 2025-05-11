
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
import FileUpload from "./FileUpload";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
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
  
  // First member information (required)
  member1Name: z.string().min(2, "Name must be at least 2 characters."),
  member1Contact: z.string().min(10, "Please enter a valid phone number."),
  member1Cnic: z.string().min(13, "Please enter a valid CNIC number."),
  member1Email: z.string().email("Please enter a valid email address."),
  member1Department: z.string().min(1, "Department is required."),
  member1University: z.string().min(1, "University is required."),
  
  // Second member information (optional)
  member2Name: z.string().optional(),
  member2Contact: z.string().optional(),
  member2Cnic: z.string().optional(),
  member2Email: z.string().email("Please enter a valid email address.").optional().or(z.literal('')),
  member2Department: z.string().optional(),
  member2University: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const HackemonRegistrationForm = () => {
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
      member1Name: "",
      member1Contact: "",
      member1Cnic: "",
      member1Email: "",
      member1Department: "",
      member1University: "",
      member2Name: "",
      member2Contact: "",
      member2Cnic: "",
      member2Email: "",
      member2Department: "",
      member2University: "",
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
        .from('hackemon_registrations')
        .insert({
          team_name: data.teamName,
          leader_name: data.leaderName,
          leader_contact: data.leaderContact,
          leader_cnic: data.leaderCnic,
          leader_email: data.leaderEmail,
          leader_department: data.leaderDepartment,
          leader_university: data.leaderUniversity,
          member1_name: data.member1Name,
          member1_contact: data.member1Contact,
          member1_cnic: data.member1Cnic,
          member1_email: data.member1Email,
          member1_department: data.member1Department,
          member1_university: data.member1University,
          member2_name: data.member2Name || null,
          member2_contact: data.member2Contact || null,
          member2_cnic: data.member2Cnic || null,
          member2_email: data.member2Email || null,
          member2_department: data.member2Department || null,
          member2_university: data.member2University || null,
          payment_screenshot_url: paymentScreenshotUrl,
        })
        .select();

      if (error) throw error;

      await sendRegistrationEmail({
        teamName: data.teamName,
        leaderName: data.leaderName,
        leaderEmail: data.leaderEmail,
        eventName: "Hackemon CTF",
      });
      
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered successfully for Hackemon CTF.",
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

  // Animation variants
  const formGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
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
            <h3 className="text-cyber-neon font-semibold text-lg mb-2">Registration Fee: 1500 PKR per team</h3>
            <p className="text-white/70 text-sm mb-4">
              Please make the payment to any of the following accounts before submitting your registration.
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <div className="flex flex-col">
                <span className="font-semibold">EasyPaisa:</span>
                <span>0308-2275640 (Account Holder: AMAAN SHAHID)</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Bank Account:</span>
                <span>Account #: 3714 496353 98431</span>
                <span>Card Name: American Express</span>
                <span>Company: Corning Incorporated Asia</span>
              </div>
            </div>
          </motion.div>
          
          {/* Team Name */}
          <motion.div variants={formGroupVariants} initial="hidden" animate="visible">
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
          </motion.div>
          
          {/* Team Leader Section */}
          <motion.div 
            className="border border-white/10 p-4 rounded-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-cyber-neon font-medium mb-4">Team Leader Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
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
          </motion.div>
          
          {/* First Member Section (Required) */}
          <motion.div 
            className="border border-white/10 p-4 rounded-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-cyber-neon font-medium mb-4">First Team Member Information (Required)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="member1Name"
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
              
              <FormField
                control={form.control}
                name="member1Contact"
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
              <FormField
                control={form.control}
                name="member1Cnic"
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
              
              <FormField
                control={form.control}
                name="member1Email"
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
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <FormField
                control={form.control}
                name="member1Department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Department</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's department" 
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
                name="member1University"
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
          </motion.div>
          
          {/* Second Member Section (Optional) */}
          <motion.div 
            className="border border-white/10 p-4 rounded-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-cyber-neon font-medium mb-4">Second Team Member Information (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="member2Name"
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
              
              <FormField
                control={form.control}
                name="member2Contact"
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
              <FormField
                control={form.control}
                name="member2Cnic"
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
              
              <FormField
                control={form.control}
                name="member2Email"
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
            
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <FormField
                control={form.control}
                name="member2Department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Department</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter member's department" 
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
                name="member2University"
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
          </motion.div>
          
          {/* Payment Screenshot Upload */}
          <motion.div 
            className="border border-white/10 p-4 rounded-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-cyber-neon font-medium mb-4">Payment Verification</h3>
            <FormItem>
              <FormLabel className="text-white">Upload Payment Screenshot</FormLabel>
              <FormDescription className="text-white/60">
                Please upload a screenshot of your payment receipt/transaction. Maximum size: 500KB.
              </FormDescription>
              <div className="mt-2">
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  bucketName="payment_screenshots"
                  fileNamePrefix={`${form.getValues().teamName || 'team'}_hackemon`}
                  acceptedFileTypes="image/*"
                  maxSizeKB={500}
                />
              </div>
              {paymentScreenshotUrl && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs text-cyber-neon">✓ Screenshot uploaded successfully</p>
                </motion.div>
              )}
            </FormItem>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-cyber-neon hover:bg-cyber-neon/80 text-cyber-dark"
              disabled={isSubmitting || !paymentScreenshotUrl}
            >
              {isSubmitting ? "Submitting..." : "Register Now"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default HackemonRegistrationForm;