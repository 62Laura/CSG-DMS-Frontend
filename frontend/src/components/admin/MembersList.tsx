import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  groupId: string;
}

const MembersList = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user || !(user as any).groupId) {
      setMembers([]);
      return;
    }
    // TODO: Replace with actual API call to fetch members of the user's group
    // Simulated data for demonstration
    const fetchedMembers: Member[] = [
      { id: "1", firstName: "John", lastName: "Doe", email: "john@example.com", phone: "1234567890", groupId: "group1" },
      { id: "2", firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "0987654321", groupId: "group1" },
      { id: "3", firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phone: "5555555555", groupId: "group2" },
    ];
    // Filter members by user's groupId
    const groupMembers = fetchedMembers.filter(m => m.groupId === (user as any).groupId);
    setMembers(groupMembers);
  }, [user]);

  const filteredMembers = members.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
    );
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Group Members</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search members by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-border">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="border border-border px-4 py-2 text-left">Name</th>
                  <th className="border border-border px-4 py-2 text-left">Email</th>
                  <th className="border border-border px-4 py-2 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-muted-foreground">
                      No members found.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map(member => (
                    <tr key={member.id} className="hover:bg-muted cursor-pointer">
                      <td className="border border-border px-4 py-2">{member.firstName} {member.lastName}</td>
                      <td className="border border-border px-4 py-2">{member.email}</td>
                      <td className="border border-border px-4 py-2">{member.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersList;
