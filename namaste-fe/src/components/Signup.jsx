import React, { useState } from "react";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Link } from "react-router-dom";
import {validatePassword, validatePhone} from '../utils/Helper.jsx'


function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    phoneno: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!validatePhone(formData.phoneno)) newErrors.phoneno = "Invalid phone number";
    if (!validatePassword(formData.password)) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Signup:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>
            <div>
              <Input name="phoneno" placeholder="Phone Number" value={formData.phoneno} onChange={handleChange} />
              {errors.phoneno && <p className="text-sm text-red-500">{errors.phoneno}</p>}
            </div>
            <div>
              <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div>
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
            <p className="text-sm">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage