import { motion } from "framer-motion";
import { Users, Shield, Clock, TrendingUp, BarChart2, Lock, FileText, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Variants} from "framer-motion"
const features = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Member Management",
    description: "Easily onboard members, track contributions, and manage group activities in one place.",
    color: "from-blue-500 to-blue-400"
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-primary" />,
    title: "Real-time Analytics",
    description: "Gain insights with beautiful dashboards showing your group's financial health.",
    color: "from-purple-500 to-purple-400"
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Bank-level Security",
    description: "Your data is encrypted and protected with enterprise-grade security measures.",
    color: "from-emerald-500 to-emerald-400"
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Automated Reporting",
    description: "Generate and share detailed reports with just a few clicks.",
    color: "from-amber-500 to-amber-400"
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Role-based Access",
    description: "Control what each member can see and do with granular permissions.",
    color: "from-rose-500 to-rose-400"
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Quick Setup",
    description: "Get started in minutes with our intuitive interface and guided onboarding.",
    color: "from-indigo-500 to-indigo-400"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Save Time",
    description: "Automate repetitive tasks and focus on growing your community.",
    color: "from-cyan-500 to-cyan-400"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Growth Tools",
    description: "Access resources and tools to help your savings group thrive.",
    color: "from-fuchsia-500 to-fuchsia-400"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Features
          </span>
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground">
            Our platform is packed with powerful features designed to make managing your community savings group easier than ever.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover="hover"
              className="h-full"
            >
              <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 overflow-hidden group">
                <div className={cn(
                  "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
                  feature.color
                )} />
                <CardHeader className="pt-6 pb-4">
                  <div className={cn(
                    "p-2.5 rounded-lg w-fit mb-4 bg-gradient-to-br",
                    feature.color,
                    "text-white"
                  )}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-6">And many more features to help your group thrive</p>
          <Button size="lg" className="px-8">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
