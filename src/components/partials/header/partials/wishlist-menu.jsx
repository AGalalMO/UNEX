import React from "react";
import { connect } from "react-redux";

import ALink from "~/src/components/features/alink";
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import useAuth from "~/src/hooks/useAuth";
import { Avatar } from "@mui/material";

function WishlistMenu (props) {
  const { wishlist } = props;
  const { isAuthenticated,user} = useAuth()

  return (
    <ALink
      href={isAuthenticated ? "/shop/wishlist" : "/auth/signin"}
      className='wishlist-link'
      title='Auth'>
      <PersonOutlineIcon style={{ width: "24px", height: "24px" }} />
    </ALink>
  );
}

function mapStateToProps (state) {
  return {
    wishlist: [],
  };
}

export default connect(mapStateToProps, {})(WishlistMenu);
