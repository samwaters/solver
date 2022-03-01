import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "styled-components";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Letter } from "components/Letter/letter";
import { theme } from "theme/theme";

describe("components/letter", () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    letters: {
      invalidLetters: {},
      knownLetters: {
        0: { letter: "A", valid: false },
      },
    },
  });

  it("Renders a letter", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Letter id={0} />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
