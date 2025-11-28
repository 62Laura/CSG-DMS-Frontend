import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Mail, Phone, MapPin, Building, Camera } from "lucide-react";

const SuperadminProfile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [telephone, setTelephone] = useState(user?.telephone || "");
  const [district, setDistrict] = useState(user?.district || "");
  const [sector, setSector] = useState(user?.sector || "");
  const [bio, setBio] = useState((user as any)?.bio || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call to backend
      // const response = await updateProfile({
      //   fullName,
      //   telephone,
      //   district,
      //   sector,
      //   bio
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message (placeholder for toast notification)
      console.log("Profile updated successfully");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload functionality
    // This is a placeholder for file upload integration
    console.log("Image upload clicked - implement file upload here");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Profile Settings</h2>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-card rounded-xl p-6 border shadow-soft">
        <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              {(user as any)?.profilePicture ? (
                <img
                  src={(user as any).profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-primary" />
              )}
            </div>
            <button
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Upload a new profile picture. Recommended size: 400x400px
            </p>
            <Button variant="outline" size="sm" onClick={handleImageUpload}>
              Change Picture
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card rounded-xl p-6 border shadow-soft">
        <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Telephone
              </Label>
              <Input
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                District
              </Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter your district"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector" className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Sector
              </Label>
              <Input
                id="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Enter your sector"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="w-full min-h-[100px] px-3 py-2 text-sm border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFullName(user?.fullName || "");
                setTelephone(user?.telephone || "");
                setDistrict(user?.district || "");
                setSector(user?.sector || "");
                setBio((user as any)?.bio || "");
              }}
            >
              Reset Changes
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Account Information (Read-only) */}
      <div className="bg-card rounded-xl p-6 border shadow-soft">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Role</Label>
            <p className="text-sm font-medium">Super Administrator</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Account Status</Label>
            <p className="text-sm font-medium text-green-600">Active</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
            <p className="text-sm font-medium">
              {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Last Login</Label>
            <p className="text-sm font-medium">
              {(user as any)?.lastLogin ? new Date((user as any).lastLogin).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminProfile;
