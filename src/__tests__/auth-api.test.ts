import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { POST as handleOTP } from "@/app/api/auth/otp/route";
import { POST as handleVerify } from "@/app/api/auth/verify/route";
import { NextRequest } from "next/server";

// Mock Supabase client function
const mockSignInWithOtp = vi.fn();
const mockVerifyOtp = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(() => Promise.resolve({
    auth: {
      signInWithOtp: mockSignInWithOtp,
      verifyOtp: mockVerifyOtp,
    },
  })),
}));

// Mock process.env
const originalEnv = process.env;

describe("Auth API Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("POST /api/auth/otp", () => {
    it("should return 400 if email is missing", async () => {
      const request = new NextRequest("http://localhost/api/auth/otp", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await handleOTP(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe("Email is required");
    });

    it("should return 403 if email is not in the allowed list", async () => {
      process.env.ALLOWED_EMAILS = "allowed@example.com,owner@example.com";
      
      const request = new NextRequest("http://localhost/api/auth/otp", {
        method: "POST",
        body: JSON.stringify({ email: "stranger@example.com" }),
      });

      const response = await handleOTP(request);
      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data.error).toBe("Access Denied: Email not authorized");
    });

    it("should call signInWithOtp and return 200 on success", async () => {
      process.env.ALLOWED_EMAILS = "allowed@example.com";
      mockSignInWithOtp.mockResolvedValueOnce({ error: null });

      const request = new NextRequest("http://localhost/api/auth/otp", {
        method: "POST",
        body: JSON.stringify({ email: "allowed@example.com" }),
      });

      const response = await handleOTP(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(mockSignInWithOtp).toHaveBeenCalledWith({
        email: "allowed@example.com",
        options: {
          shouldCreateUser: true,
        },
      });
    });

    it("should return 400 if signInWithOtp fails", async () => {
      mockSignInWithOtp.mockResolvedValueOnce({
        error: { message: "Invalid email address" },
      });

      const request = new NextRequest("http://localhost/api/auth/otp", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const response = await handleOTP(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe("Invalid email address");
    });
  });

  describe("POST /api/auth/verify", () => {
    it("should return 400 if email or token is missing", async () => {
      const request = new NextRequest("http://localhost/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const response = await handleVerify(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe("Email and OTP code are required");
    });

    it("should call verifyOtp and return 200 on success", async () => {
      mockVerifyOtp.mockResolvedValueOnce({ error: null });

      const request = new NextRequest("http://localhost/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", token: "123456" }),
      });

      const response = await handleVerify(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(mockVerifyOtp).toHaveBeenCalledWith({
        email: "test@example.com",
        token: "123456",
        type: "email",
      });
    });

    it("should return 400 if verifyOtp fails", async () => {
      mockVerifyOtp.mockResolvedValueOnce({
        error: { message: "Invalid token" },
      });

      const request = new NextRequest("http://localhost/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", token: "wrong" }),
      });

      const response = await handleVerify(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe("Invalid token");
    });
  });
});
