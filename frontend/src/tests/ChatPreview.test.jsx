import ChatPreview from "../components/single-components/chats/ChatPreview";
import ChatPage from "../components/pages/ChatPage";
import { render, screen, fireEvent, userEvent } from "@testing-library/react";
// Import MemoryRouter to use where useNavigate is used
import {
  BrowserRouter,
  MemoryRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import routes from "./testRoutes";

const router = createBrowserRouter(routes, {
  initialEntries: ["/messages", "/messages/1"],
  initialIndex: 0,
});

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const router = (await vi.importActual) < typeof import("react-router-dom");
  return {
    ...router,
    useNavigate: vi.fn().mockReturnValue(mockNavigate),
  };
});

describe("ChatPreview Component", () => {
  // Create chat object to be sent as prop into component

  const chat = {
    chatId: 1,
    contact: {
      username: "TestUser",
    },
    lastMessageFormatted: "Test Message",
    updatedAtFormatted: "2024-04-10",
  };

  it("renders chat preview with correct data", () => {
    const {getByText}render(
      // <RouterProvider router={router}>
      <ChatPreview chat={chat} />
      /* </RouterProvider> */
    );

    // getByText("TestUser");
    // getByText("Test Message");
    // getByText("Last message: 2024-04-10");

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByText("Last message: 2024-04-10")).toBeInTheDocument();
  });

  it("navigates to chat on click", () => {});
});
