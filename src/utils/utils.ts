// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 2000)
  );
}

export const debounce = (callback, delay) => {
  let timer;
  return function(){
      let args = arguments;
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(function(){
          callback.apply(context, args);
      }, delay)
  }
}