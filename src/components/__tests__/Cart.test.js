import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../utils/appStore";
import Cart from "../Cart";
import Header from "../Header";
import MOCK_DATA_NAME from "../mocks/resCardMenuMockData.json";
import RestaurantMenu from "../RestaurantMenu";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_NAME),
    })
    );

it("should Load Restaurant Menu Component", async () => {
    await act(async () =>
        render(
        <BrowserRouter>
            <Provider store={appStore}>
            <Header />
            <RestaurantMenu />
            <Cart />
            </Provider>
        </BrowserRouter>
        )
    );

    const accordionHeader = screen.getByText("New Thin n Crispy Pizzas (6)");
    fireEvent.click(accordionHeader);

    expect(screen.getAllByTestId("foodItems").length).toBe(6);

    expect(screen.getByText("Cart (0 Items)")).toBeInTheDocument();

    const addBtns = screen.getAllByRole("button", { name: "Add +" });
    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart (1 Items)")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart (2 Items)")).toBeInTheDocument();

    expect(screen.getAllByTestId("foodItems").length).toBe(8);

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(screen.getAllByTestId("foodItems").length).toBe(6);

    expect(screen.getByText("Cart is empty. Add Items to the cart!")).toBeInTheDocument();
});