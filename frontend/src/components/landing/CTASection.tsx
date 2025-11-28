import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Savings Group?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of community savings groups that trust our platform to manage their finances 
            with transparency and ease.
          </p>

        </motion.div>
      </div>
    </section>
  );
};
