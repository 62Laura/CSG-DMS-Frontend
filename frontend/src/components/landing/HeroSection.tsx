import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/csg-hero.jpg";
import { motion , Variants} from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants= {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      ease: "easeOut"
    }
  },
};

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-12 md:pt-16">
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div variants={item} className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Empowering Communities
              </span>
            </motion.div>
            
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Modern Tools for <span className="text-gradient">Community Savings</span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transform your savings group with our digital platform. Streamline operations, 
              enhance transparency, and grow your community's financial health.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                onClick={onGetStarted}
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
            </motion.div>
            <motion.div 
              variants={item}
              className="mt-8 flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-primary/80 flex items-center justify-center text-white font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <span>Trusted by <span className="font-semibold text-foreground">1000+</span> communities</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <img
                src={heroImage}
                alt="Community Savings Group Dashboard"
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/10 blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-secondary/10 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
  </section>)