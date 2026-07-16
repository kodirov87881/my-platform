import { vi, describe, it, expect, beforeEach } from "vitest";
import { updateSession } from "@/lib/supabase/middleware";
import { NextRequest } from "next/server";

// Mock @supabase/ssr
const mockGetUser = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

describe("Middleware Session Redirects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should redirect to /login if user is not authenticated and requests /dashboard", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const request = new NextRequest("http://localhost/dashboard");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(307); // NextResponse.redirect default status is 307
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });

  it("should allow request to /dashboard if user is authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-123", email: "user@example.com" } },
    });

    const request = new NextRequest("http://localhost/dashboard");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("should redirect to /dashboard if user is authenticated and requests /login", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-123", email: "user@example.com" } },
    });

    const request = new NextRequest("http://localhost/login");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/dashboard");
  });

  it("should redirect to /dashboard if user is authenticated and requests /verify", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-123", email: "user@example.com" } },
    });

    const request = new NextRequest("http://localhost/verify");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/dashboard");
  });

  it("should allow request to /login if user is not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const request = new NextRequest("http://localhost/login");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("should allow request to any other public route (e.g., /portfolio) regardless of auth status", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null } });

    const request = new NextRequest("http://localhost/portfolio");
    const response = await updateSession(request);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
