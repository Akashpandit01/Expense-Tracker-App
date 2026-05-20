import {

  createContext,
  useContext,
  useState

} from "react";

const ViewContext =
  createContext();

export function ViewProvider({
  children
}) {

  // Default Mobile

  const [desktopView,
    setDesktopView
  ] = useState(false);

  // Toggle

  const toggleView = () => {

    setDesktopView(
      !desktopView
    );

  };

  return (

    <ViewContext.Provider

      value={{

        desktopView,

        toggleView

      }}
    >

      {children}

    </ViewContext.Provider>

  );
}

export function useView() {

  return useContext(
    ViewContext
  );

}