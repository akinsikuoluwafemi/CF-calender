// a utility function to get the value from local storage and return it or return the default value if it doesn't exist

const getLocalStorage = (name: any, type: any) => {
  // a check to use local storage in nextjs
  if (typeof window !== 'undefined') {
    let value = localStorage.getItem(name);

    if (value) {
      return (value = JSON.parse(localStorage?.getItem(name) as string));
    } else {
      return type;
    }
  }
};

export default getLocalStorage;
