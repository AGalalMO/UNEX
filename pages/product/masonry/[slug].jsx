import StickyBox from 'react-sticky-box';
import { useRouter } from 'next/router';

import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryMasonry from '~/components/partials/product/gallery/gallery-masonry';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoThree from '~/components/partials/product/info-tabs/info-three';
import RelatedProductsOne from '~/components/partials/product/related/related-one';

function ProductSticky () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const data = [];
    const loading = false;
    const error = false
    const product = [];
    const related = [];
    const prev = []
    const next = [];

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Sticky Info" />
            <div className="page-content">
                <div className="container skeleton-body">
                    <div className="product-details-top">
                        <div className={ `row skel-pro-single masonry_sticky ${loading ? '' : 'loaded'}` }>
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {
                                    !loading ?
                                        <GalleryMasonry product={ product } />
                                        : ""
                                }
                            </div>

                            <div className="col-md-6">
                                <StickyBox className="sticky-content" offsetTop={ 70 }>
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
                                            <>
                                                <DetailOne product={ product } />
                                                <InfoThree product={ product } />
                                            </>
                                            : ""
                                    }
                                </StickyBox>
                            </div>
                        </div>
                    </div>

                    <RelatedProductsOne products={ related } loading={ loading } />
                </div >
            </div >
        </div >
    )
}

export default ProductSticky
