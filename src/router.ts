interface Router {
    init: () => void;
    go: (route: string, addToHistory?: boolean) => void;
  }
  
  const Router: Router = {
    init: () => {
      document.querySelectorAll('a.navlink').forEach((a) => {
        a.addEventListener('click', (event) => {
          event.preventDefault();
          const href = (event.target as HTMLElement).getAttribute('href');
          Router.go(href);
        });
      });
  
      // It listens for history changes
      window.addEventListener('popstate', (event) => {
        Router.go(event.state.route, false);
      });
  
      // Process initial URL
      Router.go(location.pathname);
    },
  
    go: (route: string, addToHistory = true) => {
      if (addToHistory) {
        history.pushState({ route }, '', route);
      }
  
      document
        .querySelectorAll('section.page')
        .forEach((s) => (s.style.display = 'block'));
  
      if (route === '/') {
        (document.querySelector('section#home') as HTMLElement).style.display = 'block';
        return;
      }
  
      if (route.includes('/details')) {
        (document.querySelector('section#details') as HTMLElement).style.display = 'block';
        return;
      }
  
      if (route === '/styleguide') {
        (document.querySelector('section#styleguide') as HTMLElement).style.display = 'block';
      }
  
      window.scrollX = 0;
    },
  };
  
  window.Router = Router; // make it "public"
  
  export default Router;