import { useRouter } from 'next/router';
import StickyBox from 'react-sticky-box';


import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoThree from '~/components/partials/product/info-tabs/info-three';
import Sidebar from '~/components/partials/product/sidebar/product-sidebar';

function ProductFullwidth () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const product = {};
    const related = {};
    const prev = {}
    const next = {};
    const data = [];
    const loading = false;
    const error = false

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Sidebar" fullWidth={ true } />

            <div className="page-content pb-3">
                <div className={ `container-fluid skeleton-body horizontal` }>
                    <div className="row">
                        <div className="col-xxl-10 col-lg-9">
                            <div className="product-details-top mb-0">
                                <div className={ `row skel-pro-single fullwidth ${loading ? '' : 'loaded'}` }>
                                    <div className="col-md-6 col-lg-7">
                                        <div className="skel-product-gallery"></div>
                                        {
                                            !loading ?
                                                <GalleryDefault product={ product } adClass="" />
                                                : ""
                                        }
                                    </div>

                                    <div className="col-md-6 col-lg-5">
                                        <div className="entry-summary row">
                                            <div className="col-md-12">
                                                <div className="entry-summary1 mt-2 mt-md-0"></div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="entry-summary2"></div>
                                            </div>
                                        </div>
                                        {
                                            !loading ?
                                                <DetailOne product={ product } />
                                                : ""
                                        }
                                        <InfoThree product={ product } />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-lg-3 skeleton-body">
                            <StickyBox className={ `sticky-content skel-pro-single ${loading ? '' : 'loaded'}` } offsetTop={ 70 }>
                                <div className="skel-widget"></div>
                                <div className="skel-widget"></div>
                                <Sidebar products={ related } loading={ loading } />
                            </StickyBox>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default ProductFullwidth