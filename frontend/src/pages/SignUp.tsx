import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import { signupSchema, SignupFormData } from "@/lib/validation";
import { useAuth } from "@/contexts/AuthContext";

const DISTRICTS = [
  "Kigali",
  "Gasabo",
  "Nyarugenge",
  "Kicukiro",
  "Rubavu",
  "Musanze",
  "Huye",
  "Nyagatare",
];
const SECTORS = {
  Kigali: ["Nyarugenge", "Kacyiru", "Kimihurura", "Remera"],
  Gasabo: ["Gisozi", "Jali", "Kinyinya", "Ndera"],
  Nyarugenge: ["Muhima", "Nyakabanda", "Rwezamenyo"],
  Kicukiro: ["Gatenga", "Kicukiro", "Niboye"],
  Rubavu: ["Gisenyi", "Rubavu", "Nyamyumba"],
  Musanze: ["Muhoza", "Nyange", "Shingiro"],
  Huye: ["Ngoma", "Tumba", "Mukura"],
  Nyagatare: ["Nyagatare", "Rwimiyaga", "Tabagwe"],
};

export default function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange", // 👈 important: validate on change so isValid updates
  });

  // Pre-fill telephone if in query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const phone = searchParams.get("phone");
    if (phone) {
      setValue("telephone", decodeURIComponent(phone));
    }
  }, [location.search, setValue]);

  const availableSectors = watch("district")
    ? SECTORS[watch("district") as keyof typeof SECTORS] || []
    : [];

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      if (!signup) {
        throw new Error("Signup function not available in AuthContext");
      }
      await signup({
        fullName: data.fullName,
        email: data.email,
        telephone: data.telephone,
        district: data.district,
        sector: data.sector,
        password: data.password,
      });
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      alert(error.message || "Signup failed");
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-200 px-4 py-8"
    >
      <div className="w-full max-w-md">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-blue-600">
                Request Membership
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Join Community Savings Groups
              </p>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  type="text"
                  placeholder="Enter your full name"
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </motion.div>

              {/* Telephone */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label htmlFor="telephone">Phone Number</Label>
                <Input
                  id="telephone"
                  {...register("telephone")}
                  type="tel"
                  placeholder="07XXXXXXXX"
                  aria-invalid={errors.telephone ? "true" : "false"}
                />
                {errors.telephone && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.telephone.message}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="your.email@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                  placeholder="Create a strong password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm your password"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </motion.div>

              {/* District */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <Label htmlFor="district">District</Label>
                <Select
                  value={watch("district") || ""}
                  onValueChange={(value) => setValue("district", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && (
                  <p role="alert" className="text-red-600 text-sm mt-1">
                    {errors.district.message}
                  </p>
                )}
              </motion.div>

              {/* Sector */}
              {watch("district") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={watch("sector") || ""}
                    onValueChange={(value) => setValue("sector", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sector && (
                    <p role="alert" className="text-red-600 text-sm mt-1">
                      {errors.sector.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex gap-2"
              >
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={mutation.isPending || !isValid} // 👈 disable until form valid
                >
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  disabled={mutation.isPending}
                >
                  Go Back
                </Button>
              </motion.div>
            </form>

            {/* Error message */}
            {mutation.isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
              >
                <p className="text-red-600 text-sm">
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Signup failed"}
                </p>
              </motion.div>
            )}

            {/* Footer text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center text-gray-600 text-sm mt-6"
            >
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log in
              </a>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-xs text-center text-gray-500 mt-4"
            >
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </motion.p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
