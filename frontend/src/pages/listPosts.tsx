import React, { FC, useState, useEffect } from 'react';

import Article from '../components/article';
import { useAsync } from 'react-async';
import { getAll } from '../services/posts';


const ListPosts: FC = () => {
  const { data, error } = useAsync({ promiseFn: getAll });
  console.log(getAll())

  return ( 
    <>
      { error && <></> }
      { 
        data?.map((props: any) => (
          <Article key={props._id} {...props}/>
        ))
        || "Loading"
      }
    </>
   );
};

export default ListPosts;
