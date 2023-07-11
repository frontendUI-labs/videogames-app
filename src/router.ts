interface Router {
  init: () => void;
  go: (route: string, addToHistory?: boolean) => void;
}

const Router: Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href: any = (event.target as HTMLElement).getAttribute("href");
        Router.go(href);
      });
    });

    // It listens for history changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    // Process initial URL
    Router.go(location.pathname);
  },

  go: (route: string, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    // @ts-ignore

    document.querySelectorAll("section.page").forEach((s: HTMLElement) => {
      s.style.display = "none";
      if (route === "/") {
        (document.querySelector("section#home") as HTMLElement).style.display =
          "block";
        return;
      }

      if (route.includes("/games/")) {
        (
          document.querySelector("section#details") as HTMLElement
        ).style.display = "block";
        return;
      }

      // if (route.includes("/games/")) {
      //   (
      //     document.querySelector("section#genres") as HTMLElement
      //   ).style.display = "block";
      //   return;
      // }
      if (route.includes("/?search")) {
        (
          document.querySelector("section#search") as HTMLElement
        ).style.display = "block";
        return;
      }
    });

    window.scrollX = 0;
  },
};
// @ts-ignore

window.router = Router; // make it "public"

export default Router;
