// Member Dashboard
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { 
  BarChart, 
  Users, 
  Settings, 
  Shield, 
  PieChart,
  TrendingUp,
  Calendar,
  FileText,
  Bell,
  User,
  Home,
  LogOut
} from "lucide-react";

const MemberDashboard = () => {
  const stats = [
    { label: "My Savings", value: "RWF 250,000", change: "+15%", icon: TrendingUp },
    { label: "My Loans", value: "RWF 50,000", change: "-20%", icon: PieChart },
    { label: "Next Meeting", value: "Aug 25", change: "In 3 days", icon: Calendar },
    { label: "My Contributions", value: "24", change: "100%", icon: FileText }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Welcome to </h1>
      <p className="text-muted-foreground">Here's your personal overview and group details</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-card rounded-xl p-6 shadow-soft border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div 
          className="bg-card p-6 rounded-xl shadow-soft border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">My Contribution History</h2>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <BarChart className="h-12 w-12 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Chart would appear here</span>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-6 rounded-xl shadow-soft border"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Group Announcements</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Next Meeting Agenda</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">New</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll be discussing the upcoming savings goals and loan disbursements.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Posted 2 days ago</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemberDashboard;
