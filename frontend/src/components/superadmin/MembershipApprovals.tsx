import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Toast } from "../ui/toast";

interface MembershipRequest {
  id: string;
  fullName: string;
  email: string;
  status: "pending" | "approved" | "declined";
}

const MembershipApprovals = () => {
  const [requests, setRequests] = useState<MembershipRequest[]>([]);

  useEffect(() => {
    // Simulate fetching membership requests from API
    setTimeout(() => {
      setRequests([
        { id: "1", fullName: "Alice Johnson", email: "alice@example.com", status: "pending" },
        { id: "2", fullName: "Bob Smith", email: "bob@example.com", status: "pending" },
      ]);
    }, 500);
  }, []);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );
    Toast({
      title: "Membership Approved",
    });
  };

  const handleDecline = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "declined" } : req))
    );
    Toast({
      title: "Membership Declined",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Membership Approvals</h2>
      {requests.length === 0 ? (
        <p>No membership requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 border rounded-md bg-card"
            >
              <div>
                <p className="font-semibold">{req.fullName}</p>
                <p className="text-sm text-muted-foreground">{req.email}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      req.status === "approved"
                        ? "text-green-600"
                        : req.status === "declined"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {req.status}
                  </span>
                </p>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  disabled={req.status !== "pending"}
                  onClick={() => handleApprove(req.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  disabled={req.status !== "pending"}
                  onClick={() => handleDecline(req.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembershipApprovals;
