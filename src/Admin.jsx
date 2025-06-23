import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AdCareer from "./components/Admin/AdCareer.jsx";
import Portfolio from "./components/Admin/AdPortfolio.jsx";
import Service from "./components/Admin/AdService.jsx";
import Dashboard from "./components/Admin/AdDashboard.jsx";
import Application from "./components/Admin/Applications.jsx";
import AdInquiry from "./components/Admin/AdInquiry.jsx";
import CustomerForm from "./components/Admin/CustomerForm.jsx";
import AddTestimonial from "./components/Admin/AddTestimonial.jsx";
import AdDashboard from "./components/Admin/AdDashboard.jsx";
import AddTeamMember from "./components/Admin/AdAboutUs.jsx";
import Signup from "./components/Admin/signup.jsx";
import Profile from "./components/Admin/adProfile.jsx";
import TeamStories from "./components/Admin/TeamStories.jsx";
import PricingListForm from "./components/Admin/pricingList.jsx";
import AdminContactForm from "./components/Admin/AdminContactForm.jsx";

const Admin = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/addAdmin" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="pricing" element={<PricingListForm />} />
        <Route path="career" element={<AdCareer />} />
        <Route path="team" element={<AddTeamMember />} />
        <Route path="inquiry" element={<AdInquiry />} />
        <Route path="application" element={<Application />} />
        <Route path="customerform" element={<CustomerForm />} />
        <Route path="testimonials" element={<AddTestimonial />} />
        <Route path="services" element={<Service />} />
        <Route path="dashboard" element={<AdDashboard />} />
        <Route path="team" element={<AddTeamMember />} />
        <Route path="teamstories" element={<TeamStories />} />
        <Route path="contactinfo" element={<AdminContactForm />} />
      </Routes>
    </MainLayout>
  );
};

export default Admin;
