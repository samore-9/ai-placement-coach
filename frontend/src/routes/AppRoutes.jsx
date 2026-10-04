import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleRoute } from '@/routes/RoleRoute';

import LandingPage from '@/pages/public/LandingPage';
import LoginPage from '@/pages/public/LoginPage';
import RegisterPage from '@/pages/public/RegisterPage';
import ForgotPasswordPage from '@/pages/public/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/public/ResetPasswordPage';
import VerifyEmailPage from '@/pages/public/VerifyEmailPage';

import DashboardHomePage from '@/pages/student/DashboardHomePage';
import ResumePage from '@/pages/student/ResumePage';
import ATSPage from '@/pages/student/ATSPage';
import SkillGapPage from '@/pages/student/SkillGapPage';
import RoadmapPage from '@/pages/student/RoadmapPage';
import CodingPage from '@/pages/student/CodingPage';
import InterviewPage from '@/pages/student/InterviewPage';
import MockInterviewPage from '@/pages/student/MockInterviewPage';
import JobsPage from '@/pages/student/JobsPage';
import ProgressPage from '@/pages/student/ProgressPage';
import ProfilePage from '@/pages/student/ProfilePage';

import AdminHomePage from '@/pages/admin/AdminHomePage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminJobsPage from '@/pages/admin/AdminJobsPage';
import AdminCompaniesPage from '@/pages/admin/AdminCompaniesPage';
import AdminCodingQuestionsPage from '@/pages/admin/AdminCodingQuestionsPage';
import AdminInterviewQuestionsPage from '@/pages/admin/AdminInterviewQuestionsPage';
import AdminAnnouncementsPage from '@/pages/admin/AdminAnnouncementsPage';

import NotFoundPage from '@/pages/errors/NotFoundPage';
import ForbiddenPage from '@/pages/errors/ForbiddenPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public marketing site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth flow */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Student dashboard - requires auth */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/resume" element={<ResumePage />} />
          <Route path="/dashboard/ats" element={<ATSPage />} />
          <Route path="/dashboard/skill-gap" element={<SkillGapPage />} />
          <Route path="/dashboard/roadmap" element={<RoadmapPage />} />
          <Route path="/dashboard/coding" element={<CodingPage />} />
          <Route path="/dashboard/interview" element={<InterviewPage />} />
          <Route path="/dashboard/mock-interview" element={<MockInterviewPage />} />
          <Route path="/dashboard/jobs" element={<JobsPage />} />
          <Route path="/dashboard/progress" element={<ProgressPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin - requires auth AND admin/superadmin role */}
        <Route element={<RoleRoute allowedRoles={['admin', 'superadmin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/jobs" element={<AdminJobsPage />} />
            <Route path="/admin/companies" element={<AdminCompaniesPage />} />
            <Route path="/admin/coding-questions" element={<AdminCodingQuestionsPage />} />
            <Route path="/admin/interview-questions" element={<AdminInterviewQuestionsPage />} />
            <Route path="/admin/announcements" element={<AdminAnnouncementsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Errors */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
