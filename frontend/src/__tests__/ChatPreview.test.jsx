import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Import MemoryRouter to use where useNavigate is used
import {
  BrowserRouter,
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { describe, it, expect } from "vitest";
import routes from "./testRoutes";

// Import components for testing
import ChatPreview from "../components/single-components/chats/ChatPreview";
import ChatPage from "../components/pages/ChatPage";

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
  let testLocation, testHistory;
  const routes = [
    {
      path: "/testChatPreview",
      element: <ChatPreview chat={chat} />,
    },
    {
      path: "/testChatPreview/1",
      element: <ChatPage />,
    },
    // Add a route to capture testLocation
    {
      path: "*",
      render: ({ location }) => {
        (testHistory = history), (testLocation = location);
        return null;
      },
    },
  ];

  it("renders chat preview with correct data", () => {
    const router = createMemoryRouter(routes, {
      // initialEntries: ["/messages", "/messages/1"],
      initialEntries: ["/testChatPreview"],
      initialIndex: 0,
    });

    // const { getByText } =
    render(
      <RouterProvider router={router}>
        {/* <ChatPreview chat={chat} /> */}
      </RouterProvider>
    );

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByText("Last message: 2024-04-10")).toBeInTheDocument();
  });

  it("navigates to chat on click", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/testChatPreview", "/testChatPreview/1"],
      initialIndex: 0,
    });

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const chatPreviewDiv = await screen.getByText("TestUser").closest("div");

    // Ensure the div is found before clicking
    expect(chatPreviewDiv).toBeTruthy();

    // Simulate click using userEvent.click
    await user.click(chatPreviewDiv);

    // Wait for navigation
    await waitFor(() => {
      expect(chatPreviewDiv.innerHTML).toContain("TestUser");
    });
    // Check if the URL has changed
    // console.log(router.state.location.pathname);
    expect(router.state.location.pathname).toBe("/testChatPreview/1");
  });
});
