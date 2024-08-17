import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../utils/appStore";
import Header from "../Header";

it("should render Header Component with login button", ()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

  //const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
});

it("Should render Header Component with a Cart items 0 ", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
            <Header />
            </Provider>
        </BrowserRouter>
        );
    
        const cartItems = screen.getByText("Cart (0 Items)");
    
        expect(cartItems).toBeInTheDocument();
});

it("Should render Header Component with a Cart item ", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
            <Header />
            </Provider>
        </BrowserRouter>
        );
    
        const cartItems = screen.getByText(/Cart/);
    
        expect(cartItems).toBeInTheDocument();
});


it("Should change Login Button to Logout on click", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
            <Header />
            </Provider>
        </BrowserRouter>
        );
    
        const loginButton = screen.getByRole("button", { name: "Login" });
    
        fireEvent.click(loginButton);
    
        const logoutButton = screen.getByRole("button", { name: "Logout" });
    
        expect(logoutButton).toBeInTheDocument();
});
