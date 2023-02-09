import React from 'react';
import {MDBCol,MDBCard,MDBCardTitle,MDBCardBody,MDBCardImage,MDBCardText,MDBBtn} from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom';
import { FaEdit,  FaTrashAlt} from 'react-icons/fa';
import Badge from './Badge';

const Blogs = ({item,handleDelete ,excerpt}) => {
    const {title
        ,category,description,_id,imageUrl,} = item;
        
    return (
        <MDBCol size='4'>
            <MDBCard className='h-100 mt-2' style={{maxWidth:'22rem'}}>
                <MDBCardImage
                src={imageUrl}
                alt={title}
                position='top'
                style={{width:' 100%', height: '100px'}}
                />
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                        {excerpt(description)}
                        <Link to={`/blogs/${_id}`}>Read more...</Link>
                    
                    </MDBCardText>
                    <Badge>{category}</Badge>
                    <span>
                        <MDBBtn className='mt-1' tag='a' color='none' onClick={()=>handleDelete (_id)}>
                      

                        <FaTrashAlt  style={{color:'#dd4b39'}}></FaTrashAlt>

                            
                            
                        </MDBBtn>
                        
                        <Link to={`/editBlog/${_id}`}>

                            <FaEdit style={{color:'#55acee', marginLeft:'10px'}}></FaEdit>
                        </Link>
                    </span>
                    
                </MDBCardBody>


            </MDBCard>

        </MDBCol>
    );
};

export default Blogs;