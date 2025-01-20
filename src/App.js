import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <>
      <div className="text-3xl font-bold underline">
        app
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
