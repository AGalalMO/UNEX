import { useRouter } from 'next/router';


import Breadcrumb from '~/components/partials/product/breadcrumb';
import GalleryDefault from '~/components/partials/product/gallery/gallery-default';
import DetailOne from '~/components/partials/product/details/detail-one';
import InfoTwo from '~/components/partials/product/info-tabs/info-two';
import RelatedProductsOne from '~/components/partials/product/related/related-one';

function ProductDefault () {
    const slug = useRouter().query.slug;
    if ( !slug ) return <div></div>;

    const data = [];
    const loading = false;
    const error = false
    const product = {};
    const related = {};
    const prev = {}
    const next = {};

    if ( error ) {
        return <div></div>
    }

    return (
        <div className="main">
            <Breadcrumb prev={ prev } next={ next } current="Extended" />
            <div className="page-content">
                <div className="container skeleton-body horizontal">
                    <div className="product-details-top">
                        <div className={ `row skel-pro-single ${loading ? '' : 'loaded'}` }>
                            <div className="col-md-6">
                                <div className="skel-product-gallery"></div>
                                {
                                    !loading ?
                                        <GalleryDefault product={ product } adClass="" />
                                        : ""
                                }
                            </div>

                            <div className="col-md-6">
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
                            </div>
                        </div>
                    </div>
                </div >
                {
                    loading ?
                        <div className="skel-pro-tabs"></div>
                        :
                        <InfoTwo product={ product } />

                }

                <div className="container">
                    <RelatedProductsOne products={ related } loading={ loading } />
                </div>
            </div >
        </div >
    )
}

export default ProductDefault
