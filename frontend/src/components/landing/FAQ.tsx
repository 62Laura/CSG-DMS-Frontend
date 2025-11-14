import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the CSG platform work?",
    answer: "Our platform provides digital tools for managing community savings groups, including member management, contribution tracking, loan management, and financial reporting. Everything is accessible through a secure online dashboard."
  },
  {
    question: "Is my financial data secure?",
    answer: "Yes, we use bank-level encryption and security protocols to protect all your data. Your financial information is stored securely and is only accessible to authorized group members."
  },
  {
    question: "How much does it cost to use the platform?",
    answer: "We offer different pricing plans to suit groups of all sizes. Basic features are free, while premium features are available through affordable monthly or annual subscriptions."
  },
  {
    question: "How do I get started with my group?",
    answer: "Simply sign up for an account, create your group, and invite members. Our setup wizard will guide you through the process step by step."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border py-4">
      <button
        className="flex justify-between items-center w-full text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
