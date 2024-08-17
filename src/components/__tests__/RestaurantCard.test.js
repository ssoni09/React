import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import MOCK_DATA from "../mocks/resCardMock.json";
import RestaurantCard from "../RestaurantCard";

it("should render RestaurantCard component with props Data", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Pizza Hut");

    expect(name).toBeInTheDocument();
});

it("should render RestaurantCard component with Promoted Label", () => {
  // Home Work - test HOC : withPromtedLabel()
});