import StickyBox from 'react-sticky-box';

import ShopSidebarOne from '~/src/components/partials/shop/sidebar/shop-sidebar-one';

function SideBar ({colors, categories, toggle ,onChange}) {

    function toggleSidebar () {
        if (
            document
                .querySelector('body')
                .classList.contains('sidebar-filter-active')
        ) {
            document
                .querySelector('body')
                .classList.remove('sidebar-filter-active');
        } else {
            document
                .querySelector('body')
                .classList.add('sidebar-filter-active');
        }
    }

    function hideSidebar () {
        document
            .querySelector('body')
            .classList.remove('sidebar-filter-active');
    }

    return (
      <aside
        className={`col-lg-3 skel-shop-sidebar order-lg-first skeleton-body loaded`}>
        <div className='skel-widget'></div>
        <div className='skel-widget'></div>
        <div className='skel-widget'></div>
        <div className='skel-widget'></div>
        <StickyBox className='sticky-content' offsetTop={70}>
          <ShopSidebarOne
            onChange={onChange}
            toggle={toggle}
            categories={categories}
            colors={colors}
          />
        </StickyBox>
        {toggle ? (
          <button className='sidebar-fixed-toggler' onClick={toggleSidebar}>
            <i className='icon-cog'></i>
          </button>
        ) : (
          ""
        )}
        <div className='sidebar-filter-overlay' onClick={hideSidebar}></div>
      </aside>
    );
}

export default SideBar