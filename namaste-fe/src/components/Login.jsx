import React, { useState } from "react";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Link } from "react-router-dom";
import {validatePassword, validatePhone} from '../utils/Helper.jsx'

function LoginPage() {
  const [formData, setFormData] = useState({ phoneno: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validatePhone(formData.phoneno)) newErrors.phoneno = "Invalid phone number";
    if (!validatePassword(formData.password)) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Login:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input name="phoneno" placeholder="Phone Number" value={formData.phoneno} onChange={handleChange} />
              {errors.phoneno && <p className="text-sm text-red-500">{errors.phoneno}</p>}
            </div>
            <div>
              <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-sm">Don't have an account? <Link to="/signup" className="text-indigo-600">Sign Up</Link></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default LoginPage;