import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a className="list-group-item list-group-item-action py-2 ripple" data-bs-toggle="collapse" href="#collapseExample1">
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Expanded menu</span>
          </a>
          <ul id="collapseExample1" className="collapse show list-group list-group-flush">
            {Array(4).fill(0).map((_, i) => (
              <li className="list-group-item py-1" key={i}>
                <a href="#" className="text-reset">Link {i + 1}</a>
              </li>
            ))}
          </ul>
          <a className="list-group-item list-group-item-action py-2 ripple" data-bs-toggle="collapse" href="#collapseExample2">
            <i className="fas fa-chart-area fa-fw me-3"></i>
            <span>Collapsed menu</span>
          </a>
          <ul id="collapseExample2" className="collapse list-group list-group-flush">
            {Array(4).fill(0).map((_, i) => (
              <li className="list-group-item py-1" key={i}>
                <a href="#" className="text-reset">Link {i + 1}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => {
  return (
    <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top col-md-2">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
          <i className="fas fa-bars"></i>
        </button>
        <a className="navbar-brand" href="#">
          <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="25" alt="MDB Logo" />
        </a>
        <form className="d-none d-md-flex input-group w-auto my-auto">
          <input type="search" className="form-control rounded" placeholder="Search" />
          <span className="input-group-text border-0">
            <i className="fas fa-search"></i>
          </span>
        </form>
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle hidden-arrow" href="#" role="button" data-bs-toggle="dropdown">
              <i className="fas fa-bell"></i>
              <span className="badge bg-danger">1</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Some news</a></li>
              <li><a className="dropdown-item" href="#">Another news</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="fas fa-fill-drip"></i></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"><i className="fab fa-github"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Layout = ({ children }) => {
  return (
      <Sidebar />
  );
};

export default Layout;


// import * as React from "react";

// export default function MiniDrawer() {
//   const [open, setOpen] = React.useState(window.innerWidth > 768); // Default open for larger screens

//   React.useEffect(() => {
//     const handleResize = () => {
//       setOpen(window.innerWidth > 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleDrawerToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   return (
//     <>
//       {/* Navbar with Hamburger Button */}
//       <nav className="navbar bg-light px-3">
//         {window.innerWidth <= 768 && (
//           <button className="btn btn-outline-primary" onClick={handleDrawerToggle}>
//             <i className="material-icons">menu</i>
//           </button>
//         )}
//       </nav>

//       {/* Sidebar */}
//       <aside
//         style={{
//           width: open ? "240px" : "0px",
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           zIndex: 1000,
//           backgroundColor: "#f8f9fa",
//           transition: "width 0.3s",
//           overflowX: "hidden",
//           boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
//         }}
//       >
//         <div className="d-flex justify-content-end p-2">
//           {open && (
//             <button onClick={handleDrawerToggle} className="btn btn-link text-dark">
//               <i className="material-icons">chevron_left</i>
//             </button>
//           )}
//         </div>

//         <hr className="m-0" />

//         {/* Navigation Items */}
//         <div className="list-group list-group-flush">
//           {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
//             <a key={text} href="#" className="list-group-item list-group-item-action">
//               {text}
//             </a>
//           ))}
//         </div>
//       </aside>
//     </>
//   );
// }


// // import * as React from 'react';

// // export default function MiniDrawer({ children }) {
// //   const [open, setOpen] = React.useState(window.innerWidth >= 768); // Open by default on larger screens

// //   React.useEffect(() => {
// //     const handleResize = () => {
// //       setOpen(window.innerWidth >= 768); // Open if screen is wider than 768px
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   return <Sidebar open={open} />;
// // }

// // function Sidebar({ open }) {
// //   return (
// //     <aside
// //       style={{
// //         width: open ? '240px' : '56px',
// //         position: 'fixed',
// //         left: 0,
// //         top: 0,
// //         bottom: 0,
// //         zIndex: 1000,
// //         backgroundColor: '#f8f9fa',
// //         transition: 'width 0.3s',
// //         overflowX: 'hidden',
// //         boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
// //       }}
// //     >
// //       <hr className="m-0" />
// //       <div className="list-group list-group-flush">
// //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //           <a
// //             key={text}
// //             href="#"
// //             className="list-group-item list-group-item-action d-flex align-items-center"
// //             style={{ minHeight: '48px' }}
// //           >
// //             <i className="material-icons me-3">
// //               {index % 2 === 0 ? 'inbox' : 'mail'}
// //             </i>
// //             <span style={{ 
// //               opacity: open ? 1 : 0,
// //               transition: 'opacity 0.2s',
// //               whiteSpace: 'nowrap'
// //             }}>
// //               {text}
// //             </span>
// //           </a>
// //         ))}
// //       </div>
// //     </aside>
// //   );
// // }





// // import * as React from 'react';

// // export default function MiniDrawer({ children }) {
// //   const [open, setOpen] = React.useState(false);

// //   const handleDrawerToggle = () => {
// //     setOpen(!open);
// //   };

// //   return (
// //       <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
// //   );
// // }

// // function Sidebar({ open, handleDrawerToggle }) {
// //   return (

    
// //     <aside
// //       style={{
// //         width: open ? '240px' : '56px',
// //         position: 'fixed',
// //         left: 0,
// //         top: 0,
// //         bottom: 0,
// //         zIndex: 1000,
// //         backgroundColor: '#f8f9fa',
// //         transition: 'width 0.3s',
// //         overflowX: 'hidden',
// //         boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
// //       }}
// //     >
// //       <div className="d-flex justify-content-end p-2">
// //         <button
// //           onClick={handleDrawerToggle}
// //           className="btn btn-link text-dark"
// //         >
// //           <i className="material-icons">
// //             {open ? 'chevron_left' : 'chevron_right'}
// //           </i>
// //         </button>
// //       </div>
// //       <hr className="m-0" />
      
// //       {/* Navigation Items */}
// //       <div className="list-group list-group-flush">
// //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //           <a
// //             key={text}
// //             href="#"
// //             className="list-group-item list-group-item-action d-flex align-items-center"
// //             style={{ minHeight: '48px' }}
// //           >
// //             <i className="material-icons me-3">
// //               {index % 2 === 0 ? 'inbox' : 'mail'}
// //             </i>
// //             <span style={{ 
// //               opacity: open ? 1 : 0,
// //               transition: 'opacity 0.2s',
// //               whiteSpace: 'nowrap'
// //             }}>
// //               {text}
// //             </span>
// //           </a>
// //         ))}
// //       </div>
// //       <hr className="m-0" />
// //       <div className="list-group list-group-flush">
// //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
// //           <a
// //             key={text}
// //             href="#"
// //             className="list-group-item list-group-item-action d-flex align-items-center"
// //             style={{ minHeight: '48px' }}
// //           >
// //             <i className="material-icons me-3">
// //               {index % 2 === 0 ? 'inbox' : 'mail'}
// //             </i>
// //             <span style={{ 
// //               opacity: open ? 1 : 0,
// //               transition: 'opacity 0.2s',
// //               whiteSpace: 'nowrap'
// //             }}>
// //               {text}
// //             </span>
// //           </a>
// //         ))}
// //       </div>
// //     </aside>
    
// //   );
// // }

// // function Navbar({ open, handleDrawerToggle }) {
// //   return (
// //     <nav
// //       className="navbar navbar-dark bg-dark fixed-top"
// //       style={{
// //         left: open ? '240px' : '56px',
// //         right: 0,
// //         transition: 'left 0.3s',
// //         zIndex: 1000,
// //         boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// //       }}
// //     >
// //       {/* <div className="container-fluid">
// //         <button
// //           className={`navbar-toggler ${open ? 'd-none' : ''}`}
// //           onClick={handleDrawerToggle}
// //         >
// //           <i className="material-icons">menu</i>
// //         </button>
// //         <span className="navbar-brand">Mini variant drawer</span>
// //       </div> */}
// //     </nav>
// //   );
// // }

// // function MainContent({ open, children }) {
// //   return (
// //     <main
// //       style={{
// //         marginLeft: open ? '240px' : '56px',
// //         marginTop: '56px',
// //         transition: 'margin 0.3s',
// //         padding: '20px'
// //       }}
// //     >
// //       <div className="container">
// //         {children}
// //       </div>
// //     </main>
// //   );
// // }
// // // import * as React from 'react';

// // // export default function MiniDrawer() {
// // //   const [open, setOpen] = React.useState(false);

// // //   const handleDrawerToggle = () => {
// // //     setOpen(!open);
// // //   };

// // //   return (
// // //     <div>
// // //       {/* Bootstrap CDN links should be added to your index.html */}
      
// // //       {/* Sidebar */}
// // //       <aside
// // //         style={{
// // //           width: open ? '240px' : '56px',
// // //           position: 'fixed',
// // //           left: 0,
// // //           top: 0,
// // //           bottom: 0,
// // //           zIndex: 1000,
// // //           backgroundColor: '#f8f9fa',
// // //           transition: 'width 0.3s',
// // //           overflowX: 'hidden',
// // //           boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
// // //         }}
// // //       >
// // //         <div className="d-flex justify-content-end p-2">
// // //           <button
// // //             onClick={handleDrawerToggle}
// // //             className="btn btn-link text-dark"
// // //           >
// // //             <i className="material-icons">
// // //               {open ? 'chevron_left' : 'chevron_right'}
// // //             </i>
// // //           </button>
// // //         </div>
// // //         <hr className="m-0" />
        
// // //         {/* Navigation Items */}
// // //         <div className="list-group list-group-flush">
// // //           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// // //             <a
// // //               key={text}
// // //               href="#"
// // //               className="list-group-item list-group-item-action d-flex align-items-center"
// // //               style={{ minHeight: '48px' }}
// // //             >
// // //               <i className="material-icons me-3">
// // //                 {index % 2 === 0 ? 'inbox' : 'mail'}
// // //               </i>
// // //               <span style={{ 
// // //                 opacity: open ? 1 : 0,
// // //                 transition: 'opacity 0.2s',
// // //                 whiteSpace: 'nowrap'
// // //               }}>
// // //                 {text}
// // //               </span>
// // //             </a>
// // //           ))}
// // //         </div>
// // //         <hr className="m-0" />
// // //         <div className="list-group list-group-flush">
// // //           {['All mail', 'Trash', 'Spam'].map((text, index) => (
// // //             <a
// // //               key={text}
// // //               href="#"
// // //               className="list-group-item list-group-item-action d-flex align-items-center"
// // //               style={{ minHeight: '48px' }}
// // //             >
// // //               <i className="material-icons me-3">
// // //                 {index % 2 === 0 ? 'inbox' : 'mail'}
// // //               </i>
// // //               <span style={{ 
// // //                 opacity: open ? 1 : 0,
// // //                 transition: 'opacity 0.2s',
// // //                 whiteSpace: 'nowrap'
// // //               }}>
// // //                 {text}
// // //               </span>
// // //             </a>
// // //           ))}
// // //         </div>
// // //       </aside>

// // //       {/* Navbar */}
// // //       <nav
// // //         className="navbar navbar-dark bg-dark fixed-top"
// // //         style={{
// // //           left: open ? '240px' : '56px',
// // //           right: 0,
// // //           transition: 'left 0.3s',
// // //           zIndex: 1000,
// // //           boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// // //         }}
// // //       >
// // //         <div className="container-fluid">
// // //           <button
// // //             className={`navbar-toggler ${open ? 'd-none' : ''}`}
// // //             onClick={handleDrawerToggle}
// // //           >
// // //             <i className="material-icons">menu</i>
// // //           </button>
// // //           <span className="navbar-brand">Mini variant drawer</span>
// // //         </div>
// // //       </nav>

// // //       {/* Main Content */}
// // //       <main
// // //         style={{
// // //           marginLeft: open ? '240px' : '56px',
// // //           marginTop: '56px',
// // //           transition: 'margin 0.3s',
// // //           padding: '20px'
// // //         }}
// // //       >
// // //         <div className="container">
// // //           <div className="mb-3">
// // //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
// // //             tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
// // //             enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
// // //             imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
// // //             Convallis convallis tellus id interdum velit laoreet id donec ultrices.
// // //           </div>
// // //           <div className="mb-3">
// // //             Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
// // //             eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
// // //             neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
// // //             tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
// // //             sed odio morbi. Euismod lacinia at quis risus sed vulputate odio.
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

