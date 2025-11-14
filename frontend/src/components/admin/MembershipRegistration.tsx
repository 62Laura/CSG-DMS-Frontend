import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Loader2, CheckCircle, AlertCircle, UserPlus } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  telephone: z.string().regex(/^07\d{8}$/, { message: "Please enter a valid phone number (07xxxxxxxx)" }),
  district: z.string().min(1, { message: "Please select a district" }),
  sector: z.string().min(1, { message: "Please select a sector" }),
});

type FormData = z.infer<typeof formSchema>;

const MembershipRegistration = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sectors, setSectors] = useState<string[]>([]);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      telephone: "",
      district: "",
      sector: "",
    },
  });

  const selectedDistrict = watch("district");

  // Filter sectors based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      // In a real app, you might fetch sectors based on the selected district
      // This is a simplified example
      setSectors(["Sector 1", "Sector 2", "Sector 3"]);
      setValue("sector", ""); // Reset sector when district changes
    }
  }, [selectedDistrict, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Member registered:", data);
      
      // Show success state
      setIsSuccess(true);
      toast.success("Member registered successfully!");
      
      // Reset form after delay
      setTimeout(() => {
        reset();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to register member:", error);
      toast.error("Failed to register member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const districts = [
    "Kigali",
    "Gasabo",
    "Nyarugenge",
    "Kicukiro",
    "Rubavu",
    "Musanze",
    "Huye",
    "Nyagatare",
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
              <p className="text-gray-600">Member has been registered successfully.</p>
            </div>
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              Add Another Member
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Add New Member</CardTitle>
                    <CardDescription className="text-blue-100">
                      Fill in the details below to register a new member
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className={errors.fullName ? "border-red-300" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={errors.email ? "border-red-300" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Phone Number <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">+250</span>
                        </div>
                        <Input
                          id="telephone"
                          type="tel"
                          placeholder="7XXXXXXXX"
                          className={`pl-16 ${errors.telephone ? "border-red-300" : ""}`}
                          {...register("telephone")}
                        />
                      </div>
                      {errors.telephone && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.telephone.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district">District <span className="text-red-500">*</span></Label>
                      <Select
                        onValueChange={(value) => setValue("district", value, { shouldValidate: true })}
                        value={watch("district")}
                      >
                        <SelectTrigger className={errors.district ? "border-red-300" : ""}>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.district && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector <span className="text-red-500">*</span></Label>
                      <Select
                        onValueChange={(value) => setValue("sector", value, { shouldValidate: true })}
                        value={watch("sector")}
                        disabled={!selectedDistrict}
                      >
                        <SelectTrigger className={errors.sector ? "border-red-300" : ""}>
                          <SelectValue placeholder={selectedDistrict ? "Select sector" : "Select district first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {sectors.map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.sector && (
                        <p className="text-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.sector.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        reset();
                        toast.info("Form cleared");
                      }}
                      disabled={isSubmitting}
                    >
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isDirty || !isValid}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Register Member"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MembershipRegistration;
