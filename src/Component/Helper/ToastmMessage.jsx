import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Keep Bootstrap CSS for styling

const ToastmMessage = ({ message, show, onClose }) => {
  const [isVisible, setIsVisible] = useState(show); // Control visibility internally
  const toastRef = useRef(null);

  useEffect(() => {
    if (show) {
      setIsVisible(true); // Show the toast

      // Automatically hide the toast after 3000ms (3 seconds)
      const timeoutId = setTimeout(() => {
        setIsVisible(false); // Hide the toast
        onClose(); // Notify the parent component
      }, 2000);

      // Cleanup the timeout when the component unmounts or `show` changes
      return () => clearTimeout(timeoutId);
    }
  }, [show, onClose]);

  // Add a CSS class to handle the "slide down" animation
  useEffect(() => {
    if (!isVisible && toastRef.current) {
      const toastElement = toastRef.current;
      toastElement.classList.add("toast-slide-down");

      // Remove the toast from the DOM after the animation ends
      toastElement.addEventListener("animationend", () => {
        toastElement.remove();
      });
    }
  }, [isVisible]);

  if (!isVisible) return null; // Don't render the toast if it's not visible

  return (
    <div
      ref={toastRef}
      className={`toast-container position-fixed top-0 start-50 translate-middle-x p-3 bg-none`}
      style={{ zIndex: 1050 }}
    >
      <div

        className={`toast show`} // Use Bootstrap's CSS classes for styling
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header" style={{ background: "var(--gradient-1l)" }}>
          <strong className="me-auto text-white">Notification</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setIsVisible(false); // Hide the toast on close button click
              onClose(); // Notify the parent component
            }}
          ></button>
        </div>
        <div className="toast-body font-primary ">{message}</div>
      </div>
    </div>
  );
};

export default ToastmMessage;






// import React, { useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is imported

// const ToastmMessage = ({ message, show, onClose }) => {
//   const toastRef = useRef(null);

// //   useEffect(() => {
// //     if (show) {
// //       // Initialize the Bootstrap toast
// //       const toast = new window.bootstrap.Toast(toastRef.current);

// //       // Show the toast
// //       toast.show();

// //       // Automatically hide the toast after 3000ms (3 seconds)
// //       const timeoutId = setTimeout(() => {
// //         toast.hide(); // Hide the toast
// //         onClose(); // Call the onClose callback
// //       }, 3000);

// //       // Cleanup the timeout when the component unmounts or `show` changes
// //       return () => clearTimeout(timeoutId);
// //     }
// //   }, [show, onClose]);


// useEffect(() => {
//     if (show && toastRef.current) {
//       const toastElement = toastRef.current.querySelector(".toast");
//       if (toastElement) {
//         const toast = new window.bootstrap.Toast(toastElement);
//         toast.show();
  
//         const timeoutId = setTimeout(() => {
//           toast.hide();
//           onClose();
//         }, 3000);
  
//         return () => clearTimeout(timeoutId);
//       }
//     }
//   }, [show, onClose]);
//   return (
//     <div
//       ref={toastRef}
//       className={`toast-container position-fixed top-0 start-50 translate-middle-x p-3`}
//       style={{ zIndex: 1050 }}
//     >
//       <div
//         className={`toast show`} // Keep the `show` class for initial visibility
//         role="alert"
//         aria-live="assertive"
//         aria-atomic="true"
//       >
//         <div className="toast-header" style={{ background: "var(--gradient-1l)" }}>
//           <strong className="me-auto text-white">Notification</strong>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="toast"
//             onClick={onClose}
//           ></button>
//         </div>
//         <div className="toast-body font-primary">{message}</div>
//       </div>
//     </div>
//   );
// };

// export default ToastmMessage;

// import React, { useEffect, useState, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is imported

// const ToastmMessage = ({ message, show, onClose }) => {

//     const toastRef = useRef(null);

//     useEffect(() => {
//       if (show) {
//         const toast = new window.bootstrap.Toast(toastRef.current);
//         toast.show();
//         setTimeout(() => {
//           toast.hide();
//           onClose();
//         }, 3000);
//       }
//     }, [show, onClose]);

    
//     return (
//       <div
//         ref={toastRef}
//         className={`toast-container position-fixed top-0 start-50 translate-middle-x p-3`}
//         style={{ zIndex: 1050 }}
//       >
//         <div
//           className={`toast show`}
//           role="alert"
//           aria-live="assertive"
//           aria-atomic="true"
//         >
//           <div className="toast-header" style={{ background: "var(--gradient-1l)" }}>
//             <strong className="me-auto text-white">Notification</strong>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="toast"
//               onClick={onClose}
//             ></button>
//           </div>
//           <div className="toast-body font-primary">{message}</div>
//         </div>
//       </div>
//     );
//   };
  

// export default ToastmMessage;









