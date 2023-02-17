import React from "react";
import { connect } from "react-redux";

import ALink from "~/src/components/features/alink";
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import useAuth from "~/src/hooks/useAuth";
import { Avatar, Stack, Typography } from "@mui/material";

function WishlistMenu (props) {
  const { wishlist } = props;
  const { isAuthenticated,user} = useAuth()

  return (
    <ALink
      href={isAuthenticated ? "/orders" : "/auth/signin"}
      className='wishlist-link'
      title='Auth'>
      <Stack alignItems={'center'}>
        <PersonOutlineIcon style={{ width: "24px", height: "24px" }} />
        <Typography sx={{color:'white'}}>{user?.name}</Typography>
      </Stack>
    </ALink>
  );
}

function mapStateToProps (state) {
  return {
    wishlist: [],
  };
}

export default connect(mapStateToProps, {})(WishlistMenu);
