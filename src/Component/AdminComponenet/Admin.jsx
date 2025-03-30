import React from 'react';
import MiniDrawer from './AdminSideBar';
export default function AdminPage1() {
  return (
      // <div className='container-fluid'>
      //   <div className='row bg-secondary'>
      //     <div className='col-md-3 col-lg-3 col-xl-3 col-xxl-3 bg-primary'>
      //       <MiniDrawer></MiniDrawer>
      //     </div>
      //   <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 bg-primary'>
      //     <h1>Admin Page</h1>
      //   </div>
      // </div>
      // </div>
        <div className='container-fluid'>
          <div className='row '>
            <div className='col-md-2 col-lg-2 col-xl-2 col-xxl-2 bg-secondary '>
              <MiniDrawer/>
            </div>
            <div className='col-md-9 col-lg-9 col-xl-8 col-xxl-9 offset-md-2 offset-lg-6 offset-xl-6 offset-xxl-6 bg-primary'>
              <h1 className='text-center'>Admin Page</h1>
            </div>

          </div>
        </div>

  );
}